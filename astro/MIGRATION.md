# VuePress to Astro Migration Guide

This document outlines the process of migrating a VuePress site to Astro.

## Migration Steps

1. **Setting up the Astro project**
   - Created a new Astro project with `npm create astro@latest`
   - Configured Astro with Vue integration for compatibility with existing Vue components
   - Updated package.json with project details

2. **Project Structure**
   - Astro uses a `src/` directory structure unlike VuePress's root-based approach
   - Main pages go in `src/pages/`
   - Components go in `src/components/`
   - Layouts go in `src/layouts/`
   - Content can be organized in `src/content/` using content collections

3. **Content Migration**
   - Moved Markdown content from README.md to Astro pages
   - Created content collections for projects
   - Converted frontmatter properly
   - Added support for both Markdown and MDX

4. **Component Migration**
   - Converted Vue components to Astro components
   - Created ProjectItem.astro from ProjectItem.vue
   - Adjusted template syntax from Vue to Astro
   - Preserved styling

5. **Asset Migration**
   - Moved all assets to the `public/` directory
   - Updated image paths in content

6. **Navigation and Layout**
   - Created a consistent layout with header and footer
   - Implemented navigation
   - Added 404 page

7. **Utility Scripts**
   - Added a migration script to help with future content conversion
   - Setup deployment configuration for Netlify

## Key Differences Between VuePress and Astro

| Feature | VuePress | Astro |
|---------|----------|-------|
| Rendering | Vue-based SSG | Multi-framework SSG/SSR with partial hydration |
| Content | Markdown with Vue components | Markdown, MDX, Astro components |
| Routing | File-based + config | File-based in `src/pages/` |
| Styling | Global + Scoped CSS | Component-scoped + Global styles |
| Components | Vue components | Astro components + framework components |
| Plugins | VuePress plugins | Astro integrations |

## Advantages of Astro

- **Performance**: Astro's partial hydration (Islands Architecture) results in less JavaScript sent to the client
- **Flexibility**: Support for multiple frameworks (Vue, React, Svelte, etc.)
- **Content Collections**: Type-safe content management
- **Developer Experience**: Improved DX with better hot reloading
- **Markdown/MDX**: Enhanced support for content authoring

## Resources

- [Astro Documentation](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro + Vue Integration](https://docs.astro.build/en/guides/integrations-guide/vue/)
- [Deploying to Netlify](https://docs.astro.build/en/guides/deploy/netlify/)

## Setting Up Content Collections

Astro's content collections provide a type-safe way to work with Markdown and other content. Here's how to set them up properly:

1. **Define the collection schema** in `src/content/config.ts`:
   
   ```typescript
   import { defineCollection, z } from 'astro:content';

   const projectsCollection = defineCollection({
     type: 'content',
     schema: z.object({
       title: z.string(),
       tags: z.array(z.string()),
       urlLink: z.string().optional(),
       urlText: z.string().optional(),
       image: z.string().optional(),
       sortOrder: z.number().default(999),
     }),
   });

   export const collections = {
     'projects': projectsCollection,
   };
   ```

2. **Add content files** in `src/content/projects/`:

   Each Markdown file should have the proper frontmatter corresponding to the schema:

   ```markdown
   ---
   title: Project Title
   tags: ['Tag1', 'Tag2']
   image: /assets/image.png
   sortOrder: 1
   ---

   Project description content goes here.
   ```

3. **Query content in pages**:

   ```typescript
   ---
   import { getCollection } from 'astro:content';
   import Layout from '../layouts/Layout.astro';
   
   const allProjects = await getCollection('projects');
   const sortedProjects = allProjects.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
   ---
   ```

4. **Generate TypeScript types**:

   When you add or modify the schema, Astro will automatically generate TypeScript types for your content collections. When running the dev server, a "restart" might be needed to update these types.

## Troubleshooting

- If you encounter errors with content collections, ensure that the frontmatter in your content files matches the schema defined in `content/config.ts`.
- For TypeScript errors related to content collections, try running `npm run astro sync` to regenerate type definitions.
- If you're seeing "Module not found" errors for `astro:content`, ensure your Astro version supports content collections (version 2.0.0+). 