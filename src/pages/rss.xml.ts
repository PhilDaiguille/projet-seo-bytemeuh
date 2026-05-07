import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const recettes = await getCollection("recettes");
  const articles = await getCollection("articles");

  const allItems = [
    ...recettes.map((r) => ({
      title: r.data.title,
      pubDate: r.data.publishDate,
      description: r.data.description,
      link: `/blog/recettes/${r.id}/`,
    })),
    ...articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.publishDate,
      description: a.data.description,
      link: `/blog/articles/${a.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "Bytemeuh — Agriculture durable & cuisine saine",
    description:
      "Recettes saines, articles sur la biotechnologie agricole et l'alimentation responsable.",
    site: context.site!,
    items: allItems,
    customData: "<language>fr-fr</language>",
  });
}
