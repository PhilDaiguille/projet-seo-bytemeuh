import { defineConfig, memoryCache, svgoOptimizer } from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import { satteri } from "@astrojs/markdown-satteri";

import compressor from "astro-compressor";
import fs from "node:fs";

const SITE_URL = "https://bytemeuh.phildaiguille.fr";

// lastmod du sitemap lu dans le frontmatter (updatedDate sinon publishDate)
const lastmod = {};
for (const col of ["recettes", "articles"]) {
  for (const file of fs.readdirSync(`./src/content/${col}`)) {
    if (!file.endsWith(".md")) continue;
    const fm = fs.readFileSync(`./src/content/${col}/${file}`, "utf8");
    const date =
      fm.match(/^updatedDate:\s*["']?([\d-]+)/m)?.[1] ??
      fm.match(/^publishDate:\s*["']?([\d-]+)/m)?.[1];
    if (date)
      lastmod[`${SITE_URL}/blog/${col}/${file.slice(0, -3)}/`] = new Date(
        date,
      ).toISOString();
  }
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  output: "static",
  experimental: {
    svgOptimizer: svgoOptimizer(),
    clientPrerender: true,
  },
  cache: {
    provider: memoryCache(),
  },
  compressHTML: true,
  build: {
    // CSS global en fichier externe mis en cache (/_astro/) : allège chaque page HTML (ratio texte / HTML)
    inlineStylesheets: "auto",
  },
  markdown: {
    processor: satteri({
      features: {
        directive: true,
        math: true,
        headingAttributes: true,
      },
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
        if (lastmod[item.url]) item.lastmod = lastmod[item.url];
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
    compressor({ brotli: true, zstd: false, gzip: false }),
  ],

  image: {
    quality: 50,
  },
});
