import { defineConfig, svgoOptimizer } from "astro/config";
import sitemap from "@astrojs/sitemap";
import seoGraph from "@jdevalk/astro-seo-graph/integration";

import vercel from "@astrojs/vercel";

const SITE_URL = "https://bytemeuh.phildaiguille.fr";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  output: "static",
  experimental: {
    svgOptimizer: svgoOptimizer(),
    clientPrerender: true,
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  rustCompiler: true,

  integrations: [
    sitemap({
      entryLimit: 1000,
      serialize(item) {
        return {
          ...item,
          changefreq: "weekly",
          priority: item.url === SITE_URL + "/" ? 1.0 : 0.8,
        };
      },
    }),
    seoGraph({
      llmsTxt: {
        title: "Bytemeuh",
        siteUrl: SITE_URL,
        summary:
          "Bytemeuh est une ferme française engagée dans une agriculture durable et une cuisine saine. Découvrez nos recettes, articles sur la biotechnologie agricole, l'élevage intelligent et l'alimentation responsable.",
      },
      validate: {
        h1: true,
        duplicateTitles: true,
        schema: true,
        imageAlt: true,
        metadataLength: {
          title: { min: 20, max: 65 },
          description: { min: 70, max: 200 },
        },
        internalLinks: true,
      },
    }),
  ],
  image: {
    quality: 82,
  },
});