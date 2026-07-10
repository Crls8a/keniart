#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const Module = require("module");
const path = require("path");
const ts = require("typescript");

const repoRoot = path.resolve(__dirname, "..");
const publicRoot = path.join(repoRoot, "public");
const artworkDataPath = path.join(repoRoot, "src", "data", "artworks.ts");
const requiredVariantKeys = ["main", "desktop", "tablet", "mobile", "thumb"];
const responsiveVariantKeys = ["desktop", "tablet", "mobile", "thumb"];
const publicArtworkPrefix = "/artworks/optimized/";

const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveKeniartAlias(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    return originalResolveFilename.call(this, path.join(repoRoot, "src", request.slice(2)), parent, isMain, options);
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

require.extensions[".ts"] = function loadTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  });

  module._compile(output.outputText, filename);
};

function publicPathFor(urlPath) {
  if (typeof urlPath !== "string" || !urlPath.startsWith("/")) return null;
  return path.join(publicRoot, ...urlPath.split("/").filter(Boolean));
}

function readUInt24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function readWebpDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("not a WebP file");
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === "VP8X") {
      return {
        width: readUInt24LE(buffer, dataOffset + 4) + 1,
        height: readUInt24LE(buffer, dataOffset + 7) + 1,
      };
    }

    if (chunkType === "VP8L") {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }

    if (chunkType === "VP8 ") {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  throw new Error("missing WebP dimension chunk");
}

