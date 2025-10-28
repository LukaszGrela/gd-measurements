// scripts/clean-package.js
// ---------------------------------------------------------------
// Usage (in package.json):
//   "prepare": "node scripts/clean-package.js && npm run build && npm publish --access public"
// ---------------------------------------------------------------

import { readFileSync, writeFileSync, renameSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---- 1️⃣ Paths ------------------------------------------------
const path = fileURLToPath(import.meta.url);
const rootDir = resolve(path, "../.."); // project root
const pkgPath = resolve(rootDir, "package.json");
const backupPath = resolve(rootDir, "package.json.backup");
const tempPath = resolve(rootDir, "package.tmp.json");
// ---- 2️⃣ Load original package.json ---------------------------
const original = JSON.parse(readFileSync(pkgPath, "utf8"));

// ---- 3️⃣ Strip unwanted fields --------------------------------
const cleaned = { ...original };

// fields you never want to publish
// delete cleaned.scripts;
// delete cleaned.devDependencies;
// delete cleaned.private; // optional – makes the package public
// delete cleaned.publishConfig; // keep only if you want to override defaults

// optional: keep only a whitelist of keys (safer)
const whitelist = [
  "name",
  "version",
  "description",
  "main",
  "module",
  "types",
  "author",
  "license",
  "repository",
  "bugs",
  "keywords",
  "files",
  "peerDependencies",
  "dependencies",
];

const finalPkg = Object.fromEntries(
  Object.entries(cleaned).filter(([k]) => whitelist.includes(k))
);

// ---- 4️⃣ Write temporary cleaned file ---------------------------
writeFileSync(tempPath, JSON.stringify(finalPkg, null, 2) + "\n");

// ---- 5️⃣ Swap files so npm sees the cleaned version -------------
/* 
   npm pack / npm publish reads package.json from the cwd.
   By renaming the files we keep the original safe and let npm
   work with the cleaned version.
*/
renameSync(pkgPath, backupPath); // keep a backup
renameSync(tempPath, pkgPath); // now pkgPath points to the cleaned file

// ---------------------------------------------------------------
// After the publish finishes you should restore the original file.
// In CI you can simply run `git checkout -- package.json`.
// If you run this script locally you can add a tiny cleanup step:
process.on("exit", () => {
  try {
    // restore original
    renameSync(backupPath, pkgPath);
    // remove any stray temp file
    unlinkSync(tempPath);
  } catch (_) {
    // ignore – cleanup already done or failed
  }
});
