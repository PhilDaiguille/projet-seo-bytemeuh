# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bytemeuh: a static, French-language (`lang="fr"`) SEO-focused blog (recipes and articles) built with Astro 7 and deployed on Vercel at `https://bytemeuh.phildaiguille.fr`. All content and code comments are in French.

## Commands

```sh
npm run dev       # dev server, localhost:4321
npm run build     # static build to dist/ (also runs SEO validation, see below)
npm run preview   # serve dist/
npx astro check   # type-check .astro/.ts
npx prettier --write .   # format (prettier-plugin-astro)
```

There is no test suite. `npm run build` is the verification step: `@jdevalk/astro-seo-graph` validates every page at build time (one `h1`, no duplicate titles, valid schema, image alts, internal links, title 20–65 chars, description 70–200 chars). Vercel builds with `npm run build` (both `package-lock.json` and `bun.lock` exist; npm is canonical).

## Architecture

- **Content collections** (`src/content.config.ts`): `articles` and `recettes`, Markdown in `src/content/<collection>/<slug>.md`. The filename is the URL slug. Recettes carry structured frontmatter (ingredients, steps, ISO 8601 `prepTime`/`cookTime`, nutrition, `faq`) that drives both the page and its JSON-LD. Recipe structured data is emitted only as JSON-LD from `RecetteLayout` (no microdata, no inline `Recipe` in listing `ItemList`s, which would be reported as incomplete recipes). There is no review system, so never add `aggregateRating` (fabricated ratings violate Google's review snippet policy).
- **Layouts**: `BaseLayout.astro` owns `<head>` via the `<Seo>` component from `@jdevalk/astro-seo-graph` and accepts a `graph` prop (schema.org `@graph`). `RecetteLayout.astro` / `ArticleLayout.astro` build that graph (Recipe/Article, FAQPage, Person, breadcrumbs) from frontmatter — change structured data there, not per page.
- **Routes** (`src/pages/blog/...`): `recettes/[slug]`, `articles/[slug]`, plus taxonomy pages `recettes/{categorie,cuisine,tag}/[slug]` generated in `getStaticPaths` from frontmatter values. Taxonomy slugs go through `slugify` / `normalizeCuisine` in `src/utils/seo.ts` (strips accents; `normalizeCuisine` also drops a leading "cuisine ").
- **Authors** (`src/data/authors.ts`): frontmatter `author` is resolved by `resolveAuthor()`; unknown names (e.g. the default `"Bytemeuh Farm"`) fall back to a per-collection default real author (EEAT). Author pages live at `/auteurs/[slug]/`.
- **Images**: `featuredImage` is a relative path into `src/assets/images/` (optimized by Astro), while `ogImage` is an absolute URL to the copy in `public/assets/images/`. A new image must be added in both places as `.webp`.
- **Config** (`astro.config.mjs`): `trailingSlash: "always"` (internal links must end with `/`), static output, inlined CSS, prefetch on hover, brotli compression, sitemap split into `recettes` / `articles` / pages chunks with a filter excluding legacy accented cuisine URLs.
- **Vercel** (`vercel.json`): security headers including a strict CSP (only `'self'` plus `analytics.phildaiguille.fr`; no external fonts, images or scripts), long cache on `/_astro/` and `/assets/`, and all 301 redirects for old URLs. When renaming a slug, add a redirect here.

## Adding a recipe

`.opencode/skills/recipes/SKILL.md` defines the recipe template (modeled on `src/content/recettes/kebab-boeuf.md`). Key rules: accent-free kebab-case slug; 3 tags with the first being the recipe name; 4 practical FAQ entries; ISO 8601 durations (`PT1H30M`); body sections (history, "Pourquoi faire … maison ?", ingredient advice, `## Instructions` with `### Étape N : …`); internal links to existing `/blog/recettes/<slug>/` and `/blog/articles/<slug>/`.
