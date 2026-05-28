import { defineConfig, svgoOptimizer } from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import seoGraph from "@jdevalk/astro-seo-graph/integration";

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
    defaultStrategy: "viewport",
  },

  rustCompiler: true,

  integrations: [
    sitemap({
      entryLimit: 1000,
      // Exclure les URLs accentuées (elles redirigent 301 vers leur version sans accents)
      filter: (page) =>
        !/\/(fran%C3%A7aise|am%C3%A9ricaine|m%C3%A9diterran%C3%A9enne|fusion-asiatique-fran%C3%A7aise|fusion-hawa%C3%AFenne-japonaise)\//.test(
          page,
        ),
      // serialize s'applique à toutes les URLs avant le découpage en chunks
      serialize(item) {
        if (/\/blog\/recettes\//.test(item.url)) {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.9 };
        }
        if (/\/blog\/articles\//.test(item.url)) {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.85 };
        }
        // Routes classiques : accueil, à propos, contact, mentions légales
        return {
          ...item,
          changefreq: ChangeFreqEnum.MONTHLY,
          priority: item.url === SITE_URL + "/" ? 1.0 : 0.7,
        };
      },
      chunks: {
        // sitemap-recettes-0.xml
        recettes: (item) => {
          if (/\/blog\/recettes\//.test(item.url)) return item;
        },
        // sitemap-articles-0.xml
        articles: (item) => {
          if (/\/blog\/articles\//.test(item.url)) return item;
        },
        // Les URLs restantes vont automatiquement dans sitemap-pages-0.xml
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
    quality: 70,
  },
});