function orientationFor({ width, height }) {
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

function sameAspectRatio(first, second, tolerance = 0.02) {
  return Math.abs(first.width / first.height - second.width / second.height) <= tolerance;
}

function variantPathParts(urlPath) {
  const parts = urlPath.split("/").filter(Boolean);
  const optimizedIndex = parts.indexOf("optimized");

  if (optimizedIndex === -1 || optimizedIndex + 3 >= parts.length) return null;

  return {
    base: parts.slice(0, optimizedIndex + 2).join("/"),
    variant: parts[optimizedIndex + 2],
    folder: parts.slice(optimizedIndex + 3, -1).join("/"),
    file: parts.at(-1),
  };
}

function validatePublicImage(urlPath, context, errors, dimensionsByUrl) {
  if (typeof urlPath !== "string" || urlPath.length === 0) {
    errors.push(`${context}: missing image path`);
    return null;
  }

  if (!urlPath.startsWith(publicArtworkPrefix)) {
    errors.push(`${context}: expected path under ${publicArtworkPrefix}, got ${urlPath}`);
  }

  const filePath = publicPathFor(urlPath);
  if (!filePath || !fs.existsSync(filePath)) {
    errors.push(`${context}: missing file ${urlPath}`);
    return null;
  }

  if (path.extname(filePath).toLowerCase() !== ".webp") {
    errors.push(`${context}: expected .webp file, got ${urlPath}`);
    return null;
  }

  try {
    const dimensions = readWebpDimensions(filePath);
    dimensionsByUrl.set(urlPath, dimensions);
    return dimensions;
  } catch (error) {
    errors.push(`${context}: cannot read WebP dimensions for ${urlPath} (${error.message})`);
    return null;
  }
}

function validateVariants(variants, context, errors, dimensionsByUrl) {
  if (!variants || typeof variants !== "object") {
    errors.push(`${context}: missing variants object`);
    return [];
  }

  for (const key of requiredVariantKeys) {
    if (!variants[key]) errors.push(`${context}: missing ${key} variant`);
  }

  const variantDimensions = [];
  for (const key of requiredVariantKeys) {
    if (!variants[key]) continue;

    const dimensions = validatePublicImage(variants[key], `${context}.${key}`, errors, dimensionsByUrl);
    if (dimensions) variantDimensions.push({ key, path: variants[key], dimensions });
  }

  for (const key of responsiveVariantKeys) {
    const parts = variants[key] ? variantPathParts(variants[key]) : null;
    if (!parts) continue;

    if (parts.variant !== key) {
      errors.push(`${context}.${key}: expected hierarchy segment /${key}/, got /${parts.variant}/`);
    }
  }

  const desktopParts = variants.desktop ? variantPathParts(variants.desktop) : null;
  if (desktopParts) {
    for (const key of ["tablet", "mobile", "thumb"]) {
      const parts = variants[key] ? variantPathParts(variants[key]) : null;
      if (!parts) continue;

      if (parts.base !== desktopParts.base || parts.folder !== desktopParts.folder || parts.file !== desktopParts.file) {
        errors.push(`${context}.${key}: does not match desktop folder/file hierarchy`);
      }
    }
  }

  if (variants.main && variants.desktop && variants.main !== variants.desktop) {
    errors.push(`${context}: main variant should match desktop for the current static hierarchy`);
  }

  return variantDimensions;
}

function validateArtworkImageAsset(asset, context, errors, dimensionsByUrl) {
  if (!asset || typeof asset !== "object") {
    errors.push(`${context}: missing gallery image asset`);
    return;
  }

  const variantDimensions = validateVariants(asset.variants, `${context}.variants`, errors, dimensionsByUrl);
  validatePublicImage(asset.src, `${context}.src`, errors, dimensionsByUrl);

  if (asset.variants?.main && asset.src !== asset.variants.main) {
    errors.push(`${context}: src should match variants.main`);
  }

  if (!Number.isFinite(asset.width) || asset.width <= 0 || !Number.isFinite(asset.height) || asset.height <= 0) {
    errors.push(`${context}: width and height must be positive numbers`);
    return;
  }

  const expectedAspectRatio = Number((asset.width / asset.height).toFixed(4));
  if (!Number.isFinite(asset.aspectRatio) || Math.abs(asset.aspectRatio - expectedAspectRatio) > 0.0001) {
    errors.push(`${context}: aspectRatio ${asset.aspectRatio} does not match ${asset.width}x${asset.height}`);
  }

  const expectedOrientation = orientationFor(asset);
  if (asset.orientation !== expectedOrientation) {
    errors.push(`${context}: orientation ${asset.orientation} does not match ${asset.width}x${asset.height}`);
  }

  const declaredDimensions = { width: asset.width, height: asset.height };
  for (const { key, path: variantPath, dimensions } of variantDimensions) {
    if (!sameAspectRatio(declaredDimensions, dimensions)) {
      errors.push(`${context}.variants.${key}: aspect ratio for ${variantPath} is ${dimensions.width}x${dimensions.height}, expected ${asset.width}x${asset.height}`);
    }
  }
}

function validateArtwork(artwork, errors, dimensionsByUrl) {
  const context = `artwork ${artwork?.slug ?? "<missing slug>"}`;

  if (!artwork || typeof artwork !== "object") {
    errors.push("artwork entry is not an object");
    return;
  }

  if (!artwork.images || typeof artwork.images !== "object") {
    errors.push(`${context}: missing images object`);
    return;
  }

  const { images } = artwork;
  const gallery = Array.isArray(images.gallery) ? images.gallery : [];
  const details = Array.isArray(images.details) ? images.details : [];
  const detailVariants = Array.isArray(images.detailVariants) ? images.detailVariants : [];

  validatePublicImage(images.main, `${context}.images.main`, errors, dimensionsByUrl);
  validatePublicImage(images.thumbnail, `${context}.images.thumbnail`, errors, dimensionsByUrl);
  validateVariants(images.variants, `${context}.images.variants`, errors, dimensionsByUrl);

  if (gallery.length === 0) {
    errors.push(`${context}: images.gallery must contain at least the main image`);
  }

  if (images.variants?.main && images.main !== images.variants.main) {
    errors.push(`${context}: images.main should match images.variants.main`);
  }

  if (images.variants?.thumb && images.thumbnail !== images.variants.thumb) {
    errors.push(`${context}: images.thumbnail should match images.variants.thumb`);
  }

  if (gallery[0]?.src && images.main !== gallery[0].src) {
    errors.push(`${context}: images.main should match images.gallery[0].src`);
  }

  if (details.length !== Math.max(gallery.length - 1, 0)) {
    errors.push(`${context}: images.details should mirror gallery images after the main image`);
  }

  if (detailVariants.length !== details.length) {
    errors.push(`${context}: images.detailVariants length should match images.details length`);
  }

  for (const [index, asset] of gallery.entries()) {
    validateArtworkImageAsset(asset, `${context}.images.gallery[${index}]`, errors, dimensionsByUrl);

    if (index > 0 && details[index - 1] !== asset.src) {
      errors.push(`${context}: images.details[${index - 1}] should match images.gallery[${index}].src`);
    }

    if (index > 0 && detailVariants[index - 1] !== asset.variants) {
      errors.push(`${context}: images.detailVariants[${index - 1}] should reuse images.gallery[${index}].variants`);
    }
  }
}

function main() {
  const { artworks } = require(artworkDataPath);
  const errors = [];
  const dimensionsByUrl = new Map();

  if (!Array.isArray(artworks)) {
    throw new Error("src/data/artworks.ts must export an artworks array");
  }

  for (const artwork of artworks) {
    validateArtwork(artwork, errors, dimensionsByUrl);
  }

  if (errors.length > 0) {
    console.error(`Artwork image validation failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }

  console.log(`Artwork image validation passed: ${artworks.length} artwork(s), ${dimensionsByUrl.size} unique optimized image path(s).`);
  console.log("Convention: src/data/artworks.ts is the manifest; public paths must resolve under public/artworks/optimized/{series}/{desktop,tablet,mobile,thumb}/{folder}/{file}.");
  return 0;
}

process.exitCode = main();
