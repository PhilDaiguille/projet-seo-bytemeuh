import {defineConfig, memoryCache, svgoOptimizer} from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import { satteri } from "@astrojs/markdown-satteri";

import compressor from "astro-compressor";

import playformCompress from "@playform/compress";

const SITE_URL = "https://bytemeuh.phildaiguille.fr";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  output: "static",
  experimental: {
    svgOptimizer: svgoOptimizer(),
    clientPrerender: true,
  },
  compressHTML: true,
  markdown: {
    processor: satteri({
      features: { directive: true },
    }),
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  integrations: [
    sitemap({
      entryLimit: 1000,
      filter: (page) =>
        !/\/(fran%C3%A7aise|am%C3%A9ricaine|m%C3%A9diterran%C3%A9enne|fusion-asiatique-fran%C3%A7aise|fusion-hawa%C3%AFenne-japonaise)\//.test(
          page,
        ),
      serialize(item) {
        if (/\/blog\/recettes\//.test(item.url)) {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.9 };
        }
        if (/\/blog\/articles\//.test(item.url)) {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.85 };
        }
        return {
          ...item,
          changefreq: ChangeFreqEnum.MONTHLY,
          priority: item.url === SITE_URL + "/" ? 1.0 : 0.7,
        };
      },
      chunks: {
        recettes: (item) => {
          if (/\/blog\/recettes\//.test(item.url)) return item;
        },
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
    compressor({ gzip: true, brotli: true, zstd: true }),
    playformCompress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      JSON: true,
      SVG: true,
    }),
  ],

  image: {
    quality: 60,
  },
});
