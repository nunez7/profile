import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

/* Es una sola página, así que el sitemap es una entrada. Aun así conviene
   declararlo: es la señal que hace que los buscadores rastreen la URL sin
   que tengas que pedir indexación a mano.

   Sin `lastModified` a propósito: usar `new Date()` aquí saca la ruta del
   prerender (con cacheComponents Next lo lee como valor no determinista) y
   la vuelve dinámica. Un lastmod inventado es peor que ninguno. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
