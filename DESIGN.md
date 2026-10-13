# DESIGN.md — Sistema de diseño del CV de Félix Núñez

Landing CV de un Ingeniero IT & Lead Full Stack. Mundo visual: **herramienta de desarrollo de calidad** (superficies de editor/terminal) con **dos dispositivos memorables: la experiencia como grafo de git** (HEAD, hashes, diff stats, `+`/`−` como líneas agregadas/quítadas) y **el perfil como archivo `profile.ts`** en el hero. Modo de superficie: Persuade — reclutador técnico decide contactar en <10 segundos de escaneo.

## Color

Los componentes **solo** consumen tokens semánticos. Nunca hex, nunca escalas directas.

### Capa semántica (`:root` claro / `.dark` oscuro)

| Token | Claro | Oscuro | Rol |
|---|---|---|---|
| `--background` | `#F5F7F8` | `#0E1116` | Fondo de página (papel frío / tinta) |
| `--surface` | `#FFFFFF` | `#151A21` | Superficie de panel (KPIs, timeline, stack) |
| `--foreground` | `#0E1116` | `#ECEFF3` | Texto principal |
| `--muted` | `#5A6472` | `#98A2B0` | Texto secundario (≥4.5:1 en ambos temas) |
| `--rule` | `#DDE3E9` | `#252D38` | Hairlines, divisores, bordes |
| `--accent` | `#2C5FFF` | `#6E90FF` | Cobalto: único color de énfasis interactivo |
| `--accent-contrast` | `#F8FAFC` | `#0B0F14` | Texto sobre acento sólido |
| `--added` | `#15803D` | `#3FB950` | Git: «línea agregada» (marcadores de logros, `+`, strings de código) |
| `--removed` | `#B91C1C` | `#F85149` | Git: «línea quitada» (`−` al plegar) |

### Superficie y elevación (lo que hace que se sienta «robusta»)

La elevación la define el **borde**, no la sombra. Tokens en `:root`/`.dark`:

- `--panel-radius: 6px` → utility `rounded-panel` — el único radio del sistema.
- `--panel-shadow` → utility `shadow-panel`: en claro, sombra de dos capas casi imperceptible; en oscuro, `inset` de un pelo de luz en el canto superior (allí manda el borde). Se anula en print (`--panel-shadow: none`).

El primitivo es `ui/Panel` (superficie + borde `rule` + radio + sombra). Todo bloque con estructura —KPIs, entradas del timeline, grupos del stack, la formación— se construye con él para que borde, radio y sombra sean idénticos en todo el sitio. El hover de un panel interactivo lleva el borde a `accent` con alpha.

### Color temático (contenido, no decoración)

Tres sistemas de color ganados por el contenido, coherentes con el mundo «código fuente»:

- **Language dots** (`src/data/tech-colors.ts`): cada tecnología del Stack lleva un punto de 9px con su **color de marca real** (paleta estilo GitHub). Solo aplica a tecnologías; las prácticas van sin punto (marcadas con un guión mono para alinear la columna).
- **Hue por categoría** (`STACK_HUES`): la regla superior de cada panel del Stack (2px) lleva el hue de su categoría — integración cian, cloud violeta, backend naranja, frontend azul, prácticas esmeralda.
- **Syntax highlighting del `profile.ts`**: keyword (`interface`) en accent, identificadores en foreground, strings en `--added` (verde), puntuación en muted. Es texto, no decoración — por eso reutiliza la paleta semántica y no colores nuevos.
- **Semántica git diff**: los marcadores de cada logro son líneas agregadas → verdes (`--added`); el toggle `+` es verde y el `−` rojo, con el glifo rotando al plegar.

Reglas del acento: el cobalto se gasta en el grafo de git (nodos, HEAD), el CTA primario, foco, hovers de enlace y el hash de cada commit. Nada más.

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
- Alineación: una sola columna fuerte a la izquierda como base; nada centrado. **Excepción deliberada**: el hero es una grilla asimétrica `1.05fr / 0.95fr` en `lg` (identidad + KPIs a la izquierda, ventana `profile.ts` a la derecha); en móvil el `profile.ts` cae debajo de los CTAs.
- Secciones separadas por `border-t border-rule`; más espacio encima del título que debajo (`py-14/20` + `mt-8/10`). Cada sección ancla con `id` + `scroll-mt-24` para el scrollspy.

## Componentes (`src/components/ui/`)

| Componente | Intención | Veces usada |
|---|---|---|
| `Container` | Ancho de contenido y gutter del proyecto | 6 |
| `Section` | Regla + título display + contenido (+ `id` para anclas) | 5 |
| `Panel` | Superficie elevada: borde `rule`, radio 6px, sombra viva | 7 |
| `TextLink` | Enlace de texto, underline `rule` → `accent` en hover | 5 |
| `Reveal` / `useReveal` | Revelado por scroll, una sola vez | — |
| `useScrollSpy` | Sección activa según scroll (umbrales del header) | 1 |

Patrón de clase (no componente): `.subhead` — mono 13px muted para etiquetas de categoría, aplicable a `h3`/`dt` sin forzar el tag.

