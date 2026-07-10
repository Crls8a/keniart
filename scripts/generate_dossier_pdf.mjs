import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const dossierUrl = process.env.DOSSIER_URL ?? process.argv[2] ?? "http://localhost:3800/dossier";
const outputPath = path.resolve(process.cwd(), "public/dossier/dossier-galerias.pdf");

async function waitForImages(page) {
  await page.evaluate(async () => {
    const scrollStep = window.innerHeight * 0.8;
    for (let position = 0; position < document.body.scrollHeight; position += scrollStep) {
      window.scrollTo(0, position);
      await new Promise((resolve) => window.setTimeout(resolve, 150));
    }
    window.scrollTo(0, 0);
  });

  await page.evaluate(async () => {
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
  });
}

async function main() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

  try {
    await page.goto(dossierUrl, { waitUntil: "networkidle", timeout: 120_000 });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);
    await waitForImages(page);

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
