<script lang="ts">
  import { getFilteredEntries, appState, selectEntry, setActiveTag } from '../lib/store.svelte';
  import { allTags, entries } from '../data/entries';
  import { localizeEntry, t, catName, subName } from '../lib/i18n';
  import TagBadge from './TagBadge.svelte';

  const filteredEntries = $derived(getFilteredEntries());
  const isSearching = $derived(appState.searchQuery.length > 0 || appState.activeTag !== null);
  const favoriteEntries = $derived(entries.filter(e => appState.favorites.has(e.id)));
  const ui = $derived(t(appState.language));

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

  function highlight(text: string, query: string): string {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark class="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 rounded px-0.5">$1</mark>'
    );
  }
</script>

<div class="max-w-4xl mx-auto px-6 py-10">

  {#if isSearching}
    <!-- ── Search results ─────────────────────────────────────── -->
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">
        {ui.results(filteredEntries.length)}
        {#if appState.searchQuery}
          {ui.for} <span class="text-emerald-600 dark:text-emerald-400">"{appState.searchQuery}"</span>
        {/if}
        {#if appState.activeTag}
          {ui.tagged} <span class="text-emerald-600 dark:text-emerald-400">{appState.activeTag}</span>
        {/if}
      </h2>
      {#if appState.activeTag}
        <button
          onclick={() => setActiveTag(null)}
          class="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300
                 flex items-center gap-1 transition-colors"
        >
          <span>{ui.clearFilter}</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      {/if}
    </div>

    {#if filteredEntries.length === 0}
      <div class="text-center py-20">
        <p class="text-4xl mb-4">🔍</p>
        <p class="text-slate-500 dark:text-slate-400 text-sm">{ui.noResults}</p>
        <p class="text-slate-400 dark:text-slate-600 text-xs mt-1">{ui.noResultsSub}</p>
      </div>
    {:else}
      <div class="space-y-2">
        {#each filteredEntries as entry (entry.id)}
          {@const loc = localizeEntry(entry, appState.language)}
          <button
            onclick={() => selectEntry(entry.id)}
            class="w-full text-left p-4 rounded-xl border border-slate-100 dark:border-slate-800
                   hover:border-emerald-200 dark:hover:border-emerald-800/50
                   hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20
                   bg-white dark:bg-slate-900/50
                   transition-all duration-150 group shadow-sm hover:shadow-md"
          >
            <div class="flex items-start gap-3">
              <span class="text-xl shrink-0 mt-0.5 leading-none">
                {categoryIcons[entry.category] ?? '📄'}
              </span>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-[10px] font-semibold uppercase tracking-wider
                               text-slate-400 dark:text-slate-600">
                    {catName(entry.category, appState.language)} / {subName(entry.subcategory, appState.language)}
                  </span>
                    {#if appState.favorites.has(entry.id)}
                    <span class="text-amber-400 text-[10px]">★ {ui.saved}</span>
                  {/if}
                </div>
                <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1
                           group-hover:text-emerald-700 dark:group-hover:text-emerald-400
                           transition-colors">
                  {@html highlight(loc.title, appState.searchQuery)}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {@html highlight(loc.description, appState.searchQuery)}
                </p>
                <div class="flex flex-wrap gap-1 mt-2">
                  {#each entry.tags as tag (tag)}
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium
                                 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
              <svg class="w-4 h-4 text-slate-300 dark:text-slate-700 shrink-0 mt-1
                          group-hover:text-emerald-400 transition-colors"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        {/each}
      </div>
    {/if}

  {:else}
    <!-- ── Welcome / Home ─────────────────────────────────────── -->

    <!-- Hero -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600
                    flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/20">
          S
        </div>
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {ui.heroTitle}
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {ui.heroSubtitle}
          </p>
        </div>
      </div>

      <p class="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
        {ui.heroDescription}
      </p>

      <!-- Stats row -->
      <div class="flex flex-wrap gap-4 mt-6">
        {#each [
          { label: ui.statEntries, value: entries.length },
          { label: ui.statCategories, value: 9 },
          { label: ui.statSnippets, value: entries.reduce((n, e) => n + e.snippets.length, 0) },
        ] as stat}
          <div class="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</p>
            <p class="text-xs text-slate-400 dark:text-slate-500">{stat.label}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Saved favorites -->
    {#if favoriteEntries.length > 0}
      <section class="mb-10">
        <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          ★ {ui.saved}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {#each favoriteEntries as entry (entry.id)}
            {@const loc = localizeEntry(entry, appState.language)}
            <button
              onclick={() => selectEntry(entry.id)}
              class="text-left p-3 rounded-xl border border-amber-100 dark:border-amber-900/40
                     bg-amber-50/50 dark:bg-amber-950/20
                     hover:border-amber-200 dark:hover:border-amber-800/60
                     transition-all duration-150 group"
            >
              <div class="flex items-center gap-2">
                <span class="text-base">{categoryIcons[entry.category] ?? '📄'}</span>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-slate-700 dark:text-slate-200 truncate
                            group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {loc.title}
                  </p>
                  <p class="text-[11px] text-slate-400 dark:text-slate-600 truncate">{catName(entry.category, appState.language)}</p>
                </div>
              </div>
            </button>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Browse by tag -->
    <section class="mb-10">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
        {ui.browseByTag}
      </h2>
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag (tag)}
          <TagBadge {tag} />
        {/each}
      </div>
    </section>

    <!-- Quick links grid -->
    <section>
      <h2 class="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
        {ui.quickStart}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each entries.slice(0, 9) as entry (entry.id)}
          {@const loc = localizeEntry(entry, appState.language)}
          <button
            onclick={() => selectEntry(entry.id)}
            class="text-left p-4 rounded-xl border border-slate-100 dark:border-slate-800
                   bg-white dark:bg-slate-900/50 hover:border-emerald-200 dark:hover:border-emerald-800/50
                   hover:shadow-md transition-all duration-150 group"
          >
            <span class="text-2xl mb-2 block">{categoryIcons[entry.category] ?? '📄'}</span>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1
                      group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {loc.title}
            </p>
            <p class="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
              {loc.description}
            </p>
          </button>
        {/each}
      </div>
    </section>
  {/if}
</div>
