// Self-check for the emitted artifacts. Runs after `npm run build` (see `npm run check`).
// Not a framework — just assertions that fail loudly if the emit logic regresses.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const css = read('build/css/tokens.css');
const kt = read('build/compose/BrairdTokens.kt');
const swift = read('build/swift/BrairdTokens.swift');

// --- CSS: dark mode is delivered both ways (system + manual), per SUR-642 decision ---
assert.match(css, /\[data-theme="dark"\]\s*\{/, 'CSS must emit a manual [data-theme="dark"] override');
assert.match(css, /@media \(prefers-color-scheme: dark\)/, 'CSS must emit a system prefers-color-scheme block');
assert.match(css, /:root:not\(\[data-theme="light"\]\)/, 'system dark must yield to an explicit light override');

// --- CSS: the stat-box font token (Braird Screens: Lora) exists cross-platform ---
assert.match(css, /--font-stat: 'Lora'/, 'CSS --font-stat must be the Lora display serif (Braird Screens)');
assert.ok(kt.includes('fontStat') && swift.includes('fontStat'), 'stat font must reach Compose + Swift');
assert.match(css, /--text-stat-weight: 600;/, 'stat weight must be 600 (Braird Screens .stat .v)');

// --- CSS: a known token round-trips light + real Braird-at-night dark ---
assert.match(css, /:root[\s\S]*--color-bg-primary: #EFEEE7;/, 'light --color-bg-primary must be #EFEEE7');
assert.match(css, /\[data-theme="dark"\][\s\S]*--color-bg-primary: #0C1A14;/, 'dark --color-bg-primary must be #0C1A14 (Braird at night)');

// --- CSS: accent is lifted for dark (mode-varying, not invariant) ---
assert.match(css, /:root[\s\S]*--color-accent: #2F9E63;/, 'light accent must be #2F9E63');
assert.match(css, /\[data-theme="dark"\][\s\S]*--color-accent: #4FB87A;/, 'dark accent must lift to #4FB87A');

// --- two-face Braird font system (v0.2.0): Hanken Grotesk UI + Lora serif ---
assert.match(css, /--font-base: 'Hanken Grotesk'/, 'UI face must be Hanken Grotesk');
assert.match(css, /--font-serif: 'Lora'/, 'reading serif must be Lora');
assert.match(css, /--font-front-door: 'Lora'/, 'front-door consolidated to Lora (Sometype Mono retired, SUR-508)');
{
  const faces = new Set([...css.matchAll(/--font-[a-z-]+: (?:'([^']+)')/g)].map((m) => m[1]));
  assert.ok(faces.size === 2 && faces.has('Hanken Grotesk') && faces.has('Lora'), `expected exactly the 2 Braird faces, got ${[...faces].join(', ')}`);
}

// --- light/dark key parity: every mode-varying var in :root has a dark counterpart ---
const darkBlock = css.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\}/)[1];
const darkVars = [...darkBlock.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]).sort();
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/)[1];
const rootVars = new Set([...rootBlock.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]));
for (const v of darkVars) assert.ok(rootVars.has(v), `dark var --${v} has no light counterpart in :root`);
assert.ok(darkVars.length >= 26, `expected >=26 mode-varying vars (surfaces+text+border+accent+custom+inks), got ${darkVars.length}`);

// --- native: both theme objects emitted, accent colour encoded ---
assert.match(kt, /object ColorLight[\s\S]*object ColorDark/, 'Compose must emit ColorLight + ColorDark');
assert.match(kt, /colorAccent = Color\(0xFF2F9E63\)/, 'Compose accent must encode as ARGB 0xFF2F9E63');
assert.match(swift, /enum ColorLight[\s\S]*enum ColorDark/, 'Swift must emit ColorLight + ColorDark');

// --- native: no rem-scaling bug (8px stays 8, not 128) ---
assert.match(kt, /space1 = 8\.dp/, 'Compose space1 must be 8.dp (px passthrough, not rem-scaled)');
assert.match(swift, /space1: CGFloat = 8\b/, 'Swift space1 must be CGFloat 8');

console.log(`selfcheck OK — ${darkVars.length} mode-varying vars, css/compose/swift consistent`);
