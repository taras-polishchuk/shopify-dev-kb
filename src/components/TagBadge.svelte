<script lang="ts">
  import { appState, setActiveTag } from '../lib/store.svelte';

  let { tag }: { tag: string } = $props();

  const colorMap: Record<string, string> = {
    basic: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/60',
    advanced: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-950/60 dark:text-violet-400 dark:hover:bg-violet-900/60',
    interview: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:hover:bg-amber-900/60',
    snippet: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:hover:bg-emerald-900/60',
    performance: 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:hover:bg-rose-900/60',
    liquid: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-400 dark:hover:bg-cyan-900/60',
    javascript: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-950/60 dark:text-yellow-500 dark:hover:bg-yellow-900/60',
    css: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-950/60 dark:text-pink-400 dark:hover:bg-pink-900/60',
    debugging: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/60 dark:text-red-400 dark:hover:bg-red-900/60',
    cli: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
  };

  function colorClass(t: string): string {
    return colorMap[t] ?? 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700';
  }

  const isActive = $derived(appState.activeTag === tag);
</script>

<button
  onclick={() => setActiveTag(tag)}
  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
         transition-all duration-150 cursor-pointer select-none ring-offset-1
         {colorClass(tag)}
         {isActive ? 'ring-2 ring-current ring-offset-white dark:ring-offset-slate-950' : ''}"
  aria-pressed={isActive}
>
  {#if isActive}
    <span class="mr-1 opacity-70">×</span>
  {/if}
  {tag}
</button>
