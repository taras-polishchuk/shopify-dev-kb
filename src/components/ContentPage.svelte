<script lang="ts">
  import type { Entry } from '../data/types';
  import { appState, toggleFavorite } from '../lib/store.svelte';
  import { localizeEntry, t, catName, subName } from '../lib/i18n';
  import CodeBlock from './CodeBlock.svelte';
  import TagBadge from './TagBadge.svelte';

  let { entry }: { entry: Entry } = $props();

  const isFavorite = $derived(appState.favorites.has(entry.id));
  const loc = $derived(localizeEntry(entry, appState.language));
  const ui  = $derived(t(appState.language));

  // Category icons map
  const categoryIcons: Record<string, string> = {
    'Liquid': '💧',
    'Themes': '🎨',
    'Schema': '🗂️',
    'Shopify CLI': '⚡',
    'Metafields': '🔮',
    'JavaScript': '🟨',
    'CSS': '🎀',
    'Performance': '🚀',
    'Debugging': '🐛',
  };
</script>

<article class="max-w-4xl mx-auto px-6 py-8 animate-fadeIn">
  
  <!-- Breadcrumb -->
  <nav class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-6">
    <span class="text-base -mt-0.5">{categoryIcons[entry.category] ?? '📄'}</span>
    <span>{catName(entry.category, appState.language)}</span>
    <span>/</span>
    <span class="text-slate-500 dark:text-slate-400">{subName(entry.subcategory, appState.language)}</span>
  </nav>

  <!-- Title row -->
  <div class="flex items-start justify-between gap-4 mb-4">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
      {loc.title}
    </h1>

    <button
      onclick={() => toggleFavorite(entry.id)}
      class="shrink-0 p-2 rounded-lg transition-all duration-150
             {isFavorite
               ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40'
               : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'}"
      aria-label={isFavorite ? ui.removeFromFavorites : ui.addToFavorites}
      title={isFavorite ? ui.removeFromFavorites : ui.addToFavorites}
    >
      <svg class="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915
             c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674
             c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888
             c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888
             c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    </button>
  </div>

  <!-- Tags -->
  <div class="flex flex-wrap gap-1.5 mb-5">
    {#each loc.tags as tag (tag)}
      <TagBadge {tag} />
    {/each}
  </div>

  <!-- Description -->
  <div class="prose prose-slate dark:prose-invert max-w-none mb-8">
    <p class="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      {loc.description}
    </p>
  </div>

  <!-- Notes callout -->
  {#if loc.notes}
    <div class="flex gap-3 p-4 mb-8 rounded-xl bg-amber-50 dark:bg-amber-950/30
                border border-amber-200 dark:border-amber-800/50">
      <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
        {loc.notes}
      </p>
    </div>
  {/if}

  <!-- Code snippets -->
  {#if loc.snippets.length > 0}
    <section>
      <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        {ui.codeExamples}
      </h2>
      <div class="space-y-4">
        {#each loc.snippets as snippet, i (i)}
          <CodeBlock {snippet} />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Footer metadata -->
  <div class="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800
              flex items-center justify-between text-xs text-slate-400 dark:text-slate-600">
    <span>ID: <code class="font-mono">{entry.id}</code></span>
    <span class="flex items-center gap-1">
      {ui.snippets(loc.snippets.length)}
    </span>
  </div>
</article>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 200ms ease-out forwards;
  }
</style>
