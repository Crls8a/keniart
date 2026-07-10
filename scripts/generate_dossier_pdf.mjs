import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const dossierUrl = process.env.DOSSIER_URL ?? process.argv[2] ?? "http://localhost:3800/dossier";
const outputPath = path.resolve(process.cwd(), "public/dossier/dossier-galerias.pdf");

function normalizeOrigin(value) {
  const candidate = value.includes("://") ? value : `https://${value}`;
  const url = new URL(candidate);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Unsupported dossier link protocol: ${url.protocol}`);
  }

  return url.origin;
}

function isLocalHostname(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname.endsWith(".localhost");
}

const sourceUrl = new URL(dossierUrl);
const configuredLinkOrigin =
  process.env.DOSSIER_LINK_ORIGIN ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL;
const linkOrigin = configuredLinkOrigin
  ? normalizeOrigin(configuredLinkOrigin)
  : isLocalHostname(sourceUrl.hostname)
    ? undefined
    : sourceUrl.origin;

if (!linkOrigin || isLocalHostname(new URL(linkOrigin).hostname)) {
  throw new Error(
    "A public dossier link origin is required. Set DOSSIER_LINK_ORIGIN or NEXT_PUBLIC_SITE_URL before generating from localhost.",
  );
}

async function waitForImages(page) {
  await page.evaluate(async () => {
    const scrollStep = window.innerHeight * 0.8;
    for (let position = 0; position < document.body.scrollHeight; position += scrollStep) {
      window.scrollTo(0, position);
      await new Promise((resolve) => window.setTimeout(resolve, 150));
    }
    window.scrollTo(0, 0);
  });

  const images = await page.evaluate(async () => {
    const images = Array.from(document.images);
    const imagePromises = images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    });
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 10_000));

    await Promise.race([Promise.all(imagePromises), timeout]);

    return images.map((image) => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }));
  });

  const brokenImages = images.filter((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0);

  if (images.length === 0 || brokenImages.length > 0) {
    const brokenSources = brokenImages.map((image) => image.src).join(", ");
    throw new Error(`Dossier image validation failed. Found ${images.length} image(s); broken: ${brokenSources || "none"}.`);
  }

  return images.length;
}

async function rewriteInternalLinks(page) {
  return page.evaluate(
    ({ sourceOrigin, targetOrigin }) => {
      let rewrittenLinks = 0;

      for (const anchor of document.querySelectorAll("a[href]")) {
        const currentUrl = new URL(anchor.href);
        if (currentUrl.origin !== sourceOrigin) continue;

        anchor.href = new URL(`${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`, targetOrigin).href;
        rewrittenLinks += 1;
      }

      return rewrittenLinks;
    },
    { sourceOrigin: sourceUrl.origin, targetOrigin: linkOrigin },
  );
}

async function main() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

  try {
    await page.goto(dossierUrl, { waitUntil: "networkidle", timeout: 120_000 });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);
    const imageCount = await waitForImages(page);
    const rewrittenLinkCount = await rewriteInternalLinks(page);

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "14mm",
        right: "12mm",
        bottom: "16mm",
        left: "12mm",
      },
    });

    console.log(
      `Validated ${imageCount} image(s) and rewrote ${rewrittenLinkCount} internal link(s) to ${linkOrigin}.`,
    );
  } finally {
    await browser.close();
  }

  const { size } = fs.statSync(outputPath);
  console.log(`Generated ${path.relative(process.cwd(), outputPath)} (${size} bytes) from ${dossierUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
