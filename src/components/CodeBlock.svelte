<script lang="ts">
  import { highlight, languageLabels } from '../lib/highlight';
  import type { Snippet } from '../data/types';

  let { snippet }: { snippet: Snippet } = $props();

  let copied = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout>;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(snippet.code);
      copied = true;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => { copied = false; }, 2000);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = snippet.code;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copied = true;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => { copied = false; }, 2000);
    }
  }

  const highlighted = $derived(highlight(snippet.code, snippet.language));
  const langLabel = $derived(languageLabels[snippet.language] ?? snippet.language);
</script>

<div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80
            shadow-sm transition-shadow hover:shadow-md group">

  <!-- Code block header -->
  <div class="flex items-center justify-between px-4 py-2.5
              bg-slate-900 dark:bg-slate-950 border-b border-slate-700/50">
    <div class="flex items-center gap-2">
      <!-- Traffic light dots -->
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
      </div>
      {#if snippet.label}
        <span class="text-xs text-slate-400 font-mono ml-1">{snippet.label}</span>
      {/if}
    </div>

    <div class="flex items-center gap-3">
      <!-- Language badge -->
      <span class="text-[10px] font-semibold uppercase tracking-widest text-slate-500
                   font-mono px-2 py-0.5 rounded-md bg-slate-800 dark:bg-slate-900 border border-slate-700/50">
        {langLabel}
      </span>

      <!-- Copy button -->
      <button
        onclick={copyCode}
        class="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg
               transition-all duration-150
               {copied
                 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                 : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-transparent'}"
        title="Copy to clipboard"
        aria-label="Copy code"
      >
        {#if copied}
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span>Copied!</span>
        {:else}
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8
                 a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          <span>Copy</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Code area -->
  <div class="relative overflow-x-auto bg-slate-900 dark:bg-[#0d1117]">
    {#if snippet.description}
      <p class="px-4 py-2 text-xs text-slate-400 border-b border-slate-700/50 italic">
        {snippet.description}
      </p>
    {/if}
    <pre
      class="p-4 text-sm leading-relaxed text-slate-100 font-mono overflow-x-auto
             [tab-size:2]"
    ><code>{@html highlighted}</code></pre>
  </div>
</div>

<style>
  /* Syntax highlighting colors */
  :global(.hl-comment)  { color: #6a737d; font-style: italic; }
  :global(.hl-keyword)  { color: #ff7b72; }
  :global(.hl-string)   { color: #a5d6ff; }
  :global(.hl-number)   { color: #f8c200; }
  :global(.hl-tag)      { color: #7ee787; }
  :global(.hl-output)   { color: #cba6f7; }
  :global(.hl-filter)   { color: #79c0ff; }
  :global(.hl-class)    { color: #ffa657; }
  :global(.hl-fn)       { color: #d2a8ff; }
  :global(.hl-key)      { color: #7ee787; }
  :global(.hl-selector) { color: #ff7b72; }
  :global(.hl-property) { color: #79c0ff; }
  :global(.hl-flag)     { color: #ffa657; }
</style>
