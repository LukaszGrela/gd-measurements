# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Entries start with 0.5.0; earlier versions are described by the git history.

## [0.5.1] - 2026-11-26

### Added

- `.github/workflows/ci.yml`: `typecheck`, `lint`, `test` and `build` on every
  push to `master`, every pull request against `master` and on manual
  dispatch, on a Node `20.x` and `24.x` matrix. The job runs with
  `contents: read` and cancels superseded runs on the same ref.
- npm scripts `verify` (`typecheck`, `lint` and `test`) and
  `prepublishOnly`, so `npm publish` and `npm stage publish` stop when the
  checks fail.
- `scripts/restore-package.js`, a git-independent restore of `package.json`
  for the `postpack` step.

### Changed

- `postpack` runs `node scripts/restore-package.js` instead of
  `git checkout -- package.json`. The old command discarded uncommitted
  manifest edits and failed outside a git work tree; the restore is now a
  byte-exact copy of the manifest taken before packing, and a no-op when no
  backup exists.
- `scripts/clean-package.js` keeps the backup with a plain file copy instead
  of `renameSync`, restores a leftover `package.json.backup` from an
  interrupted run before the next pack, and fails when the whitelist filters
  out a required manifest field.

### Fixed

- The published manifest keeps `type`, `sideEffects`, `engines`, `exports` and
  `peerDependenciesMeta`. The 0.5.0 tarball shipped without `type: "module"`,
  so the ESM `dist/gd-measurements.js` was published as a typeless module:
  Node 22 and newer only warn (`MODULE_TYPELESS_PACKAGE_JSON`) and reparse the
  file, while older Node versions and CJS `require()` fail with
  `Unexpected token 'export'`.
- An interrupted `npm publish` or `npm pack` no longer leaves the trimmed
  manifest in the working tree; the next run restores the original first.
- A whitelist edit that drops `type`, `sideEffects` or `engines` now makes
  `clean-package.js` exit non-zero instead of publishing the reduced manifest.

### Removed

- The commented-out `process.on("exit")` restore hook in
  `scripts/clean-package.js`, which would have restored the manifest before
  npm read it.

## [0.5.0] - 2026-11-25

### Added

- Unit test suite with `vitest` and `@testing-library/react`, running in the
  `jsdom` environment. New test files cover `AxisH`, `AxisV`, `Grid`, `Ruler`,
  `Label`, `Units`, `Arrow`, `Crosshair`, `HorizontalLine`, `VerticalLine`,
  `negatePoint` and `getSvgParent`, alongside the existing utility tests.
- Root `vitest.config.ts`, which registers the React plugin, the `~`,
  `@/lib/` and `@/` aliases, the `jsdom` environment and v8 coverage.
  `vite.lib.config.ts` is now build-only.
- npm scripts: `test` (`vitest run`), `test:watch` and `test:coverage`.
- `engines` field declaring `node >=20`.
- README sections: `Numeric props` (which props accept numbers and what they
  mean) and `Tests` (how to run the suite and where test files live).

### Changed

- z-index values are now CSS custom properties, so they can be overridden
  without patching the stylesheet: `--gd-measurements-z-index` (`Grid`,
  `Ruler`, default `1979`) and `--gd-measurements-axis-z-index` (`AxisH`,
  `AxisV`, default `19791306`). Documented in the README `Z-index` section.
- `getSvgParent` accepts `Element | null` instead of `SVGElement | null`. The
  implementation only walks `parentNode` and compares `nodeName`, so the wider
  parameter matches actual behaviour. This is source-compatible for callers.
- `throttle` is a dependency-free implementation with the same defaults and
  behaviour as the previous `lodash.throttle` usage.
- SVG tests assert kebab-case presentation attributes (`stroke-width`,
  `marker-end`) instead of the React camelCase spelling, matching the markup
  that is actually rendered.

### Removed

- `lodash` (and its type packages) from dependencies. The library ships with no
  runtime dependencies besides the React peer dependency.

### Fixed

- Marker and `<defs>` ids are generated with React `useId()`, so several
  instances of the same component on one page no longer collide on `id` and
  reference the wrong marker.
- Purely decorative SVG nodes are marked `aria-hidden`, keeping the
  measurement helpers out of the accessibility tree.
- Numeric props are validated before they reach the render math: non-finite
  values fall back to a safe default and the result never drops below the
  minimum the geometry needs. This prevents `NaN` attributes, `width / 0` and
  `Array(length)` failures when plain JavaScript consumers pass `NaN`,
  `Infinity`, `0` or negative numbers.
- `getOffset` normalises its input to a `TPoint`: missing or non-finite
  coordinates become `0` and a non-object input becomes `{ x: 0, y: 0 }`,
  instead of producing `NaN` SVG attributes that made labels disappear.
- `useResizeObserver` no longer throws when `ResizeObserver` is unavailable,
  so rendering during server-side rendering is safe.
- ESLint: dropped the unused `TGrid` type in `Grid.tsx` and removed mutated
  values from `useMemo` dependency lists in `Ruler.tsx`, clearing the
  `react-hooks/preserve-manual-memoization` compiler warnings.

### Security

- Dependency audit of the full install tree (503 packages) found no known
  vulnerabilities and no unexpected install-time scripts.

[0.5.1]: https://github.com/LukaszGrela/gd-measurements/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/LukaszGrela/gd-measurements/compare/v0.4.2...v0.5.0
