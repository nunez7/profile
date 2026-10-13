---
target: src/app/page.tsx
total_score: 28.5
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
target_identity: "file:C:\\projects\\nextjs\\perfil-cv\\src\\app\\page.tsx"
target_fingerprint: "sha256:1c5b1257941328821fbf0c3f9ef00c1fbacecd6e7e35376701ff687cc3482802"
target_path: "C:\\projects\\nextjs\\perfil-cv\\src\\app\\page.tsx"
timestamp: 2026-10-13T05-25-03Z
slug: src-app-page-tsx
closed: true
---
# Critique — src/app/page.tsx

**Method: dual-agent (A: design review · B: detector + navegador)**

## Design Health Score

| # | Heurística | Score | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | 3.5 | 8 elementos `.reveal` a `opacity:0` hasta que el observer dispara — sin estado visible de "aún no", y el print los emite en blanco |
| 2 | Match sistema/mundo real | 3.5 | `8f2c1ad`, `HEAD → main`, `~/cv/inicio.md`, `+`/`−` sin explicar; "Síntesis" es un label abstracto |
| 3 | Control y libertad del usuario | 3.5 | Acordeón permite una sola entrada abierta, sin expand-all para el escaneo |
| 4 | Consistencia y estándares | 3.0 | Sistema de tokens coherente, pero el hero rompe el contrato a 375px y coexisten tres idiomas de lista |
| 5 | Prevención de errores | 3.0 | El CTA primario (`window.print()`) puede emitir un CV sin Stack ni Experience; nada en `@media print` lo previene |
| 6 | Reconocimiento vs. recall | 3.5 | Buen breadcrumb; móvil pierde los atajos y no hay skip-to-content |
| 7 | Flexibilidad y eficiencia | 3.0 | Aceleradores existen; sin atajos de teclado, sin PDF directo, sin skip link |
| 8 | Estética y diseño minimalista | 3.0 | Tokens disciplinados, pero ~37% del grid del Stack vacío, Formación medio vacío y 6+ hues en el primer viewport |
| 9 | Recuperación de errores | 2.5 | Cero superficies de error; el fallo real (PDF con secciones en blanco) es silencioso |
| 10 | Ayuda y documentación | n/a | Superficie Persuade de solo lectura; el contenido *es* la documentación |

**Total: 28.5 / 36 = 79% → Good.**

## Veredicto de especificidad de diseño

No es una plantilla de CV intercambiable por categoría: la identidad vive en el timeline como `git log` y la ventana `profile.ts`, ejecutados con disciplina (un radio, tokens semánticos, mono para datos, dark theme re-autorado). La fuga está en la capa genérica: elevación de una sola nota (los 7 `Panel` idénticos; el detector ve 8 reglas `border-top: 2px` sobre radio 6px como único diferenciador), grid del Stack con huecos ~317×218px, hero desbordando 64px a 375px (A midió scrollWidth 439; detector confirmó `body-text-viewport-edge` 59px + `text-overflow` de `dt.subhead` 22px), y DESIGN.md prometiendo 5 gastos de marca mientras el código gasta 12.

## Impresión general

El pico (hero + timeline git) está al nivel de portfolios premiados; el valle está en los bordes sin testear: móvil a 375px se siente roto desde el primer segundo, y la descarga puede entregar un CV incompleto en silencio. Mayor oportunidad: hacer que la elevación jerárquica y el presupuesto de marca reales coincidan con DESIGN.md, empezando por el CTA.

## Lo que funciona

1. El hero hace el trabajo del reclutador en una pantalla (76 → 19 → 13 es jerarquía real; CTA visible a 375×812).
2. El timeline git gana color por contenido; colapsado son 3 tarjetas compactas, expandido el drawer de 260ms se sostiene en ambos temas.
3. Craft floor alto: focus ring en teclado, press-feedback universal, reduced-motion que conserva fades y quita transforms, print en paleta clara, dark theme con estrategia propia (inset hairline).

## Prioridad Issues

**[P0] El PDF puede salir con Stack y Experience en blanco**
Por qué importa: es la conversión y el final del viaje; `globals.css` fuerza `.exp-panel` en print pero no tiene regla para `.reveal` — 8/8 ocultos bajo print sin scrollear, verificado también con `emulate_media('print')`.
Fix: en `@media print` añadir `.reveal { opacity: 1 !important; transform: none; transition: none }`; refuerzo con reveal en mount + guard `sessionStorage` en `src/components/ui/use-reveal.ts`.
Comando: harden

