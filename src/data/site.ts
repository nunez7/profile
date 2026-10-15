/* URL absoluta del sitio. Vercel inyecta VERCEL_PROJECT_PRODUCTION_URL
   durante el build (producción y previews), así que el dominio no se
   hardcodea: al conectar un dominio propio Vercel actualiza la variable y
   metadataBase, sitemap, robots y el JSON-LD la siguen solos.

   Ojo: la variable viene sin protocolo ("perfil-cv.vercel.app"). */

export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const SITE_NAME = "Félix Núñez — CV";
