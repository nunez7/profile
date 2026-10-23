# DESIGN.md — Sistema de diseño del CV de Félix Núñez

Landing CV de un Ingeniero IT & Lead Full Stack. Mundo visual: **herramienta de desarrollo de calidad** (superficies de editor/terminal) con **dos dispositivos memorables: la experiencia como grafo de git** (HEAD, hashes, diff stats, `+`/`−` como líneas agregadas/quítadas) y **el perfil como archivo `profile.ts`** en el hero. Modo de superficie: Persuade — reclutador técnico decide contactar en <10 segundos de escaneo.

## Color

Los componentes **solo** consumen tokens semánticos. Nunca hex, nunca escalas directas.

### Capa semántica (`:root` claro / `.dark` oscuro)

Marca: **ultravioleta** (`#4338F0` / `#8B80FF`). Cada tema está diseñado por separado — el claro sobre papel lavanda, el oscuro con los negros tintados hacia la marca. Nada de negro puro ni gris frío.

| Token | Claro | Oscuro | Rol |
|---|---|---|---|
| `--background` | `#F1EFF9` | `#12101F` | Fondo de página (papel lavanda / negro tintado índigo) |
| `--surface` | `#FFFFFF` | `#1A1730` | Superficie de panel (KPIs, timeline, stack) |
| `--surface-elevated` | `#FCFBFF` | `#221E3C` | Capa alta: ventana `profile.ts` del hero |
| `--foreground` | `#16142A` | `#ECEAF6` | Texto principal (tinta índigo) |
| `--muted` | `#565170` | `#A29DC0` | Texto secundario (6.6:1 / 7.3:1 sobre fondo) |
| `--rule` | `#DAD6EC` | `#2B2745` | Hairlines, divisores, bordes |
| `--brand` | `#4338F0` | `#8B80FF` | Color de marca (6.0–6.9:1 claro / 5.0–5.9:1 oscuro) |
| `--accent` | `var(--brand)` | `var(--brand)` | Alias de marca para utilities (`text-accent`, foco) |
| `--accent-contrast` | `#FFFFFF` | `#14122A` | Texto sobre acento sólido (5.8:1) |
| `--added` | `#047857` | `#34D399` | Git: «línea agregada» (marcadores de logros, `+`, strings) |
| `--removed` | `#BE123C` | `#FB7185` | Git: «línea quitada» (`−` al plegar) |

**Acentos semánticos por categoría** — los «tokens de sintaxis» del mundo IDE. Cada categoría del stack vive siempre en su color: regla superior de la tarjeta, icono, nodo del timeline y KPI asociado. Saturados en claro (AA sobre blanco), con brillo controlado en oscuro:

| Token | Claro | Oscuro | Categoría |
|---|---|---|---|
| `--cat-integration` | `#0D759D` | `#2FB6DB` | Integración (cian) |
| `--cat-cloud` | `#6D28D9` | `#A78BFA` | Cloud (violeta) |
| `--cat-backend` | `#C2410C` | `#FB923C` | Backend (naranja) |
| `--cat-frontend` | `#1D4ED8` | `#60A5FA` | Frontend (azul) |
| `--cat-practices` | `#047857` | `#34D399` | Prácticas (esmeralda) |

`STACK_HUES` y `COMPANY_COLORS` (`src/data/tech-colors.ts`) devuelven estas vars, así que los componentes no conocen hex. El contraste se verifica por script — `npm run check:contrast` (`scripts/check-contrast.mjs`, Node sin dependencias): parsea `globals.css` (claro, oscuro y el override de print), resuelve las vars y exige **≥4.5:1** para pares de texto y **≥3:1** para estados de interacción (borde hover por hue de categoría/empresa, anillo de foco); falla con código 1 si algún par baja del umbral.

### Superficie y elevación (tres capas con sombra tintada)

La elevación combina **borde + sombra con color de marca** (nunca gris neutro). Tokens en `:root`/`.dark`:

- `--panel-radius: 6px` → utility `rounded-panel` — el único radio del sistema (CTA primario, toggle de tema y pestaña `profile.ts` incluidos).
- `--panel-shadow` → `shadow-panel`: en claro, dos capas tintadas en ultravioleta al 7–10% — en el tema claro la sombra define la altura, así que los alfás pesan sobre el papel lavanda; en oscuro, `inset` de un pelo de luz en el canto superior (allí manda el borde).
- `--elevated-shadow` → `shadow-elevated`: capa alta (`Panel elevated`), tinte más pronunciado (8–14%). Reservado al `profile.ts`.
- Ambas sombras se anulan en print.

