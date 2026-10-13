/**
 * check-contrast.mjs — verificación de contraste de los tokens de color.
 *
 * Parsea `src/app/globals.css` (bloques `:root`, `.dark` y el override
 * de `@media print`), resuelve las vars y valida los pares del sistema:
 *
 *   - Pares de texto:  ≥ 4.5:1 (WCAG 2.1 AA, 1.4.3) en ambos temas.
 *   - Estados de interacción (borde hover, anillo de foco): ≥ 3:1
 *     (WCAG 2.1 AA, 1.4.11 no-texto) en ambos temas.
 *
 * Sin dependencias. Sale con código 1 si algún par baja del umbral:
 *   npm run check:contrast
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CSS_PATH = join(ROOT, "src", "app", "globals.css");

const TEXT_MIN = 4.5;
const STATE_MIN = 3.0;
/* Alfa del borde hover (`accent/70` en los componentes) — se compone
   en sRGB para medir el estado real sobre cada superficie. */
const HOVER_ALPHA = 0.7;

/* ---------------------------- utilidades ---------------------------- */

function extractBlock(css, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return { body: css.slice(openIdx + 1, i), end: i };
    }
  }
  throw new Error("Llave de cierre no encontrada en globals.css");
}

function declarations(body) {
  const map = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(body))) map[m[1]] = m[2].trim();
  return map;
}

function blockAfter(css, selectorRegex) {
  const m = css.match(selectorRegex);
  if (!m) throw new Error(`No se encontró «${selectorRegex}» en globals.css`);
  return extractBlock(css, m.index + m[0].length - 1).body;
}

function resolveVar(map, name) {
  let value = map[name];
  const seen = new Set();
  while (value) {
    const m = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
    if (!m || seen.has(m[1])) break;
    seen.add(m[1]);
    value = map[m[1]];
  }
  if (!value || !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    throw new Error(`Token «${name}» sin resolver a un hex: «${value}»`);
  }
  return value;
}

function rgb(hex) {
  const h =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Compone un color con alfa sobre una base (aprox. sRGB de color-mix). */
function blend(hex, alpha, over) {
  const fg = rgb(hex);
  const bg = rgb(over);
  return (
    "#" +
    fg
      .map((v, i) =>
        Math.round(alpha * v + (1 - alpha) * bg[i])
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

/* ----------------------------- pares ------------------------------- */

const css = readFileSync(CSS_PATH, "utf8");
const rootMap = declarations(blockAfter(css, /:root\s*\{/));
const darkMap = declarations(blockAfter(css, /\n\.dark\s*\{/));
/* El override de print vive dentro de `@media print` — se localiza
   primero ese bloque para no confundirlo con el `.dark` superior. */
const printMedia = blockAfter(css, /@media\s+print\s*\{/);
const printMap = declarations(blockAfter(printMedia, /\.dark\s*\{/));

const THEMES = [
  ["claro", { ...rootMap }],
  ["oscuro", { ...rootMap, ...darkMap }],
  ["print", { ...rootMap, ...darkMap, ...printMap }],
];

const CATS = [
  "--cat-integration",
  "--cat-cloud",
  "--cat-backend",
  "--cat-frontend",
  "--cat-practices",
];

const checks = [];
for (const [themeName, theme] of THEMES) {
  const t = (name) => resolveVar(theme, name);
  const surfaces = {
    fondo: t("--background"),
    tarjeta: t("--surface"),
    elevado: t("--surface-elevated"),
  };

  // Texto: foreground y muted sobre cada capa de superficie
  for (const role of ["--foreground", "--muted"]) {
    for (const [where, hex] of Object.entries(surfaces)) {
      checks.push({
        theme: themeName,
        name: `${role} sobre ${where}`,
        fg: t(role),
        bg: hex,
        min: TEXT_MIN,
      });
    }
  }

  // Marca como texto (hash, enlaces, foco) sobre cada capa
  for (const [where, hex] of Object.entries(surfaces)) {
    checks.push({
      theme: themeName,
      name: `brand sobre ${where}`,
      fg: t("--brand"),
      bg: hex,
      min: TEXT_MIN,
    });
  }

  // Texto del CTA sobre marca sólida
  checks.push({
    theme: themeName,
    name: "brand-contrast sobre brand (CTA)",
    fg: t("--brand-contrast"),
    bg: t("--brand"),
    min: TEXT_MIN,
  });

  // Acentos de categoría y semántica git sobre tarjeta (KPIs, reglas,
  // glifos diff, strings del profile.ts sobre la capa elevada)
  for (const role of [...CATS, "--added", "--removed"]) {
    checks.push({
      theme: themeName,
      name: `${role} sobre tarjeta`,
      fg: t(role),
      bg: surfaces.tarjeta,
      min: TEXT_MIN,
    });
  }
  for (const role of ["--added", "--cat-integration", "--cat-cloud"]) {
    checks.push({
      theme: themeName,
      name: `${role} sobre elevado`,
      fg: t(role),
      bg: surfaces.elevado,
      min: TEXT_MIN,
    });
  }

  // Estados (solo pantalla — print no tiene hover ni foco visible)
  if (themeName !== "print") {
    const brand = t("--brand");
    const hoverFg = blend(brand, HOVER_ALPHA, surfaces.tarjeta);
    const hoverBg = blend(brand, HOVER_ALPHA, surfaces.fondo);
    checks.push({
      theme: themeName,
      name: `borde hover accent/${HOVER_ALPHA * 100} vs tarjeta`,
      fg: hoverFg,
      bg: surfaces.tarjeta,
      min: STATE_MIN,
    });
    checks.push({
      theme: themeName,
      name: `borde hover accent/${HOVER_ALPHA * 100} vs fondo`,
      fg: hoverFg,
      bg: surfaces.fondo,
      min: STATE_MIN,
    });
    checks.push({
      theme: themeName,
      name: "borde hover (fuera de tarjeta) vs fondo",
      fg: hoverBg,
      bg: surfaces.fondo,
      min: STATE_MIN,
    });
    for (const [where, hex] of Object.entries(surfaces)) {
      checks.push({
        theme: themeName,
        name: `anillo de foco vs ${where}`,
        fg: brand,
        bg: hex,
        min: STATE_MIN,
      });
    }
  }
}

/* ----------------------------- informe ------------------------------ */

let failures = 0;
let lastTheme = "";
for (const c of checks) {
  const ratio = contrast(c.fg, c.bg);
  const pass = ratio >= c.min;
  if (!pass) failures++;
  if (c.theme !== lastTheme) {
    lastTheme = c.theme;
    console.log(`\n— tema ${c.theme} —`);
  }
  console.log(
    `  ${pass ? "✓" : "✗"} ${c.name.padEnd(42)} ` +
      `${c.fg} / ${c.bg}  ${ratio.toFixed(2).padStart(6)}:1  ` +
      `(mín. ${c.min})`,
  );
}

console.log(
  `\n${failures === 0 ? "PASS" : "FAIL"}: ${checks.length - failures}/${checks.length} pares cumplen el umbral.`,
);
process.exit(failures === 0 ? 0 : 1);
