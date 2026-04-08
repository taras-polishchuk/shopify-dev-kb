<script lang="ts">
  import { appState, toggleDarkMode, toggleSidebar, setSearchQuery, goHome, toggleLanguage } from '../lib/store.svelte';
  import { t } from '../lib/i18n';

  let searchInput = $state('');
  const ui = $derived(t(appState.language));

  // Sync local input → store; also clear selected entry so results are visible
  $effect(() => {
    setSearchQuery(searchInput);
    if (searchInput.length > 0) {
      appState.selectedEntryId = null;
    }
  });

  // Keep input in sync if goHome() clears the query externally
  $effect(() => {
    if (appState.searchQuery === '') {
      searchInput = '';
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      (document.getElementById('global-search') as HTMLInputElement)?.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-50 h-14 flex items-center gap-3 px-4
               border-b border-slate-200 dark:border-slate-800
               bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">

  <!-- Sidebar toggle -->
  <button
    onclick={toggleSidebar}
    class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800
           hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
    aria-label="Toggle sidebar"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </button>

  <!-- Logo / Brand -->
  <button
    onclick={goHome}
    class="flex items-center gap-2 shrink-0 rounded-lg px-1 py-1
           hover:opacity-80 transition-opacity"
    aria-label="Go to home"
  >
    <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600
                 flex items-center justify-center text-white text-sm font-bold shadow-sm">
      S
    </span>
    <span class="font-semibold text-slate-800 dark:text-slate-100 text-sm hidden sm:block">
      Shopify Dev KB
    </span>
  </button>

  <!-- Search bar -->
  <div class="flex-1 max-w-xl mx-auto relative">
    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input
        id="global-search"
        type="search"
        placeholder={ui.searchPlaceholder}
        bind:value={searchInput}
        class="w-full pl-9 pr-16 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700
               bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200
               placeholder:text-slate-400 dark:placeholder:text-slate-500
               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
               transition-all"
      />
      <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5
                  rounded border border-slate-200 dark:border-slate-700 px-1.5 py-0.5
                  text-[10px] font-mono text-slate-400 dark:text-slate-500 pointer-events-none">
        ⌘K
      </kbd>
    </div>
  </div>

  <!-- Language toggle -->
  <button
    onclick={toggleLanguage}
    class="flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold
           border transition-all duration-150
           {appState.language === 'ua'
             ? 'border-blue-400 text-blue-600 bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:bg-blue-950/40'
             : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'}"
    aria-label="Switch language"
    title="Switch language"
  >
    <span class="{appState.language === 'en' ? 'text-slate-800 dark:text-slate-100 font-bold' : 'opacity-40'}">EN</span>
    <span class="mx-0.5 opacity-30">/</span>
    <span class="{appState.language === 'ua' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'opacity-40'}">UA</span>
  </button>

  <!-- Dark mode toggle -->
  <button
    onclick={toggleDarkMode}
    class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800
           hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
    aria-label="Toggle dark mode"
    title={appState.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {#if appState.darkMode}
      <!-- Sun icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707
             M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
    {:else}
      <!-- Moon icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    {/if}
  </button>

  <!-- GitHub link -->
  <a
    href="https://github.com"
    target="_blank"
    rel="noopener noreferrer"
    class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800
           hover:text-slate-700 dark:hover:text-slate-300 transition-colors hidden sm:block"
    aria-label="GitHub"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577
               v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729
               1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604
               -2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176
               0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404
               2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221
               0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576
               C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  </a>
</header>