La profundidad del claro es una decisión de escalera: papel lavanda (`#F1EFF9`) → tarjeta blanca → capa elevada casi blanca con sombra ancha. El papel va deliberadamente un punto más profundo que la tarjeta para que el blanco lea como elevación; los hairlines (`--rule`) se quedan en ~1.4:1 — visibles sin competir.

El primitivo es `ui/Panel` (superficie + borde `rule` + radio, con la prop `hue` que dibuja la regla superior de 2px — mismo patrón en KPIs y grupos del stack). La elevación es jerárquica, no uniforme: **`flat`** (solo borde, sin sombra) para estructura estática —KPIs, grupos del stack, formación—; **`shadow-panel`** para las entradas interactivas del timeline, donde la sombra señala «clicable»; **`elevated`** para el `profile.ts`. El hover de tarjeta (prop `hoverHue`, solo Stack y Timeline; gateado en `@media (hover: hover) and (pointer: fine)`) tiñe **todo el borde** con el hue de la categoría/empresa y sube la tarjeta un rung de escalera — `flat` gana `--panel-shadow`, la ya sombreada `--elevated-shadow` — con `translate: -2px` a 200ms `--ease-out`; los pares de borde hue contra tarjeta y fondo se verifican a ≥3:1 (WCAG 1.4.11). Formación, KPIs y `profile.ts` permanecen estáticos: no son «clicables», elevarlos mentiría.

### Color temático (contenido, no decoración)

Tres sistemas de color ganados por el contenido, coherentes con el mundo «código fuente»:

- **Iconos de tecnología** (`src/data/tech-icons.ts` + `TECH_COLORS`): cada tecnología del Stack lleva un icono de simple-icons (17 paths SVG, CC0, sin dependencias) tiñido con su **color de marca real** (paleta estilo GitHub). Anypoint Studio y Apigee no existen en simple-icons → caen al punto de color de 9px. Las prácticas no son «tecnología»: van sin icono, marcadas con un guión mono para alinear la columna.
- **Hue por categoría** (`STACK_HUES`): la regla superior de cada panel del Stack (2px) lleva el hue semántico de su categoría — integración cian, cloud violeta, backend naranja, frontend azul, prácticas esmeralda.
- **Syntax highlighting del `profile.ts`**: keyword (`interface`) en accent, identificadores en foreground, strings en `--added` (verde), puntuación en muted. Es texto, no decoración — por eso reutiliza la paleta semántica y no colores nuevos.
- **Semántica git diff**: los marcadores de cada logro son líneas agregadas → verdes (`--added`); el toggle `+` es verde y el `−` rojo, con el glifo rotando al plegar.
- **Empresas diferenciadas** (`COMPANY_COLORS`): cada nodo del timeline tiñe anillo, hash y badge HEAD con el color de su empresa (VASS → marca índigo, Universidad → cian — hashes bien separados en el grafo). El HEAD va relleno con halo suave del mismo color; el rail se enciende en marca hacia arriba (`.exp-rail`).
- **KPIs con color por métrica**: experiencia → marca, trayectoria → backend, certificaciones → prácticas (borde superior + cifra en el color).

Reglas del acento: la marca es el color de la acción y del estado activo. Se gasta en el CTA primario, el anillo de foco, los hovers de enlace, el hash del commit actual y el rail hacia HEAD; y — decisión explícita de 2026 que sustituye al «nada más» anterior — en el punto del logo `FJN.`, la ruta activa del breadcrumb y el subrayado deslizante de la sección activa, el subrayado del idioma seleccionado, el caret y el `$`/`interface` del `profile.ts`, y la cifra del KPI «experiencia». Cada gasto es identidad de herramienta; el CTA sigue siendo el único elemento relleno de la página.

### Textura del hero

El hero lleva una capa absoluta (`.hero-texture`) con tres fondos: dos halos radiales (marca 13% arriba-derecha, integración 10% abajo-izquierda), un grid hairline de 72px en `--hero-grid-line` que se desvanece con `mask-image`, y ruido de papel (SVG feTurbulence, `multiply` en claro / `soft-light` en oscuro). El nombre lleva un **subrayado de gradiente** (marca → cian → violeta) que se dibuja una vez al cargar (`underline-draw`, 640ms, con `prefers-reduced-motion` respetado) — el momento elaborado del sitio.

### Tema

