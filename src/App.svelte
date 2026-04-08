<script lang="ts">
  import { onMount } from 'svelte';
  import { appState, initState, getSelectedEntry } from './lib/store.svelte';
  import Header from './components/Header.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import ContentPage from './components/ContentPage.svelte';
  import HomePage from './components/HomePage.svelte';

  onMount(() => {
    initState();
  });

  const selectedEntry = $derived(getSelectedEntry());
</script>

<div class="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
  <Header />

  <div class="flex" style="min-height: calc(100vh - 3.5rem)">

    <!-- Sidebar -->
    <aside
      class="shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-slate-100 dark:border-slate-800
             overflow-hidden transition-all duration-300 ease-in-out
             {appState.sidebarOpen ? 'w-64' : 'w-0'}"
      aria-hidden={!appState.sidebarOpen}
    >
      <div class="w-64">
        <Sidebar />
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto min-w-0">
      {#if selectedEntry}
        {#key selectedEntry.id}
          <ContentPage entry={selectedEntry} />
        {/key}
      {:else}
        <HomePage />
      {/if}
    </main>
  </div>
</div>