**[P0] El hero desborda el viewport 64px en móvil (439 vs 375)**
Por qué importa: primer gesto de Casey = scroll horizontal; corta meta, KPI #3 y toda la ventana `profile.ts`. Corroborado por detector (`body-text-viewport-edge`, `text-overflow`).
Fix: `min-w-0` en los dos hijos del grid del hero (`src/components/Hero.tsx`) + KPIs `grid-cols-1 sm:grid-cols-3` (o `px-3` + label 12px bajo sm). Testeado: scrollWidth → 375.
Comando: layout

**[P1] La acción de conversión es solo la 4ª–5ª cosa que ve el ojo**
Por qué importa: subrayado de gradiente, ventana `profile.ts`, 3 cifras KPI saturadas y el botón compiten; `Descargar CV` pesa óptically igual que Email/LinkedIn. DESIGN.md dice 5 gastos de marca; el código gasta 12 (logo dot `Header.tsx:78`, ruta breadcrumb `Breadcrumb.tsx:53`, `●`, underline de idioma `Header.tsx:99`, caret, `$`, `interface`, KPI #1…).
Fix: botón `text-lead px-6 py-3` (mantener sweep), links `text-muted` hasta hover (`TextLink.tsx`), quitar marca del KPI #1 (solo regla superior coloreada, cifra en `--foreground`), después alinear `DESIGN.md:63`.
Comando: bolder

**[P1] Grid del Stack ~37% de espacio muerto en desktop**
Por qué importa: `sm:grid-cols-2 lg:grid-cols-3` + `items-start` contra grupos 3/3/8/5/7 deja huecos de ~317×218 bajo Integración/Cloud y una tercera columna vacía.
Fix: reordenar por contenido en `src/components/Stack.tsx`: `backend` con `lg:row-span-2` en columna 3, o array de orden que empareje integration+frontend y cloud+practices.
Comando: layout

**[P2] Una elevación para todo: 7 `Panel` idénticos y dos contenedores medio vacíos**
Por qué importa: KPI 79px, panel stack 391px, timeline y Formación comparten borde+radio+sombra: la elevación no señala nada. Huecos dentro de contenedores dibujados (Formación 55% derecho vacío; Síntesis 400px vacíos) leen como errores. Detector: 8× `border-accent-on-rounded` por vista.
Fix: variante `flat` en `src/components/ui/Panel.tsx` (solo `border border-rule`) para KPIs y Formación; timeline conserva `shadow-panel`; `profile.ts` `shadow-elevated`. Formación a tres columnas `fecha | institución | título` o patrón `border-t` de certificaciones; aside para Síntesis.
Comando: quieter (+ layout)

## Persona red flags

- Jordan (HR generalista): léxico sin explicar ×5 antes del primer puesto; em-dash de Prácticas en `text-rule` ~1.35:1; descarga desde el hero → PDF incompleto (P0).
- Casey (móvil 375): scroll horizontal en hero (P0); entrada 1 abierta por defecto = 6 pantallas de bullets; status bar cortada.
- Riley (stress tester): 320px empeora el overflow; fix naïve de `min-w-0` parte labels (`experien/cia`); sin skip link (8 tabs a main); estado abierto vs cerrado casi idéntico salvo glifo 15px.

## Observaciones menores

- Ghosting del chrome sticky (`bg-background/90` + blur): usar `/95` o quitar blur.
- `DESIGN.md:63` ("Nada más") inexacto — listar gasto real o quitar extras.
- COMPANY_COLORS apenas diferencia (VASS=brand vs Universidad=cat-cloud, dos violetas).
- Orden de certificaciones arbitrario; `Idiomas` duplica nivel; scrollspy laga un beat tras `scrollIntoView`.
- Falsos positivos del detector descartados por diseño documentado: `blinking-cursor` (caret), `radial-halo` y `codex-grid-background` (textura del hero).

## Preguntas provocadoras

1. ¿Debe `window.print()` ser la conversión, o un PDF pre-renderizado idéntico para todos?
2. Si un reclutador nunca pasa del hero, ¿qué has probado? Síntesis es sección #2 y Experience #3.
3. ¿Cinco gastos de marca (DESIGN.md) o doce (código) es el sistema real?