- Tailwind v4 con variante `dark` por clase (`.dark` en `<html>`).
- `src/theme/theme-context.tsx` (`useSyncExternalStore`): la elección del usuario se guarda en `localStorage` (`cv-theme`); sin elección se sigue `prefers-color-scheme` en vivo.
- Script anti-FOUC en `<head>` de `layout.tsx` aplica la clase antes del primer paint.
- El toggle en el header muestra el icono (SVG authored, trazo 1.5) del tema **al que se cambia**.
- `@media print` fuerza siempre la paleta clara.

## Tipografía

- **Bricolage Grotesque** (400–800): display y body — grotesca con carácter (axes ópticos, detalles quirúrgicos), poco vista. **IBM Plex Mono** (400–600): exclusivamente datos de ingeniería (fechas, empresas, categorías, HEAD, stats) — más personalidad que la mono habitual. Self-hosted vía `next/font` (`--font-display` / `--font-plex` → `--font-sans` / `--font-mono` en `@theme inline`).

Escala semántica (`@theme`, Tailwind v4):

| Token | px | Uso |
|---|---|---|
| `--text-meta` | 13 | Datos mono, subtítulos (`.subhead`), footer |
| `--text-detail` | 15 | Enlaces, listas, certs, bullets |
| `--text-body` | 17 | Párrafo de síntesis (medida `58ch` ≈ 74 chars) |
| `--text-lead` | 19 | Rol del hero, items de stack primarios, títulos de educación |

Display: nombre en hero `clamp(2.6rem, 8.5vw, 4.75rem)` Bold (700), tracking `-0.03em`. Títulos de sección 25/31px.

## Layout

- `--container-cv: 1080px` → utility `max-w-cv`, consumido por `ui/Container` (gutter `px-6`/`md:px-10`).
- Alineación: una sola columna fuerte a la izquierda como base; nada centrado. **Excepción deliberada**: el hero es una grilla asimétrica `1.05fr / 0.95fr` en `lg` (identidad + KPIs a la izquierda, ventana `profile.ts` a la derecha); en móvil el `profile.ts` cae debajo de los CTAs. Síntesis usa una grilla `1fr / 15rem` en `lg`: bloque de frases cortas `58ch` a la izquierda y un aside con hairline izquierdo (disponibilidad, ubicación, enfoque) a la derecha; en móvil el aside cae debajo con hairline superior. Debajo, tres highlights (Liderazgo / Arquitectura / Integración) en columnas con un `+` verde. Ambos hijos de la grilla del hero llevan `min-w-0`: el ancho lo pone la grilla, nunca el contenido monospace.
- Secciones separadas por `border-t border-rule`; más espacio encima del título que debajo (`py-14/20` + `mt-8/10`). Cada sección ancla con `id`; el offset del header sticky lo da un único `html { scroll-padding-top: 4.5rem }` (no se suma un `scroll-mt` por sección, que duplicaría el hueco).

## Componentes (`src/components/ui/`)

| Componente | Intención | Veces usada |
|---|---|---|
| `Container` | Ancho de contenido y gutter del proyecto | 6 |
| `Section` | Regla + título display + contenido (+ `id` para anclas) | 5 |
| `Panel` | Superficie con elevación jerárquica: `flat` (estructura estática, solo borde), sombra viva (entradas interactivas), `elevated` (hero); prop `hue` para regla de categoría, prop `hoverHue` para hover de borde + elevación | 13 |
| `TextLink` | Enlace de texto, underline `rule` → `accent` en hover; variante `quiet` (muted hasta hover) para junto al CTA primario | 5 |
| `Reveal` / `useReveal` | Revelado por scroll, una sola vez | — |
| `useScrollSpy` | Sección activa según scroll (umbrales del header) | 1 |

Patrón de clase (no componente): `.subhead` — mono 13px muted para etiquetas de categoría, aplicable a `h3`/`dt` sin forzar el tag.

Componentes de página: `Header` (lang + theme toggle + `Breadcrumb`), `Hero` (+ `ProfileWindow`), `Stack`, `ExperienceTimeline` (grafo de git), `Formacion`, `Footer` (CTA de cierre; teléfono como texto — el número va enmascarado, sin `tel:`), `StatusBar`. Contenido tipado en `src/i18n/dict.ts` (ES/EN); los componentes nunca hardcodean copy — ni siquiera el contenido del bloque `profile.ts`, que vive en `hero.code`, ni los hashes cosméticos del timeline.

### Chrome de herramienta

Dos dispositivos envuelven la página como un editor, ambos `no-print`:

