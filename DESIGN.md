# DESIGN.md — Sistema de diseño del CV de Félix Núñez

Landing CV de un Ingeniero IT & Lead Full Stack. Mundo visual: **documentación técnica de calidad** (papel de specs) con **un solo dispositivo memorable: la experiencia como grafo de git** (HEAD, nodos, diff stats, `+`/`−` como líneas agregadas/quítadas). Modo de superficie: Persuade — reclutador técnico decide contactar en <10 segundos de escaneo.

## Color

Los componentes **solo** consumen tokens semánticos. Nunca hex, nunca escalas directas.

### Capa semántica (`:root` claro / `.dark` oscuro)

| Token | Claro | Oscuro | Rol |
|---|---|---|---|
| `--background` | `#F5F7F8` | `#0E1116` | Fondo de página (papel frío / tinta) |
| `--surface` | `#FFFFFF` | `#151A21` | Superficie elevada (reservada) |
| `--foreground` | `#0E1116` | `#ECEFF3` | Texto principal |
| `--muted` | `#5A6472` | `#98A2B0` | Texto secundario (≥4.5:1 en ambos temas) |
| `--rule` | `#DDE3E9` | `#252D38` | Hairlines, divisores, bordes |
| `--accent` | `#2C5FFF` | `#6E90FF` | Cobalto: único color de énfasis interactivo |
| `--accent-contrast` | `#F8FAFC` | `#0B0F14` | Texto sobre acento sólido |
| `--added` | `#15803D` | `#3FB950` | Git: «línea agregada» (marcadores de logros, `+`) |
| `--removed` | `#B91C1C` | `#F85149` | Git: «línea quitada» (`−` al plegar) |

### Color temático (contenido, no decoración)

Tres sistemas de color ganados por el contenido, coherentes con el mundo "código fuente":

- **Language dots** (`src/data/tech-colors.ts`): cada tecnología del Stack lleva un punto de 9px con su **color de marca real** (paleta estilo GitHub). Solo aplica a tecnologías; las prácticas van sin punto.
- **Hue por categoría** (`STACK_HUES`): la regla superior de cada grupo del Stack (2px) lleva el hue de su categoría — integración cian, cloud violeta, backend naranja, frontend azul, prácticas esmeralda.
- **Semántica git diff**: los marcadores de cada logro son líneas agregadas → verdes (`--added`); el toggle `+` es verde y el `−` rojo, con el glifo rotando al plegar.

Reglas del acento: el cobalto se gasta en el grafo de git (nodos, HEAD), el CTA primario, foco y hovers de enlace. Nada más.

### Tema

- Tailwind v4 con variante `dark` por clase (`.dark` en `<html>`).
- `src/theme/theme-context.tsx` (`useSyncExternalStore`): la elección del usuario se guarda en `localStorage` (`cv-theme`); sin elección se sigue `prefers-color-scheme` en vivo.
- Script anti-FOUC en `<head>` de `layout.tsx` aplica la clase antes del primer paint.
- El toggle en el header muestra el icono (SVG authored, trazo 1.5) del tema **al que se cambia**.
- `@media print` fuerza siempre la paleta clara.

## Tipografía

- **Archivo** (400–700): display y body. **JetBrains Mono** (400–500): exclusivamente datos de ingeniería (fechas, empresas, categorías, HEAD, stats). Self-hosted vía `next/font`.

Escala semántica (`@theme`, Tailwind v4):

| Token | px | Uso |
|---|---|---|
| `--text-meta` | 13 | Datos mono, subtítulos (`.subhead`), footer |
| `--text-detail` | 15 | Enlaces, listas, certs, bullets |
| `--text-body` | 17 | Párrafo de síntesis (medida `58ch` ≈ 74 chars) |
| `--text-lead` | 19 | Rol del hero, items de stack primarios, títulos de educación |

Display: nombre en hero `clamp(2.6rem, 8.5vw, 4.75rem)` SemiBold, tracking `-0.03em` (piso del craft floor: `-0.04em`). Títulos de sección 25/31px.

## Layout

- `--container-cv: 1080px` → utility `max-w-cv`, consumido por `ui/Container` (gutter `px-6`/`md:px-10`).
- Alineación: una sola columna fuerte a la izquierda; nada centrado.
- Secciones separadas por `border-t border-rule`; más espacio encima del título que debajo (`py-14/20` + `mt-8/10`).

## Componentes (`src/components/ui/`)

| Componente | Intención | Veces usada |
|---|---|---|
| `Container` | Ancho de contenido y gutter del proyecto | 4 |
| `Section` | Regla + título display + contenido | 4 |
| `TextLink` | Enlace de texto, underline `rule` → `accent` en hover | 5 |

Patrón de clase (no componente): `.subhead` — mono 13px muted para etiquetas de categoría, aplicable a `h3`/`dt` sin forzar el tag.

Componentes de página: `Header` (lang + theme toggle), `Hero`, `Stack`, `ExperienceTimeline` (grafo de git), `Formacion`, `Footer`. Contenido tipado en `src/i18n/dict.ts` (ES/EN); los componentes nunca hardcodean copy.

## Movimiento

Curvas de easing fuertes en `:root`: `--ease-out` (`0.23, 1, 0.32, 1`), `--ease-in-out` (`0.77, 0, 0.175, 1`), `--ease-drawer` (`0.32, 0.72, 0, 1`). Las default de CSS se sienten flojas; estas dan punch.

- **Revelo de carga del hero**: stagger 0/80/160/220/300/380ms con `--ease-out`.
- **Revelado por scroll** (`.reveal` + `useReveal`/`Reveal`): grupos del Stack (stagger 60ms) y entradas del timeline entran una sola vez desde abajo; se desconecta el `IntersectionObserver` al primer cruce.
- **Press-feedback** (`.press`): todo elemento presionable escala a `0.97` en `:active` a 160ms — botón de descarga, toggles de idioma/tema, enlaces, cabeceras del timeline.
- **Sweep del CTA**: el botón de descarga rellena con un overlay direccional (`-translate-x-full` → `0`, `--ease-drawer`) al hover, con el texto invirtiendo color.
- **Morph del icono de tema**: luna y sol apilados, rotan 90° y se funden con `--ease-in-out`.
- **Grafo de git**: el panel de logros despliega con `grid-template-rows` a 260ms y `--ease-out`; el glifo `+`/`−` rota 180° al plegar.
- Todo respeta `prefers-reduced-motion`: se conservan fades de opacidad (ayudan a comprender) y se quitan los transforms (provocan mareo).

## Superficies del navegador

Selección de texto (`accent` 24%), caret heredado, scrollbar (`rule`, thin), foco visible (`outline` accent 2px) — todo temado desde la paleta.

## Print / PDF

`window.print()` → "Descargar CV": header y CTAs ocultos (`.no-print`), toggles `+/−` ocultos, **todos los logros expandidos** (`.exp-panel`), contacto visible en el hero (`.print:block`), paleta forzada a clara, `@page margin: 14mm`, `print-color-adjust: exact`.

## Accesibilidad

Contraste AA en ambos temas; `aria-pressed` (idioma), `aria-expanded` + `aria-label` (toggle de logros), `aria-label` (tema), `role="group"` (selector de idioma), landmarks `main`/`header`/`footer`, JSON-LD `Person` en `page.tsx`.
