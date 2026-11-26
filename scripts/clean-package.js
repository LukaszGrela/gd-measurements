// scripts/clean-package.js
// ---------------------------------------------------------------
// Builds the manifest that npm publishes.
//
//   "prepack": "npm run build && npm run clean-package",
//   "postpack": "node scripts/restore-package.js",
//
// The script keeps a byte-identical copy of the original manifest in
// package.json.backup, then replaces package.json with a whitelisted
// version for the duration of `npm pack` / `npm publish`.
// scripts/restore-package.js puts the original back afterwards.
//
// Never rely on `git checkout -- package.json` to undo this: it
// discards uncommitted changes and fails outside a git work tree
// (npm installs the package from a tarball, a CI checkout can be shallow).
// ---------------------------------------------------------------

import { copyFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(import.meta.url);
const rootDir = resolve(path, "../.."); // project root
const pkgPath = resolve(rootDir, "package.json");
const backupPath = resolve(rootDir, "package.json.backup");

// Fields the published package needs. Anything missing here is dropped
// from the tarball manifest, which changes how Node and bundlers read
// the package - `type` in particular decides whether dist/*.js is
// parsed as ESM or CommonJS.
const whitelist = [
  "name",
  "version",
  "description",
  "type",
  "main",
  "module",
  "types",
  "exports",
  "sideEffects",
  "engines",
  "author",
  "license",
  "repository",
  "bugs",
  "keywords",
  "files",
  "peerDependencies",
  "peerDependenciesMeta",
  "dependencies",
];

// Fields without which the published package is known to be broken.
const required = [
  "name",
  "version",
  "main",
  "types",
  "files",
  "peerDependencies",
];

const fail = (message) => {
  console.error(`clean-package: ${message}`);
  process.exit(1);
};

// A previous run that never reached postpack leaves the backup behind.
// Restore it first so we always start from the real manifest.
if (existsSync(backupPath)) {
  copyFileSync(backupPath, pkgPath);
  unlinkSync(backupPath);
  console.warn("clean-package: stale package.json.backup found, original manifest restored first.");
}

const original = JSON.parse(readFileSync(pkgPath, "utf8"));

const finalPkg = Object.fromEntries(
  Object.entries(original).filter(([key]) => whitelist.includes(key))
);

// Fields that silently change runtime behaviour when they disappear.
const runtimeFields = (pkg) =>
  JSON.stringify({ type: pkg.type, sideEffects: pkg.sideEffects, engines: pkg.engines });

const missing = required.filter((key) => !(key in finalPkg));

if (missing.length > 0) {
  fail(`published manifest would be missing: ${missing.join(", ")}`);
}

if (runtimeFields(original) !== runtimeFields(finalPkg)) {
  fail("published manifest dropped type, sideEffects or engines. Add it to the whitelist.");
}

// Keep the exact original bytes so the restore step cannot drift.
copyFileSync(pkgPath, backupPath);
writeFileSync(pkgPath, `${JSON.stringify(finalPkg, null, 2)}\n`);

console.log(
  `clean-package: publishing ${finalPkg.name}@${finalPkg.version} (type: ${finalPkg.type ?? "commonjs"})`
);