- **`Breadcrumb`** (dentro del header sticky): ruta `~/cv/<sección>.md` que sigue el scroll vía `useScrollSpy`; a la derecha, atajos a secciones en mono (ocultos en mobile) con `aria-current="location"` solo en el activo y `aria-label` con el nombre de la sección (el texto visible es el archivo). El estado activo es una barra de 2px en accent que se desliza entre archivos (220ms, `transform`; se re-mide al cambiar sección/idioma, en resize y al cargar fuentes). El archivo de la ruta usa el label localizado.
- **`StatusBar`** (fija abajo): rama `main`, `UTF-8`, `LF`, `TSX`, idioma y un punto verde de disponibilidad. Altura 28px reservada en `body` para no tapar contenido.

### Dispositivos de contenido

- **`ProfileWindow`**: ventana de editor (semáforo + pestaña `profile.ts`) con `$ cat profile.ts` y una `interface Profile` con syntax highlighting. Alineación de propiedades por padding mono; caret que parpadea al final del `status`.
- **Timeline tipo `git log`**: cada entrada es un panel con hash corto (cosmético, determinístico) en accent, badge `HEAD → main` en el rol actual, y el toggle `+`/`−` de diff. Bajo la cabecera, una fila de chips con las tecnologías del rol (punto en su color de marca) queda **siempre visible**, incluso con la entrada plegada y fuera del `<button>` para no ocultarla a lectores de pantalla. Dentro del panel, 3–4 logros orientados a impacto, sin cifras inventadas; cualquier dato pendiente se marca entre corchetes (p. ej. el rango de la ACE) y se resalta en mono con subrayado punteado. La primera entrada nace abierta en desktop; en móvil (<768px) todas nacen plegadas — el escaneo ve los tres puestos y su stack sin hacer scroll.
- **Stack tipo manifiesto**: cada grupo es un panel con filas alineadas — punto de color de marca, nombre (lead si es `primary`, muted si no) y hue de categoría como regla superior.
- **KPIs del hero**: label mono (`subhead`), cifra display 28px en color de su métrica y unidad mono muted. En `sm+`, tres paneles `flat` con borde superior en ese color; en `<sm`, filas hairline (label a la izquierda, cifra a la derecha, separadas por `border-rule`) — tres paneles apilados costaban ~280px y empujaban `profile.ts` a la tercera pantalla. Las cifras se derivan del contenido: años desde ene 2016, número de roles y de certificaciones (`getHeroKpis`), no literales en el copy.
- **Formación y certificaciones**: la ACE abre la sección como tarjeta `flat` con ícono de GCP, emisor y año o rango (`[2026-2029]`, entre corchetes si falta confirmarlo). El resto se agrupa en cinco dominios con la regla superior de su hue — Cloud & DevOps, Integración & APIs, Backend & Arquitectura, Frontend y Liderazgo — en listas hairline (una columna en móvil, dos en `sm+`).

## Movimiento

Curvas de easing fuertes en `:root`: `--ease-out` (`0.23, 1, 0.32, 1`), `--ease-in-out` (`0.77, 0, 0.175, 1`), `--ease-drawer` (`0.32, 0.72, 0, 1`). Las default de CSS se sienten flojas; estas dan punch.

