---
name: recipes
description: Use when the user wants to create a new recipe content file for the Bytemeuh blog. Triggers on "/recipes", "crée une recette", "nouvelle recette", "ajoute une recette", "recipe content". Generates a complete Markdown file in src/content/recettes/ following the exact kebab-boeuf.md template structure with all required frontmatter fields.
---

# Skill: Créer une recette Bytemeuh

## Objectif

Générer un fichier Markdown complet dans `src/content/recettes/<slug>.md` en suivant exactement la structure de `kebab-boeuf.md`.

## Workflow

1. **Demander les infos** si non fournies : nom de la recette, viande/ingrédient principal, cuisine (ex: Française, Méditerranéenne, Asiatique…), difficulté (Facile / Moyenne / Difficile), temps de prep, temps de cuisson, nb de portions.
2. **Générer le slug** : minuscules, tirets, pas d'accents. Ex: `poulet-tikka-masala`.
3. **Créer le fichier** `src/content/recettes/<slug>.md` avec la structure complète ci-dessous.
4. **Rappeler** à l'utilisateur d'ajouter l'image dans `src/assets/images/<slug>.webp`.

## Template complet

```markdown
---
faq:
  - question: "..."
    answer: "..."
  - question: "..."
    answer: "..."
  - question: "..."
    answer: "..."
  - question: "..."
    answer: "..."
title: "Recette de [NOM COMPLET]"
description: "[150-160 car. — accroche SEO avec ingrédients clés et bénéfice principal]"
descriptionLong: "[200-250 car. — description plus développée pour les rich snippets]"
publishDate: YYYY-MM-DD
author: "Bytemeuh Farm"
category: "[Entrée | Plat principal | Dessert | Apéritif | Petit-déjeuner]"
cuisine: "[Française | Méditerranéenne | Asiatique | Italienne | …]"
tags: ["[tag principal]", "[tag secondaire]", "[tag tertiaire]"]
featuredImage: "../../assets/images/<slug>.webp"
featuredImageAlt: "[Description alt image — ce qu'on voit dans l'assiette]"
ogImage: "https://bytemeuh.phildaiguille.fr/assets/images/<slug>.webp"
prepTime: "PT__M"
cookTime: "PT__M"
totalTime: "PT__M"
servings: "__ personnes"
difficulty: "[Facile | Moyenne | Difficile]"
ingredients:
  - "[quantité + ingrédient]"
  - "[quantité + ingrédient]"
nutrition:
  calories: "__ kcal"
  protein: "__g"
  carbs: "__g"
  fat: "__g"
aggregateRating:
  ratingValue: "5"
  reviewCount: "10"
tips:
  - "[Astuce pratique 1]"
  - "[Astuce pratique 2]"
  - "[Astuce pratique 3]"
steps:
  - name: "[Nom étape 1]"
    text: "[Description complète de l'étape]"
  - name: "[Nom étape 2]"
    text: "[Description complète de l'étape]"
variations:
  - "[Variante ou substitution 1]"
  - "[Variante ou substitution 2]"
  - "[Variante ou substitution 3]"
---

[Introduction 2-3 phrases — accroche directe, mentionner la recette et un lien interne pertinent si disponible]

## [Titre historique ou culturel — ex: "L'histoire du plat" ou "Pourquoi ce plat ?"]

[Paragraphe d'histoire ou contexte culturel — 100-150 mots, ton engageant et personnel]

## Pourquoi faire [NOM] maison ?

[Paragraphe sur les avantages du fait-maison, qualité des ingrédients locaux/Bytemeuh, lien interne vers un article de blog si pertinent — 100-150 mots]

## Conseils pour choisir vos ingrédients

[Paragraphe sur le choix des ingrédients principaux, qualité, provenance, conseils du boucher/marché — 100-150 mots. Ajouter 2-3 liens internes vers recettes similaires si elles existent dans src/content/recettes/]

## Instructions

### Étape 1 : [Nom étape]

[Texte détaillé de l'étape]

### Étape 2 : [Nom étape]

[Texte détaillé de l'étape]

[… répéter pour chaque étape]
```

## Règles importantes

- **Format ISO 8601** pour les durées : `PT30M` = 30 min, `PT1H30M` = 1h30.
- **Tags** : 3 tags, le premier est le nom exact de la recette (ex: `"kebab de boeuf"`), les deux suivants sont des termes de recherche connexes.
- **Liens internes** : dans le corps du texte, lier vers d'autres recettes (`/blog/recettes/<slug>/`) et articles (`/blog/articles/<slug>/`) existants dans le projet.
- **Ton** : chaleureux, expertise Bytemeuh, valoriser le local et le fait-maison, pas trop formel.
- **SEO** : `title` entre 50-65 caractères, `description` entre 150-160 caractères.
- **Images** : toujours en `.webp`, chemin relatif dans `featuredImage`, URL absolue dans `ogImage`.
- **FAQ** : 4 questions pratiques que l'utilisateur pourrait vraiment se poser (conservation, substitutions, cuisson alternative, astuce pro).

## Exemple de slug valide

| Nom recette            | Slug                   |
| ---------------------- | ---------------------- |
| Poulet tikka masala    | `poulet-tikka-masala`  |
| Tarte tatin aux pommes | `tarte-tatin-pommes`   |
| Soupe miso japonaise   | `soupe-miso-japonaise` |