Componentes de página: `Header` (lang + theme toggle + `Breadcrumb`), `Hero` (+ `ProfileWindow`), `Stack`, `ExperienceTimeline` (grafo de git), `Formacion`, `Footer`, `StatusBar`. Contenido tipado en `src/i18n/dict.ts` (ES/EN); los componentes nunca hardcodean copy — ni siquiera el contenido del bloque `profile.ts`, que vive en `hero.code`, ni los hashes cosméticos del timeline.

### Chrome de herramienta

Dos dispositivos envuelven la página como un editor, ambos `no-print`:

- **`Breadcrumb`** (dentro del header sticky): ruta `~/cv/<sección>.md` que sigue el scroll vía `useScrollSpy`, con `aria-current="location"`; a la derecha, atajos a secciones en mono (ocultos en mobile). El archivo usa el label localizado de la sección.
- **`StatusBar`** (fija abajo): rama `main`, `UTF-8`, `LF`, `TSX`, idioma y un punto verde de disponibilidad. Altura 28px reservada en `body` para no tapar contenido.

### Dispositivos de contenido

- **`ProfileWindow`**: ventana de editor (semáforo + pestaña `profile.ts`) con `$ cat profile.ts` y una `interface Profile` con syntax highlighting. Alineación de propiedades por padding mono; caret que parpadea al final del `status`.
- **Timeline tipo `git log`**: cada entrada es un panel con hash corto (cosmético, determinístico) en accent, badge `HEAD → main` en el rol actual, y el toggle `+`/`−` de diff. Los logros se despliegan dentro del panel con borde superior.
- **Stack tipo manifiesto**: cada grupo es un panel con filas alineadas — punto de color de marca, nombre (lead si es `primary`, muted si no) y hue de categoría como regla superior.
- **KPIs del hero**: tres paneles con label mono (`subhead`), cifra display 28px y unidad mono muted.

## Movimiento

Curvas de easing fuertes en `:root`: `--ease-out` (`0.23, 1, 0.32, 1`), `--ease-in-out` (`0.77, 0, 0.175, 1`), `--ease-drawer` (`0.32, 0.72, 0, 1`). Las default de CSS se sienten flojas; estas dan punch.

- **Revelo de carga del hero**: stagger 0/80/160/220/300/380ms con `--ease-out`.
- **Revelado por scroll** (`.reveal` + `useReveal`/`Reveal`): grupos del Stack (stagger 60ms) y entradas del timeline entran una sola vez desde abajo; se desconecta el `IntersectionObserver` al primer cruce.
- **Press-feedback** (`.press`): todo elemento presionable escala a `0.97` en `:active` a 160ms — botón de descarga, toggles de idioma/tema, enlaces, cabeceras del timeline.
- **Sweep del CTA**: el botón de descarga rellena con un overlay direccional (`-translate-x-full` → `0`, `--ease-drawer`) al hover, con el texto invirtiendo color.
- **Morph del icono de tema**: luna y sol apilados, rotan 90° y se funden con `--ease-in-out`.
- **Grafo de git**: el panel de logros despliega con `grid-template-rows` a 260ms y `--ease-out`; el glifo `+`/`−` rota 180° al plegar.
- **Cursor del `profile.ts`**: `.caret` parpadea a 1.1s con `steps(1, end)` — el único loop del sitio, y el primero en apagarse.
- **Scroll suave**: `html { scroll-behavior: smooth }` solo dentro de `@media (prefers-reduced-motion: no-preference)`; los atajos del breadcrumb navegan sin mareo para quien lo pide.
- **Punto de disponibilidad** (status bar): pulso `animate-pulse` de Tailwind, `motion-safe` — sin reduced-motion no late.
- Todo respeta `prefers-reduced-motion`: se conservan fades de opacidad (ayudan a comprender) y se quitan los transforms (provocan mareo); el caret deja de parpadear.

## Superficies del navegador

Selección de texto (`accent` 24%), caret heredado, scrollbar (`rule`, thin), foco visible (`outline` accent 2px) — todo temado desde la paleta.

## Print / PDF

`window.print()` → "Descargar CV": header, breadcrumb, status bar y CTAs ocultos (`.no-print`), toggles `+/−` ocultos, **todos los logros expandidos** (`.exp-panel`), contacto visible en el hero (`.print:block`), paleta forzada a clara, `@page margin: 14mm`, `print-color-adjust: exact`, `--panel-shadow: none` (los paneles quedan solo con borde) y `body` sin el padding de la status bar. El bloque `profile.ts` **sí se imprime**: es contenido, no chrome.

## Accesibilidad

Contraste AA en ambos temas; `aria-pressed` (idioma), `aria-expanded` + `aria-label` (toggle de logros), `aria-label` (tema), `role="group"` (selector de idioma), `aria-label` en el `nav` del breadcrumb con `aria-current="location"` en la ruta y en la sección activa; la status bar es `aria-hidden` (ambiente, no información). Landmarks `main`/`header`/`footer`/`nav`, JSON-LD `Person` en `page.tsx`.
