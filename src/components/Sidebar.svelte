<script lang="ts">
  import { entries } from '../data/entries';
  import { navStructure } from '../data/entries';
  import { appState, selectEntry } from '../lib/store.svelte';
  import { localizeEntry, t, catName, subName } from '../lib/i18n';

  // Track expanded categories
  let expanded = $state<Record<string, boolean>>(
    Object.fromEntries(navStructure.map(n => [n.category, true]))
  );

  function toggle(category: string) {
    expanded[category] = !expanded[category];
  }

  function getEntriesForSubcategory(category: string, subcategory: string) {
    return entries.filter(
      e => e.category === category && e.subcategory === subcategory
    );
  }

  function countEntries(category: string) {
    return entries.filter(e => e.category === category).length;
  }
</script>

<nav
  class="h-full overflow-y-auto py-4 px-3 space-y-1
         transition-all duration-300"
  aria-label="Sidebar navigation"
>
  <div class="px-2 pb-3 mb-1 border-b border-slate-100 dark:border-slate-800">
    <p class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
      {t(appState.language).documentation}
    </p>
  </div>

  {#each navStructure as nav (nav.category)}
    <div class="space-y-0.5">
      <!-- Category header -->
      <button
        onclick={() => toggle(nav.category)}
        class="w-full flex items-center gap-2 rounded-lg px-2 py-2
               text-sm font-medium text-slate-700 dark:text-slate-300
               hover:bg-slate-100 dark:hover:bg-slate-800
               transition-colors group"
        aria-expanded={expanded[nav.category]}
      >
        <span class="text-base leading-none">{nav.icon}</span>
        <span class="flex-1 text-left">{catName(nav.category, appState.language)}</span>
        <span class="text-[10px] font-normal text-slate-400 dark:text-slate-600 mr-1">
          {countEntries(nav.category)}
        </span>
        <svg
          class="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 transition-transform duration-200
                 {expanded[nav.category] ? 'rotate-90' : ''}"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Subcategories + entries -->
      {#if expanded[nav.category]}
        <div class="ml-3 pl-3 border-l border-slate-100 dark:border-slate-800 space-y-0.5 mt-0.5">
          {#each nav.subcategories as sub}
            {@const subEntries = getEntriesForSubcategory(nav.category, sub)}
            {#if subEntries.length > 0}
              <div class="pt-1">
                <p class="text-[10px] font-semibold uppercase tracking-widest text-slate-400
                           dark:text-slate-600 px-2 pb-1">
                  {subName(sub, appState.language)}
                </p>
                {#each subEntries as entry (entry.id)}
                  {@const locEntry = localizeEntry(entry, appState.language)}
                  <button
                    onclick={() => selectEntry(entry.id)}
                    class="w-full text-left rounded-lg px-2 py-1.5 text-sm
                           transition-all duration-100 group flex items-center gap-1.5
                           {appState.selectedEntryId === entry.id
                             ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-medium'
                             : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}"
                  >
                    {#if appState.favorites.has(entry.id)}
                      <span class="text-[10px] text-amber-500">★</span>
                    {/if}
                    <span class="flex-1 truncate">{locEntry.title}</span>
                    {#if appState.selectedEntryId === entry.id}
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  {/each}

  <!-- Recently viewed -->
  {#if appState.recentlyViewed.length > 0}
    <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-2 pb-2">
        {t(appState.language).recentlyViewed}
      </p>
      {#each appState.recentlyViewed.slice(0, 5) as id (id)}
        {@const entry = entries.find(e => e.id === id)}
        {#if entry}
          {@const locEntry = localizeEntry(entry, appState.language)}
          <button
            onclick={() => selectEntry(id)}
            class="w-full text-left rounded-lg px-2 py-1.5 text-xs
                   text-slate-500 dark:text-slate-500
                   hover:bg-slate-100 dark:hover:bg-slate-800
                   hover:text-slate-700 dark:hover:text-slate-300
                   transition-colors truncate flex items-center gap-1.5"
          >
            <svg class="w-3 h-3 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="truncate">{locEntry.title}</span>
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</nav>
