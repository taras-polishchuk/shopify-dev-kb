import type { Entry, Snippet } from './types';

export type Lang = 'en' | 'ua';

interface SnippetTranslation {
  label?: string;
  description?: string;
  code?: string;
}

interface EntryTranslation {
  title: string;
  description: string;
  notes?: string;
  snippets?: SnippetTranslation[];
}

export const ua: Record<string, EntryTranslation> = {
  // ─── LIQUID › BASICS ──────────────────────────────────────────────────────
  'liquid-for-loop': {
    title: 'Цикл For',
    description:
      'Ітерація по масивах: колекціях, продуктах, кастомних масивах. Підтримує `limit`, `offset`, `reversed`, а також допоміжні змінні циклу — `forloop.index` тощо.',
    notes: 'Використовуй `forloop.index0` для нумерації з нуля. `forloop.length` повертає загальну кількість елементів.',
    snippets: [
      { label: 'Базовий цикл' },
      { label: 'З limit та offset' },
      { label: 'Допоміжні змінні forloop' },
    ],
  },
  'liquid-if-unless': {
    title: 'If / Unless / Case',
    description:
      'Умовна логіка в Liquid: `if`, `elsif`, `else`, `unless` та `case/when`. Основа керування відображенням на сторінці.',
    snippets: [
      { label: 'If / elsif / else' },
      { label: 'Unless (заперечення)' },
      { label: 'Case / when' },
    ],
  },
  'liquid-assign-capture': {
    title: 'Assign та Capture',
    description:
      'Створення змінних: `assign` — для простих значень, `capture` — для збереження відрендереного HTML або багаторядкових рядків у змінну.',
    snippets: [
      { label: 'assign' },
      { label: 'Блок capture' },
    ],
  },

  // ─── LIQUID › FILTERS ─────────────────────────────────────────────────────
  'liquid-filters-string': {
    title: 'Рядкові фільтри',
    description:
      'Потужні фільтри для маніпуляцій з рядками у Shopify Liquid. Поєднуй їх через `|` для трансформації тексту.',
    snippets: [
      { label: 'Поширені рядкові фільтри' },
      { label: 'Фільтри для URL та handle' },
    ],
  },
  'liquid-filters-money': {
    title: 'Фільтри грошей та чисел',
    description:
      'Правильне форматування цін і чисел у темах Shopify. Завжди використовуй грошові фільтри — вони поважають налаштування валюти магазину.',
    snippets: [
      { label: 'Грошові фільтри' },
      { label: 'Числові фільтри' },
    ],
  },
  'liquid-filters-array': {
    title: 'Фільтри масивів',
    description:
      "Робота з масивами в Liquid — фільтрація, сортування, об'єднання та обхід колекцій об'єктів.",
    snippets: [
      { label: 'Маніпуляції з масивом' },
      { label: 'uniq та concat' },
    ],
  },

  // ─── LIQUID › OBJECTS ─────────────────────────────────────────────────────
  'liquid-product-object': {
    title: "Об'єкт Product",
    description:
      "Об'єкт `product` — найпоширеніший у Liquid. Містить усі дані: варіанти, зображення, метаполя тощо.",
    snippets: [
      { label: 'Основні властивості продукту', code: `{{ product.id }}
{{ product.title }}
{{ product.handle }}
{{ product.description }}
{{ product.url }}
{{ product.type }}
{{ product.vendor }}
{{ product.price }}           {# найнижча ціна варіанту в центах #}
{{ product.compare_at_price }}
{{ product.available }}       {# true, якщо хоч один варіант є в наявності #}
{{ product.tags | join: ", " }}
{{ product.images.size }}
{{ product.featured_image | image_url: width: 400 | image_tag }}
{{ product.selected_or_first_available_variant.id }}` },
      { label: 'Цикл по варіантах' },
    ],
  },
  'liquid-cart-object': {
    title: "Об'єкт Cart",
    description:
      "Доступ до даних кошика через об'єкт `cart`: товари, суми, кількість позицій та атрибути.",
    snippets: [
      { label: 'Властивості кошика' },
    ],
  },

  // ─── THEMES ───────────────────────────────────────────────────────────────
  'theme-structure': {
    title: 'Структура файлів теми',
    description:
      'Кожна тема Shopify дотримується суворої структури папок. Розуміння цього — ключ до правильної розробки та кастомізації.',
    notes: 'JSON-шаблони (`.json`) дозволяють редагувати структуру через редактор Online Store. Liquid-шаблони простіші, але менш гнучкі для мерчантів.',
    snippets: [
      { label: 'Структура папок', code: `my-theme/
├── assets/          # CSS, JS, зображення, шрифти
├── config/
│   ├── settings_schema.json   # Визначення налаштувань теми
│   └── settings_data.json     # Збережені значення налаштувань
├── layout/
│   └── theme.liquid           # Кореневий лейаут (обгортає всі сторінки)
├── locales/                   # Рядки перекладів
├── sections/                  # Багаторазові та призначувані секції
├── snippets/                  # Малі повторно використовувані Liquid-включення
├── templates/
│   ├── index.json             # Шаблон головної сторінки
│   ├── product.json           # Шаблон сторінки продукту
│   ├── collection.json        # Шаблон сторінки колекції
│   ├── cart.liquid            # Сторінка кошика (може бути .json)
│   └── customers/
│       └── account.liquid     # Сторінка акаунту покупця
└── package.json               # (опційно) залежності для тем на основі Dawn` },
    ],
  },
  'theme-sections': {
    title: 'Анатомія секцій',
    description:
      'Секції — будівельні блоки тем Shopify. Кожна поєднує Liquid-шаблон із JSON-блоком `{% schema %}`, що визначає налаштування.',
    snippets: [
      { label: 'Мінімальна секція' },
    ],
  },

  // ─── SCHEMA ───────────────────────────────────────────────────────────────
  'schema-settings-types': {
    title: 'Типи налаштувань Schema',
    description:
      'Shopify schema підтримує багато типів налаштувань для редактора теми. Обери правильний тип — і мерчант отримає зручний інтерфейс.',
    snippets: [
      { label: 'Усі поширені типи налаштувань' },
      { label: 'Блоки (blocks) у schema' },
    ],
  },

  // ─── SHOPIFY CLI ──────────────────────────────────────────────────────────
  'shopify-cli-commands': {
    title: 'Основні команди CLI',
    description:
      'Команди Shopify CLI 3.x для розробки тем: попередній перегляд, публікація, завантаження та керування темами з термінала.',
    snippets: [
      { label: 'Команди для розробки теми', code: `# Авторизація
shopify auth login --store my-store.myshopify.com

# Запустити dev-сервер (hot reload)
shopify theme dev --store my-store.myshopify.com

# Завантажити тему до магазину
shopify theme push --store my-store.myshopify.com

# Завантажити живу тему локально
shopify theme pull --store my-store.myshopify.com

# Список усіх тем
shopify theme list --store my-store.myshopify.com

# Запакувати тему у zip
shopify theme package

# Перевірити тему на помилки
shopify theme check

# Створити нову тему зі скелету
shopify theme init my-new-theme` },
      { label: 'Команди для додатків (app)', code: `# Створити новий застосунок Shopify
shopify app init

# Запустити локальний dev-сервер
shopify app dev

# Задеплоїти застосунок
shopify app deploy

# Згенерувати нове розширення
shopify app generate extension` },
    ],
  },

  // ─── METAFIELDS ───────────────────────────────────────────────────────────
  'metafields-basics': {
    title: 'Метаполя у Liquid',
    description:
      'Метаполя дозволяють прикріплювати кастомні дані до продуктів, колекцій, покупців тощо. У Liquid доступні через крапкову нотацію або фільтр `metafield`.',
    notes: "Завжди визначай метаполя через Shopify Admin спочатку — тоді вони з'являться в редакторі теми.",
    snippets: [
      { label: 'Доступ до метаполів', code: `{# Простір імен: custom, Ключ: care_instructions #}
{{ product.metafields.custom.care_instructions }}

{# З приведенням типу #}
{% assign size_guide = product.metafields.custom.size_guide %}
{{ size_guide.value }}

{# Метаполе-список (масив) #}
{% for feature in product.metafields.custom.features.value %}
  <li>{{ feature }}</li>
{% endfor %}

{# Метаполе з форматованим текстом #}
{{ product.metafields.custom.long_description | metafield_tag }}

{# Метаполе-файл (зображення) #}
{{ product.metafields.custom.extra_image | metafield_tag }}` },
      { label: 'Визначення метаполя (через API)' },
    ],
  },

  // ─── JAVASCRIPT ───────────────────────────────────────────────────────────
  'js-cart-api': {
    title: 'Cart AJAX API',
    description:
      'Shopify Cart AJAX API для додавання, оновлення та отримання даних кошика без перезавантаження сторінки. Ендпоінти `/cart/*.js` повертають JSON.',
    snippets: [
      { label: 'Додати в кошик', code: `async function addToCart(variantId, quantity = 1) {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: variantId, quantity }]
    })
  });

  if (!response.ok) throw new Error('Failed to add item');
  return response.json();
}

// Приклад використання
addToCart(12345678901234, 1)
  .then(data => console.log('Added:', data))
  .catch(err => console.error(err));` },
      { label: 'Отримати кошик', code: `// GET — отримати поточний стан кошика
const cart = await fetch('/cart.js').then(r => r.json());
console.log(cart.item_count, cart.total_price);` },
      { label: 'Оновити кількість товару', description: 'Використовуй /cart/change.js для встановлення точної кількості позиції в кошику.' },
      { label: 'Видалити товар (кількість → 0)', description: 'У Shopify немає окремого ендпоінту видалення. Встановлення кількості в 0 автоматично прибирає товар.' },
    ],
  },

  // ─── CSS ──────────────────────────────────────────────────────────────────
  'css-responsive-grid': {
    title: 'Адаптивна сітка продуктів',
    description:
      'CSS Grid для адаптивної сітки: від 1 колонки на мобільному до 4 на десктопі — без нагромадження медіа-запитів.',
    snippets: [
      { label: 'Авто-заповнювана сітка' },
      { label: 'Liquid + HTML розмітка' },
    ],
  },

  // ─── PERFORMANCE ──────────────────────────────────────────────────────────
  'performance-images': {
    title: 'Оптимізоване завантаження зображень',
    description:
      'Фільтр `image_url` разом із `image_tag` генерують адаптивні, ліниво-завантажені зображення з правильними атрибутами `srcset` та `sizes` — автоматично.',
    notes: 'Ніколи не використовуй застарілий `| img_url` — він не підтримує сучасний CDN Shopify.',
    snippets: [
      { label: 'Адаптивне зображення через image_tag' },
      { label: 'Ручний srcset' },
    ],
  },

  // ─── DEBUGGING ────────────────────────────────────────────────────────────
  'debugging-tips': {
    title: 'Дебагінг Liquid-шаблонів',
    description:
      "Корисні техніки для перевірки Liquid-змінних, об'єктів та помилок шаблонів у темах Shopify.",
    snippets: [
      { label: "Інспекція об'єктів через фільтр json", code: `{# Вивести повний об'єкт продукту як JSON #}
<pre>{{ product | json }}</pre>

{# Перевірити всі властивості варіантів #}
{% for variant in product.variants %}
  <pre>{{ variant | json }}</pre>
{% endfor %}

{# Перевірити кошик #}
<pre>{{ cart | json }}</pre>

{# Вивести всі доступні налаштування #}
<pre>{{ settings | json }}</pre>` },
      { label: 'Theme Check у CLI', code: `# Запустити Shopify Theme Check
shopify theme check

# Перевірити конкретний файл
shopify theme check sections/hero.liquid

# Вивести результат як JSON
shopify theme check --output json` },
      { label: 'Умовний вивід для дебагу' },
    ],
  },
};

