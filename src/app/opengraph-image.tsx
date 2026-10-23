import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { dict } from "@/i18n/dict";
import { getHeroKpis, withYears } from "@/data/resume";
import { getYearsOfExperience } from "@/data/years";

/* Tarjeta social del CV. Replica el hero (chrome de terminal, nombre
   apilado, subrayado de marca, rol, meta y KPIs) sobre el tema oscuro.

   Dos restricciones de satori marcan cómo está escrito esto:
   1. No resuelve variables CSS ni `display: grid`, así que los valores de
      globals.css van inlineados y todo el layout es flex.
   2. No soporta `.woff2`, solo TTF/OTF — de ahí los archivos estáticos en
      src/assets/fonts (ver README para cómo se regeneran). */

export const alt =
  "Félix Javier Núñez González — Ingeniero IT & Lead Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_DIR = join(process.cwd(), "src/assets/fonts");

const [bricolageRegular, bricolageBold, plexRegular, plexMedium] =
  await Promise.all([
    readFile(join(FONT_DIR, "bricolage-grotesque-v9-latin-regular.ttf")),
    readFile(join(FONT_DIR, "bricolage-grotesque-v9-latin-700.ttf")),
    readFile(join(FONT_DIR, "ibm-plex-mono-v20-latin-regular.ttf")),
    readFile(join(FONT_DIR, "ibm-plex-mono-v20-latin-500.ttf")),
  ]);

/* Tokens del tema oscuro de globals.css (.dark) */
const PAPER = "#12101f";
const INK = "#eceaf6";
const MUTED = "#a29dc0";
const BRAND = "#8b80ff";

/* Mismos hues por métrica que KPI_HUES en Hero.tsx */
const KPI_HUES = [BRAND, "#fb923c", "#34d399"];

const t = dict.es.hero;

export default async function Image() {
  /* La imagen se genera dentro del contexto de la ruta: calcular aquí
     (y no en module scope) permite usar el scope `use cache`. */
  const years = await getYearsOfExperience();
  const meta = withYears(t.meta, years);
  const kpis = getHeroKpis(dict.es, years);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          backgroundColor: PAPER,
          /* Halo de marca equivalente a .hero-texture, suavizado */
          backgroundImage: `radial-gradient(900px 620px at 84% -12%, rgba(139,128,255,0.20), transparent 64%)`,
        }}
      >
        {/* Chrome de terminal: mismo prompt que la ventana profile.ts */}
        <div
          style={{
            display: "flex",
            fontFamily: "Plex",
            fontWeight: 400,
            fontSize: 20,
            color: MUTED,
            marginBottom: 26,
          }}
        >
          <span style={{ color: BRAND }}>$&nbsp;</span>
          {t.code.prompt}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Bricolage",
            fontWeight: 700,
            fontSize: 84,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: INK,
          }}
        >
          <span>FÉLIX JAVIER</span>
          <span>NÚÑEZ GONZÁLEZ</span>
        </div>

        {/* Subrayado de marca: mismo gradiente que .name-underline */}
        <div
          style={{
            display: "flex",
            marginTop: 22,
            width: 420,
            height: 7,
            borderRadius: 999,
            backgroundImage:
              "linear-gradient(90deg, #8b80ff, #2fb6db 55%, #a78bfa)",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontFamily: "Bricolage",
            fontWeight: 500,
            fontSize: 34,
            color: INK,
          }}
        >
          {t.role}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontFamily: "Plex",
            fontWeight: 500,
            fontSize: 21,
            color: MUTED,
          }}
        >
          {meta}
        </div>

        {/* KPIs: mismas métricas y colores que el hero */}
        <div style={{ display: "flex", marginTop: 44, gap: 60 }}>
          {kpis.map((kpi, i) => (
            <div key={kpi.label} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Plex",
                  fontWeight: 400,
                  fontSize: 15,
                  color: MUTED,
                }}
              >
                {kpi.label}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "Bricolage",
                    fontWeight: 700,
                    fontSize: 38,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: KPI_HUES[i] ?? INK,
                  }}
                >
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span
                    style={{
                      fontFamily: "Plex",
                      fontWeight: 400,
                      fontSize: 16,
                      color: MUTED,
                      marginLeft: 6,
                    }}
                  >
                    {kpi.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolageRegular, style: "normal", weight: 400 },
        { name: "Bricolage", data: bricolageBold, style: "normal", weight: 700 },
        { name: "Plex", data: plexRegular, style: "normal", weight: 400 },
        { name: "Plex", data: plexMedium, style: "normal", weight: 500 },
      ],
    }
  );
}