- **Revelo de carga del hero**: stagger 0/80/160/220/300ms para el bloque del hero y 380/440/500ms para los tres KPIs (uno por panel, dentro de su bloque) con `--ease-out`.
- **Revelado por scroll** (`.reveal` + `useReveal`/`Reveal`): grupos del Stack (stagger 60ms), entradas del timeline (stagger 60ms vía `transitionDelay` en el `li`) y bloques de Formación (educación 0ms, ACE 80ms, grupos de certificaciones 60ms entre sí) entran una sola vez desde abajo; se desconecta el `IntersectionObserver` al primer cruce.
- **Hover de tarjeta** (`.panel-hover`): solo `(hover: hover) and (pointer: fine)` — en táctil el hover queda pegado tras el tap y confunde el escaneo. Borde al hue + elevación un rung + `translate: -2px`, todo a 180–200ms `--ease-out`. Con `prefers-reduced-motion` se conserva el color de borde (es estado, no adorno) y desaparece el lift.
- **Transición de tema**: `.theme-transition` se añade a `<html>` solo durante el toggle del usuario y se retira a los 300ms — todos los colores (superficies, texto, bordes) cruzan a 250ms `--ease-in-out`. La carga inicial **no** lleva la clase: el init script de `layout.tsx` aplica el tema antes del primer paint, así que abrir la página sigue siendo sin parpadeo. Bajo `prefers-reduced-motion` el JS no añade la clase y la regla CSS se apaga: cambio instantáneo. Las sombras no se animan: cruzar exteriores ↔ `inset` no interpola y saltaría; el cambio instantáneo es imperceptible bajo el fundido de color.
- **Transición de idioma**: `withViewTransition` ejecuta el cambio de dict dentro de una View Transition del navegador (220ms, crossfade + `blur(2px)` de entrada) para que el reflujo de alturas no se lea como un salto; los hashes del timeline son keys estables, así que las entradas no se remontan ni pierden su reveal. Sin soporte o con `prefers-reduced-motion`, el cambio es instantáneo.
- **Indicador del breadcrumb**: barra de 2px que se desliza entre los archivos de sección con `transform: translateX()/scaleX()` a 220ms `--ease-out`; se mide con `getBoundingClientRect` y se re-mide en resize, cambio de idioma y carga de fuentes. Con reduced motion el fade de opacidad se conserva y el desplazamiento no.
- **Press-feedback** (`.press`): todo elemento presionable escala a `0.97` en `:active` a 160ms — botón de descarga, toggles de idioma/tema, enlaces, cabeceras del timeline.
- **Sweep del CTA**: el botón de descarga rellena con un overlay direccional (`-translate-x-full` → `0`, `--ease-drawer`) al hover, con el texto invirtiendo color.
- **Morph del icono de tema**: luna y sol apilados, rotan 90° y se funden con `--ease-in-out`.
- **Grafo de git**: el panel de logros despliega con `grid-template-rows` **asimétrico** — 260ms al abrir (`--ease-out`, el contenido tarda en mostrarse), 200ms al cerrar (despeja la vista ya); el glifo `+`/`−` rota 180°. Los logros entran con fade + `translate` de 4px escalonados 30ms entre sí (sin delay al colapsar: salen con el contenedor, no en oleada); con `prefers-reduced-motion` el contenido aparece al instante y en print todos los bullets se fuerzan visibles aunque su entrada esté plegada.
- **Cursor del `profile.ts`**: `.caret` parpadea a 1.1s con `steps(1, end)` — el único loop del sitio, y el primero en apagarse.
- **Scroll suave**: `html { scroll-behavior: smooth }` solo dentro de `@media (prefers-reduced-motion: no-preference)`; los atajos del breadcrumb navegan sin mareo para quien lo pide.
- **Punto de disponibilidad** (status bar): pulso `animate-pulse` de Tailwind, `motion-safe` — sin reduced-motion no late.
- Todo respeta `prefers-reduced-motion`: se conservan fades de opacidad (ayudan a comprender) y se quitan los transforms (provocan mareo); el caret deja de parpadear.

## Superficies del navegador

Selección de texto (`accent` 24%), caret heredado, scrollbar (`rule`, thin), foco visible (`outline` accent 2px) — todo temado desde la paleta.

## Print / PDF

`window.print()` → "Descargar CV": header, breadcrumb, status bar y CTAs ocultos (`.no-print`), toggles `+/−` ocultos, **todos los logros expandidos** (`.exp-panel`), **todos los bloques revelados visibles** (`.reveal` forzado a `opacity: 1` — el PDF nunca depende del scroll), contacto visible en el hero (`.print:block`), paleta forzada a clara, `@page margin: 14mm`, `print-color-adjust: exact`, `--panel-shadow: none` (los paneles quedan solo con borde) y `body` sin el padding de la status bar. El bloque `profile.ts` **sí se imprime**: es contenido, no chrome.

## Accesibilidad

Contraste AA en ambos temas, verificado por `npm run check:contrast` (pares de texto ≥4.5:1, estados ≥3:1); `aria-pressed` (idioma), `aria-expanded` + `aria-controls` + `aria-label` (toggle de logros), `aria-label` (tema), `role="group"` (selector de idioma), `aria-label` en el `nav` del breadcrumb y `aria-current="location"` **solo en el enlace de la sección activa**, con el nombre de la sección como nombre accesible; la lista de chips de cada rol lleva `aria-label` y la status bar es `aria-hidden` (ambiente, no información). Landmarks `main`/`header`/`footer`/`nav`, skip-to-content como primera parada de teclado (ancla `#main-content`), JSON-LD `Person` en `page.tsx`.

Foco visible con `outline` accent de 2px en todos los interactivos; `html { scroll-padding-top: 4.5rem }` evita que el header sticky tape el destino de un ancla o el foco al desplazarse. En `(pointer: coarse)` los controles del header y los enlaces de texto suben a **44×44px** (`.tap-target`), sin cambiar el layout de escritorio. Los tokens entre corchetes son texto real —no `aria-hidden`— para que el dato pendiente también se anuncie. `prefers-reduced-motion` apaga el caret, los transforms, el pulso y el scroll suave, y conserva solo fades de opacidad.
