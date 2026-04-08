# Shopify Dev Knowledge Base

> A personal reference app for Shopify theme development. Browse and search categorized Liquid, JavaScript, CSS, Schema, and CLI snippets — built with Svelte 5, TypeScript, Tailwind CSS v4, and Vite. Syntax-highlighted code blocks with one-click copy.

**Live demo:** https://taras-polishchuk.github.io/shopify-dev-kb/

---

## Features

- **Categorized knowledge base** — 9 categories: Liquid, Themes, Schema, Shopify CLI, Metafields, JavaScript, CSS, Performance, Debugging
- **Subcategory navigation** — Basics, Filters, Objects, Sections, Templates, Cart API, AJAX, Responsive, General
- **Tag filtering** — filter by `basic`, `advanced`, `interview`, `snippet`, `performance`, and more
- **Instant search** — real-time filtering across titles, descriptions, and code snippets
- **Syntax highlighting** — code blocks highlighted for Liquid, JavaScript, JSON, and CSS
- **One-click copy** — copy any code snippet to clipboard
- **Sidebar navigation** — jump directly to any category or subcategory
- **Responsive layout** — works on desktop and mobile

## Tech stack

| Layer | Detail |
|-------|--------|
| Framework | Svelte 5 (runes) |
| Language | TypeScript |
| Styles | Tailwind CSS v4 |
| Build | Vite |
| Highlighting | Highlight.js |
| i18n | Custom i18n util |

## Project structure

```
src/
├── App.svelte
├── main.ts
├── app.css
├── components/
│   ├── Header.svelte
│   ├── Sidebar.svelte
│   ├── HomePage.svelte
│   ├── ContentPage.svelte
│   ├── CodeBlock.svelte
│   └── TagBadge.svelte
├── data/
│   ├── entries.ts      # all knowledge base content
│   └── types.ts        # Category, Subcategory, Tag, Entry types
└── lib/
    ├── highlight.ts    # syntax highlighting setup
    ├── i18n.ts         # internationalisation helpers
    └── store.svelte.ts # global state (Svelte runes)
```

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run check     # TypeScript + Svelte type check
```

## Adding a new entry

Open `src/data/entries.ts` and append an object to the `entries` array:

```ts
{
  id: 'unique-kebab-id',
  category: 'Liquid',          // see types.ts for valid values
  subcategory: 'Filters',
  title: 'My New Snippet',
  description: 'What it does and when to use it.',
  tags: ['basic', 'liquid'],
  snippets: [
    {
      label: 'Example usage',
      language: 'liquid',
      code: `{{ product.price | money }}`,
    },
  ],
  notes: 'Optional extra notes displayed below code blocks.',
},
```

The entry will appear immediately in the sidebar and be searchable.

## Motivation

Built to have a fast, offline-capable personal reference while doing Shopify theme development — instead of constantly searching the Shopify docs.


## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + TypeScript + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
