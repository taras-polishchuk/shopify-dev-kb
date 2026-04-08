export type Category =
  | 'Liquid'
  | 'Themes'
  | 'Schema'
  | 'Shopify CLI'
  | 'Metafields'
  | 'JavaScript'
  | 'CSS'
  | 'Performance'
  | 'Debugging';

export type Subcategory =
  | 'Basics'
  | 'Filters'
  | 'Objects'
  | 'Structure'
  | 'Sections'
  | 'Templates'
  | 'Cart API'
  | 'AJAX'
  | 'Responsive'
  | 'General';

export type Tag =
  | 'basic'
  | 'advanced'
  | 'interview'
  | 'snippet'
  | 'performance'
  | 'liquid'
  | 'theme'
  | 'schema'
  | 'metafields'
  | 'javascript'
  | 'css'
  | 'debugging'
  | 'cli'
  | string;

export interface Snippet {
  label?: string;
  code: string;
  language: 'liquid' | 'json' | 'javascript' | 'typescript' | 'css' | 'bash' | 'html';
  description?: string;
}

export interface Entry {
  id: string;
  category: Category;
  subcategory: Subcategory;
  title: string;
  description: string;
  tags: Tag[];
  snippets: Snippet[];
  notes?: string;
}

export interface NavItem {
  category: Category;
  subcategories: Subcategory[];
  icon: string;
}

export interface AppState {
  selectedEntryId: string | null;
  searchQuery: string;
  activeTag: string | null;
  darkMode: boolean;
  sidebarOpen: boolean;
  favorites: Set<string>;
  recentlyViewed: string[];
}
