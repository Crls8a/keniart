#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const nextDir = path.join(repoRoot, ".next");

if (!fs.existsSync(nextDir)) {
  console.log("No .next cache found.");
  process.exit(0);
}

fs.rmSync(nextDir, { force: true, recursive: true });
console.log("Removed .next cache/build output.");
