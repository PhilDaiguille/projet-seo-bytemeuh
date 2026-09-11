import type { ImageMetadata } from "astro";
import sarahImg from "../assets/images/profil/sarah.webp";
import thomasImg from "../assets/images/profil/thomas.webp";

const SITE_URL = "https://bytemeuh.phildaiguille.fr";

export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  /** Bio courte affichée sous le nom (byline, cartes). */
  short: string;
  /** Bio longue affichée sur la page auteur (signal EEAT). */
  bio: string;
  /** Meta description concise (70-200 caractères) pour le <head>. */
  metaDescription: string;
  image: ImageMetadata;
  /** URL absolue stable de la photo (pour le JSON-LD Person). */
  imageUrl: string;
  /** Profils canoniques externes pour schema.org Person. */
  sameAs: string[];
}

export const authors: Record<string, Author> = {
  "sarah-martin": {
    slug: "sarah-martin",
    name: "Sarah Martin",
    jobTitle: "Chef cuisinière & fondatrice de Bytemeuh",
    short: "Chef cuisinière & fondatrice",
    bio: "Sarah Martin a fondé Bytemeuh en 2024 à Paris. Chef cuisinière de formation, elle développe et teste chaque recette en cuisine avant publication, avec un faible pour les associations végétales riches en umami et les techniques accessibles à la maison. Elle veille à ce que chaque recette du site soit reproductible, précise et savoureuse.\n\nSa méthode est simple : une recette n'est publiée qu'après avoir été cuisinée au moins trois fois, en ajustant les quantités, les temps de cuisson et l'ordre des étapes jusqu'à obtenir un résultat constant. Les durées indiquées sont mesurées en conditions réelles, dans une cuisine domestique équipée d'un four et de plaques standards, et non dans une cuisine professionnelle.\n\nSarah s'intéresse particulièrement aux cuisines du monde revisitées avec des produits locaux et de saison : ramen, currys, bao buns ou risottos, qu'elle adapte pour les rendre accessibles sans matériel spécifique. Elle privilégie les légumes, les légumineuses et les céréales complètes, sans pour autant exclure la viande, qu'elle choisit d'origine française et de qualité.\n\nChaque fiche recette qu'elle signe détaille les ingrédients, les étapes, les valeurs nutritionnelles estimées et les réponses aux questions les plus fréquentes des lecteurs, afin que chacun puisse réussir le plat du premier coup.",
    metaDescription:
      "Sarah Martin, chef cuisinière et fondatrice de Bytemeuh, développe et teste chaque recette du site pour qu'elle soit précise, reproductible et savoureuse.",
    image: sarahImg,
    imageUrl: `${SITE_URL}/assets/images/profil/sarah.webp`,
    sameAs: [],
  },
  "thomas-dupont": {
    slug: "thomas-dupont",
    name: "Thomas Dupont",
    jobTitle: "Expert culinaire & rédacteur chez Bytemeuh",
    short: "Expert culinaire & rédacteur",
    bio: "Thomas Dupont est expert culinaire et rédacteur chez Bytemeuh. Il enquête sur les sujets de fond du blog — agriculture durable, technologie alimentaire, histoire et traditions culinaires — en s'appuyant sur des sources vérifiées et des rencontres avec producteurs et artisans. Son objectif : rendre accessible une information fiable sur ce que nous mangeons.\n\nAvant chaque article, Thomas croise plusieurs types de sources : études scientifiques et rapports d'organismes publics, données issues des filières agricoles, et témoignages de terrain recueillis auprès d'agriculteurs, d'éleveurs et de cuisiniers. Quand un sujet fait débat, il présente les différents points de vue plutôt que de trancher sans preuve.\n\nIl s'intéresse en particulier à la place de la technologie dans l'alimentation : agriculture de précision, élevage connecté, applications de nutrition ou équipements de cuisine intelligents. Il en décrit les bénéfices concrets, mais aussi les limites et les coûts, pour aider les lecteurs à se faire leur propre opinion.\n\nSes articles sont relus et mis à jour lorsque de nouvelles données sont publiées, afin que les informations du blog restent exactes dans le temps.",
    metaDescription:
      "Thomas Dupont, expert culinaire et rédacteur chez Bytemeuh, enquête sur l'agriculture durable, la technologie alimentaire et les traditions culinaires.",
    image: thomasImg,
    imageUrl: `${SITE_URL}/assets/images/profil/thomas.webp`,
    sameAs: [],
  },
};

export const SITE_URL_EXPORT = SITE_URL;

/** Auteur par défaut selon la collection quand aucun auteur nommé n'est défini. */
const DEFAULT_BY_COLLECTION: Record<"articles" | "recettes", string> = {
  articles: "thomas-dupont",
  recettes: "sarah-martin",
};

/**
 * Résout une chaîne `author` de frontmatter vers un profil Author réel.
 * - Si la chaîne correspond à un nom connu, renvoie ce profil.
 * - Sinon (ex. "Bytemeuh Farm"), renvoie l'auteur par défaut de la collection.
 */
export function resolveAuthor(
  authorName: string | undefined,
  collection: "articles" | "recettes",
): Author {
  if (authorName) {
    const match = Object.values(authors).find(
      (a) =>
        a.name.toLowerCase() === authorName.toLowerCase() ||
        a.slug === authorName.toLowerCase().replace(/\s+/g, "-"),
    );
    if (match) return match;
  }
  return authors[DEFAULT_BY_COLLECTION[collection]];
}

export function authorUrl(author: Author): string {
  return `${SITE_URL}/auteurs/${author.slug}/`;
}
