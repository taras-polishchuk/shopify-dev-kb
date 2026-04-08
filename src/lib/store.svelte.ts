import { entries } from '../data/entries';
import type { Entry } from '../data/types';
import type { Lang } from './i18n';

// ─── Persistent helpers ──────────────────────────────────────────────────────

function loadDarkMode(): boolean {
  const saved = localStorage.getItem('kb-dark-mode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem('kb-favorites');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem('kb-recent');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadLanguage(): Lang {
  const saved = localStorage.getItem('kb-language');
  if (saved === 'ua' || saved === 'en') return saved;
  return 'en';
}

// ─── Reactive state (Svelte 5 runes) ─────────────────────────────────────────

export const appState = $state({
  selectedEntryId: null as string | null,
  searchQuery: '',
  activeTag: null as string | null,
  darkMode: false,
  sidebarOpen: true,
  favorites: new Set<string>(),
  recentlyViewed: [] as string[],
  language: 'en' as Lang,
});

export function initState() {
  appState.darkMode = loadDarkMode();
  appState.favorites = loadFavorites();
  appState.recentlyViewed = loadRecent();
  appState.language = loadLanguage();
  applyDarkMode(appState.darkMode);
}

// ─── Computed (derived) ───────────────────────────────────────────────────────

const _filteredEntries = $derived.by(() => {
  const q = appState.searchQuery.toLowerCase().trim();
  const tag = appState.activeTag;

  return entries.filter(entry => {
    const matchesTag = !tag || entry.tags.includes(tag);
    if (!matchesTag) return false;
    if (!q) return true;

    return (
      entry.title.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q) ||
      entry.tags.some(t => t.toLowerCase().includes(q)) ||
      entry.category.toLowerCase().includes(q) ||
      entry.subcategory.toLowerCase().includes(q) ||
      entry.snippets.some(s => s.code.toLowerCase().includes(q))
    );
  });
});

export function getFilteredEntries() { return _filteredEntries; }

const _selectedEntry = $derived.by((): Entry | null => {
  if (!appState.selectedEntryId) return null;
  return entries.find(e => e.id === appState.selectedEntryId) ?? null;
});

export function getSelectedEntry() { return _selectedEntry; }

// ─── Actions ─────────────────────────────────────────────────────────────────

export function goHome() {
  appState.selectedEntryId = null;
  appState.searchQuery = '';
  appState.activeTag = null;
}

export function selectEntry(id: string) {
  appState.selectedEntryId = id;

  // Track recently viewed (max 10)
  appState.recentlyViewed = [
    id,
    ...appState.recentlyViewed.filter(r => r !== id),
  ].slice(0, 10);

  localStorage.setItem('kb-recent', JSON.stringify(appState.recentlyViewed));
}

export function toggleFavorite(id: string) {
  const next = new Set(appState.favorites);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  appState.favorites = next;
  localStorage.setItem('kb-favorites', JSON.stringify([...next]));
}

export function toggleDarkMode() {
  appState.darkMode = !appState.darkMode;
  localStorage.setItem('kb-dark-mode', String(appState.darkMode));
  applyDarkMode(appState.darkMode);
}

export function setSearchQuery(q: string) {
  appState.searchQuery = q;
}

export function setActiveTag(tag: string | null) {
  appState.activeTag = tag === appState.activeTag ? null : tag;
}

export function toggleSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
}

export function toggleLanguage() {
  appState.language = appState.language === 'en' ? 'ua' : 'en';
  localStorage.setItem('kb-language', appState.language);
}

function applyDarkMode(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
