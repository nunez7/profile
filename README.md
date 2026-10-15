# perfil-cv

CV online de **Félix Javier Núñez González** — Ingeniero IT & Lead Full Stack.

Sitio de una sola página, bilingüe (ES/EN), con tema claro/oscuro y sistema
visual propio. Se prerenderiza por completo: no hay base de datos, API routes
ni variables de entorno.

## Stack

| Pieza | Versión |
| --- | --- |
| Next.js (App Router, Turbopack) | 16.4 |
| React | 19.3 |
| Tailwind CSS | 4 |
| TypeScript | 5 |

Tipografía vía `next/font` (self-hosted, sin requests a Google en runtime):
**Bricolage Grotesque** para display y **IBM Plex Mono** para datos.

## Scripts

```bash
npm run dev             # servidor de desarrollo
npm run build           # build de producción
npm start               # sirve el build de producción
npm run lint            # ESLint
npm run check:contrast  # valida el contraste de los tokens de color
```

## Estructura

```
src/
  app/              rutas, layout y metadatos
  components/       UI del CV y primitivos (ui/)
  data/             site.ts (URL base), iconos y colores de tecnologías
  i18n/             diccionario ES/EN y contexto de idioma
  theme/            contexto de tema claro/oscuro
  assets/fonts/     TTFs para la imagen Open Graph
```

### Sistema visual

`src/app/globals.css` es la única fuente de verdad de color: tokens semánticos
(`--background`, `--brand`, `--cat-*`) definidos para tema claro y
sobreescritos en `.dark`. **Los componentes nunca usan hex ni escalas de
Tailwind directamente**, solo estos nombres, para que ambos temas se mantengan
coherentes. `DESIGN.md` documenta el porqué de las decisiones.

### Documentación no publicada

`CV.txt` es la fuente original del contenido y `.impeccable/` guarda las
críticas de diseño. Ninguno se sirve en producción.

## Imagen Open Graph

`src/app/opengraph-image.tsx` genera la tarjeta social 1200×630 en build time
con `ImageResponse` de `next/og`.

Satori (el motor detrás de `ImageResponse`) tiene dos límites que explican cómo
está escrito ese archivo:

- **Solo soporta `flex`**, no `grid`, y no resuelve variables CSS — los valores
  de `globals.css` van inlineados.
- **No soporta `.woff2`**, solo TTF/OTF.

Por eso los TTFs viven en `src/assets/fonts/`. Para regenerarlos (por ejemplo al
cambiar de versión de fuente), se descargan de
[google-webfonts-helper](https://gwfh.mranftl.com/fonts) como TTF estáticos — no
del endpoint `fonts.gstatic.com/l/font`, que devuelve una firma `sfnt` no
estándar que Satori rechaza:

```bash
curl -L -o bricolage.zip "https://gwfh.mranftl.com/api/fonts/bricolage-grotesque?download=zip&subsets=latin&formats=ttf&variants=regular,700"
curl -L -o plex.zip "https://gwfh.mranftl.com/api/fonts/ibm-plex-mono?download=zip&subsets=latin&formats=ttf&variants=regular,500"
```

Verifica que cada `.ttf` empiece con los bytes `00 01 00 00`.

## Deploy en Vercel

Sin configuración: framework, comando de build (`next build`) y directorio de
salida se detectan solos. No hay variables de entorno que definir.

1. Importa el repositorio en Vercel (**Add New → Project**).
2. Node.js Version: **22.x** (el mínimo es 20.9, declarado en `engines`).
3. Deploy. Promociona a producción cuando el preview esté validado.

`src/data/site.ts` obtiene la URL absoluta de `VERCEL_PROJECT_PRODUCTION_URL`,
que Vercel inyecta en build. Al conectar un dominio propio, `metadataBase`, el
canonical, `sitemap.xml` y `robots.txt` se actualizan solos: no hay dominio
hardcodeado.

Tras el primer deploy, pasa la URL por el
[Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) para
forzar el refresco del preview cacheado.

## Rutas generadas

| Ruta | Salida |
| --- | --- |
| `/` | estática |
| `/opengraph-image` | estática (PNG 1200×630) |
| `/robots.txt` | estática |
| `/sitemap.xml` | estática |

`/sitemap.xml` se mantiene estático a propósito: usar `new Date()` en
`lastModified` lo vuelve dinámico bajo `cacheComponents`.
