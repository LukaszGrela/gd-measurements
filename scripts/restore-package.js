// scripts/restore-package.js
// ---------------------------------------------------------------
// Puts back the manifest that scripts/clean-package.js replaced.
//
//   "postpack": "node scripts/restore-package.js"
//
// Safe to run at any time: when there is no backup it does nothing and
// exits 0. It restores the exact bytes that were on disk before packing,
// including uncommitted edits, and it does not need a git work tree.
// ---------------------------------------------------------------

import { copyFileSync, existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(import.meta.url);
const rootDir = resolve(path, "../..");
const pkgPath = resolve(rootDir, "package.json");
const backupPath = resolve(rootDir, "package.json.backup");

if (!existsSync(backupPath)) {
  console.log("restore-package: nothing to restore");
  process.exit(0);
}

copyFileSync(backupPath, pkgPath);
unlinkSync(backupPath);

console.log("restore-package: package.json restored");
