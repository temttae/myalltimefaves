import { z, defineCollection } from 'astro:content';

const filmCollection = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    slug: z.string(),

    title: z.string(),
    year: z.number(),
    directorlist: z.array(z.string()),
    runtime: z.number(),
    genrelist: z.array(z.string()),
    castlist: z.record(z.string(), z.string().nullish()),
    tagline: z.string(),
    summary: z.string(),
    rating: z.number(),
    ratingstars: z.string(),

    posterpath: z.string(),
    stillpaths: z.array(z.string()),
    
    caption: z.string(),
    analysis: z.string(),
    quote: z.string(),

    color: z.string(),
  }))
});

export const collections = {
  'film': filmCollection,
};
