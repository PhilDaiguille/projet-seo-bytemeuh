import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const recipeStep = z.object({
  name: z.string(),
  text: z.string(),
  image: z.string().optional(), // URL absolue optionnelle
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image: img }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Bytemeuh Farm'),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featuredImage: img().optional(),
    featuredImageAlt: z.string().optional(),
    ogImage: z.string().optional(),
    faq: z.array(faqItem).optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const recettes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recettes' }),
  schema: ({ image: img }) => z.object({
    title: z.string(),
    description: z.string(),
    descriptionLong: z.string().optional(),
    publishDate: z.coerce.date(),
    author: z.string().default('Bytemeuh Farm'),
    category: z.string().optional(),
    cuisine: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featuredImage: img().optional(),
    featuredImageAlt: z.string().optional(),
    ogImage: z.string().optional(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalTime: z.string().optional(),
    servings: z.string().optional(),
    difficulty: z.string().optional(),
    ingredients: z.array(z.string()),
    nutrition: z
      .object({
        calories: z.string().optional(),
        protein: z.string().optional(),
        carbs: z.string().optional(),
        fat: z.string().optional(),
      })
      .optional(),
    aggregateRating: z
      .object({
        ratingValue: z.string(),
        reviewCount: z.string(),
      })
      .optional(),
    steps: z.array(recipeStep).optional(),
    tips: z.array(z.string()).optional(),
    variations: z.array(z.string()).optional(),
    faq: z.array(faqItem).optional(),
  }),
});

export const collections = { articles, recettes };