// ─── UI strings ──────────────────────────────────────────────────────────────

export const uiStrings = {
  en: {
    searchPlaceholder: 'Search docs…',
    documentation: 'Documentation',
    recentlyViewed: 'Recently Viewed',
    codeExamples: 'Code Examples',
    saved: 'Saved',
    browseByTag: 'Browse by Tag',
    quickStart: 'Quick Start',
    results: (n: number) => `${n} result${n !== 1 ? 's' : ''}`,
    for: 'for',
    tagged: 'tagged',
    clearFilter: 'Clear filter',
    noResults: 'No results found',
    noResultsSub: 'Try adjusting your search',
    snippets: (n: number) => `${n} snippet${n !== 1 ? 's' : ''}`,
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    heroTitle: 'Shopify Dev Knowledge Base',
    heroSubtitle: 'Liquid · Themes · Cart API · Performance · and more',
    heroDescription: 'A fast, searchable reference for Shopify theme developers. Pick a topic from the sidebar, or search above to instantly find the snippet you need.',
    statEntries: 'Entries',
    statCategories: 'Categories',
    statSnippets: 'Snippets',
  },
  ua: {
    searchPlaceholder: 'Пошук документації…',
    documentation: 'Документація',
    recentlyViewed: 'Нещодавно переглянуті',
    codeExamples: 'Приклади коду',
    saved: 'Збережені',
    browseByTag: 'Фільтр за тегом',
    quickStart: 'Швидкий старт',
    results: (n: number) => `${n} ${n === 1 ? 'результат' : n < 5 ? 'результати' : 'результатів'}`,
    for: 'за запитом',
    tagged: 'з тегом',
    clearFilter: 'Скинути фільтр',
    noResults: 'Нічого не знайдено',
    noResultsSub: 'Спробуй змінити запит',
    snippets: (n: number) => `${n} ${n === 1 ? 'сніпет' : n < 5 ? 'сніпети' : 'сніпетів'}`,
    addToFavorites: 'Додати до збережених',
    removeFromFavorites: 'Видалити зі збережених',
    heroTitle: 'База знань Shopify-розробника',
    heroSubtitle: 'Liquid · Теми · Cart API · Продуктивність · і більше',
    heroDescription: 'Швидкий пошуковий довідник для розробників тем Shopify. Обери тему у бічній панелі або знайди потрібний сніпет через пошук.',
    statEntries: 'Матеріалів',
    statCategories: 'Категорій',
    statSnippets: 'Сніпетів',
  },
} as const;

export type UiStrings = typeof uiStrings.en;

// ─── Category / Subcategory names ─────────────────────────────────────────────

export const categoryNames = {
  en: {
    'Liquid': 'Liquid',
    'Themes': 'Themes',
    'Schema': 'Schema',
    'Shopify CLI': 'Shopify CLI',
    'Metafields': 'Metafields',
    'JavaScript': 'JavaScript',
    'CSS': 'CSS',
    'Performance': 'Performance',
    'Debugging': 'Debugging',
  },
  ua: {
    'Liquid': 'Liquid',
    'Themes': 'Теми',
    'Schema': 'Schema',
    'Shopify CLI': 'Shopify CLI',
    'Metafields': 'Метаполя',
    'JavaScript': 'JavaScript',
    'CSS': 'CSS',
    'Performance': 'Продуктивність',
    'Debugging': 'Дебагінг',
  },
} as const;

export const subcategoryNames = {
  en: {
    'Basics': 'Basics', 'Filters': 'Filters', 'Objects': 'Objects',
    'Structure': 'Structure', 'Sections': 'Sections', 'Templates': 'Templates',
    'Cart API': 'Cart API', 'AJAX': 'AJAX', 'Responsive': 'Responsive', 'General': 'General',
  },
  ua: {
    'Basics': 'Основи', 'Filters': 'Фільтри', 'Objects': "Об'єкти",
    'Structure': 'Структура', 'Sections': 'Секції', 'Templates': 'Шаблони',
    'Cart API': 'Cart API', 'AJAX': 'AJAX', 'Responsive': 'Адаптивність', 'General': 'Загальне',
  },
} as const;

// ─── Localize helper ──────────────────────────────────────────────────────────

export function localizeEntry(entry: Entry, lang: Lang): Entry {
  if (lang === 'en') return entry;
  const t = ua[entry.id];
  if (!t) return entry;

  return {
    ...entry,
    title: t.title ?? entry.title,
    description: t.description ?? entry.description,
    notes: t.notes ?? entry.notes,
    snippets: entry.snippets.map((s: Snippet, i: number) => {
      const st = t.snippets?.[i];
      if (!st) return s;
      return {
        ...s,
        label: st.label ?? s.label,
        description: st.description ?? s.description,
        code: st.code ?? s.code,
      };
    }),
  };
}

export function t(lang: Lang): UiStrings {
  return uiStrings[lang];
}

export function catName(category: string, lang: Lang): string {
  return (categoryNames[lang] as Record<string, string>)[category] ?? category;
}

export function subName(subcategory: string, lang: Lang): string {
  return (subcategoryNames[lang] as Record<string, string>)[subcategory] ?? subcategory;
}
