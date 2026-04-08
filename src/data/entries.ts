import type { Entry } from './types';

export const entries: Entry[] = [
  // ─── LIQUID › BASICS ────────────────────────────────────────────────────────
  {
    id: 'liquid-for-loop',
    category: 'Liquid',
    subcategory: 'Basics',
    title: 'For Loop',
    description:
      'Iterate over arrays like collections, products, or custom arrays. Liquid for-loops support `limit`, `offset`, `reversed`, and expose loop helpers like `forloop.index`.',
    tags: ['basic', 'liquid', 'interview'],
    snippets: [
      {
        label: 'Basic for loop',
        language: 'liquid',
        code: `{% for product in collection.products %}
  <div class="product-card">
    <h2>{{ product.title }}</h2>
    <p>{{ product.price | money }}</p>
  </div>
{% endfor %}`,
      },
      {
        label: 'With limit & offset',
        language: 'liquid',
        code: `{% for product in collection.products limit: 4 offset: 2 %}
  {{ product.title }}
{% endfor %}`,
      },
      {
        label: 'forloop helpers',
        language: 'liquid',
        code: `{% for item in cart.items %}
  {% if forloop.first %}<ul>{% endif %}
    <li>{{ forloop.index }}. {{ item.title }}</li>
  {% if forloop.last %}</ul>{% endif %}
{% endfor %}`,
      },
    ],
    notes: 'Use `forloop.index0` for zero-based index. `forloop.length` gives total count.',
  },
  {
    id: 'liquid-if-unless',
    category: 'Liquid',
    subcategory: 'Basics',
    title: 'If / Unless / Case',
    description:
      'Conditional logic in Liquid using `if`, `elsif`, `else`, `unless`, and `case/when`. Essential for controlling what renders on the page.',
    tags: ['basic', 'liquid', 'interview'],
    snippets: [
      {
        label: 'If / elsif / else',
        language: 'liquid',
        code: `{% if product.available %}
  <button>Add to Cart</button>
{% elsif product.variants.size > 0 %}
  <button>Choose Options</button>
{% else %}
  <span class="sold-out">Sold Out</span>
{% endif %}`,
      },
      {
        label: 'Unless (negation)',
        language: 'liquid',
        code: `{% unless customer.logged_in %}
  <a href="/account/login">Sign In</a>
{% endunless %}`,
      },
      {
        label: 'Case / when',
        language: 'liquid',
        code: `{% case product.type %}
  {% when 'Shirt' %}
    <span>Apparel</span>
  {% when 'Book' %}
    <span>Reading</span>
  {% else %}
    <span>Other</span>
{% endcase %}`,
      },
    ],
  },
  {
    id: 'liquid-assign-capture',
    category: 'Liquid',
    subcategory: 'Basics',
    title: 'Assign & Capture',
    description:
      'Create variables with `assign` for simple values and `capture` to store rendered HTML or multi-line strings into a variable.',
    tags: ['basic', 'liquid'],
    snippets: [
      {
        label: 'assign',
        language: 'liquid',
        code: `{% assign sale_price = product.price | times: 0.8 | money %}
<p>Sale: {{ sale_price }}</p>`,
      },
      {
        label: 'capture block',
        language: 'liquid',
        code: `{% capture product_card %}
  <div class="card">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
  </div>
{% endcapture %}

{{ product_card }}`,
      },
    ],
  },

  // ─── LIQUID › FILTERS ───────────────────────────────────────────────────────
  {
    id: 'liquid-filters-string',
    category: 'Liquid',
    subcategory: 'Filters',
    title: 'String Filters',
    description:
      'Shopify Liquid provides powerful string manipulation filters. Chain them with `|` to transform text output.',
    tags: ['basic', 'liquid', 'snippet'],
    snippets: [
      {
        label: 'Common string filters',
        language: 'liquid',
        code: `{{ "hello world" | upcase }}           → HELLO WORLD
{{ "HELLO" | downcase }}               → hello
{{ "  trim me  " | strip }}            → trim me
{{ "hello world" | capitalize }}       → Hello world
{{ "hello" | prepend: "Say: " }}       → Say: hello
{{ "hello world" | replace: "world", "Shopify" }} → hello Shopify
{{ "hello" | slice: 0, 3 }}            → hel
{{ product.title | truncate: 20 }}     → My Awesome Produ...
{{ "liquid is cool" | split: " " | first }} → liquid`,
      },
      {
        label: 'URL and handle filters',
        language: 'liquid',
        code: `{{ product.title | handleize }}   → my-product-title
{{ "/products/" | append: product.handle }} → /products/my-product
{{ product.url | within: collection }}`,
      },
    ],
  },
  {
    id: 'liquid-filters-money',
    category: 'Liquid',
    subcategory: 'Filters',
    title: 'Money & Number Filters',
    description:
      'Format prices and numbers correctly in Shopify themes. Always use money filters for pricing to respect currency settings.',
    tags: ['basic', 'liquid', 'interview'],
    snippets: [
      {
        label: 'Money filters',
        language: 'liquid',
        code: `{{ product.price | money }}                 → $12.99
{{ product.price | money_with_currency }}   → $12.99 USD
{{ product.price | money_without_trailing_zeros }} → $13
{{ product.price | money_without_currency }} → 12.99`,
      },
      {
        label: 'Number filters',
        language: 'liquid',
        code: `{{ 1234567 | number_with_delimiter }}   → 1,234,567
{{ 3.14159 | round: 2 }}               → 3.14
{{ 3.14159 | ceil }}                   → 4
{{ 3.14159 | floor }}                  → 3
{{ 5 | divided_by: 2.0 }}             → 2.5
{{ 100 | minus: 15 | times: 1.2 }}    → 102.0`,
      },
    ],
  },
  {
    id: 'liquid-filters-array',
    category: 'Liquid',
    subcategory: 'Filters',
    title: 'Array Filters',
    description:
      'Work with arrays in Liquid — filter, sort, join, and map over collections of objects.',
    tags: ['advanced', 'liquid'],
    snippets: [
      {
        label: 'Array manipulation',
        language: 'liquid',
        code: `{% assign sorted = collection.products | sort: "price" %}
{% assign reversed = collection.products | sort: "price" | reverse %}
{% assign titles = collection.products | map: "title" %}
{% assign cheap = collection.products | where: "available", true %}

{{ titles | join: ", " }}
{{ collection.products | size }}
{{ collection.products | first | title }}
{{ collection.products | last | title }}`,
      },
      {
        label: 'uniq & concat',
        language: 'liquid',
        code: `{% assign tags_a = product.tags %}
{% assign tags_b = "new,sale" | split: "," %}
{% assign all_tags = tags_a | concat: tags_b | uniq %}`,
      },
    ],
  },

  // ─── LIQUID › OBJECTS ───────────────────────────────────────────────────────
  {
    id: 'liquid-product-object',
    category: 'Liquid',
    subcategory: 'Objects',
    title: 'Product Object',
    description:
      'The `product` object is the most commonly used Liquid object. It exposes all product data including variants, images, metafields, and more.',
    tags: ['basic', 'liquid', 'interview'],
    snippets: [
      {
        label: 'Key product properties',
        language: 'liquid',
        code: `{{ product.id }}
{{ product.title }}
{{ product.handle }}
{{ product.description }}
{{ product.url }}
{{ product.type }}
{{ product.vendor }}
{{ product.price }}           {# lowest variant price in cents #}
{{ product.compare_at_price }}
{{ product.available }}       {# true if any variant in stock #}
{{ product.tags | join: ", " }}
{{ product.images.size }}
{{ product.featured_image | image_url: width: 400 | image_tag }}
{{ product.selected_or_first_available_variant.id }}`,
      },
      {
        label: 'Variants loop',
        language: 'liquid',
        code: `{% for variant in product.variants %}
  <option
    value="{{ variant.id }}"
    {% unless variant.available %}disabled{% endunless %}
  >
    {{ variant.title }} — {{ variant.price | money }}
  </option>
{% endfor %}`,
      },
    ],
  },
  {
    id: 'liquid-cart-object',
    category: 'Liquid',
    subcategory: 'Objects',
    title: 'Cart Object',
    description:
      'Access and render cart data with the `cart` Liquid object. Includes items, totals, item count, and cart attributes.',
    tags: ['basic', 'liquid', 'interview'],
    snippets: [
      {
        label: 'Cart properties',
        language: 'liquid',
        code: `{{ cart.item_count }}
{{ cart.total_price | money }}
{{ cart.total_discount | money }}
{{ cart.currency.iso_code }}

{% for item in cart.items %}
  <div>
    {{ item.product_title }} × {{ item.quantity }}
    {{ item.line_price | money }}
    <img src="{{ item.image | image_url: width: 80 }}" alt="{{ item.image.alt }}">
  </div>
{% endfor %}`,
      },
    ],
  },

  // ─── THEMES › STRUCTURE ─────────────────────────────────────────────────────
  {
    id: 'theme-structure',
    category: 'Themes',
    subcategory: 'Structure',
    title: 'Theme File Structure',
    description:
      'Every Shopify theme follows a strict folder structure. Understanding it is key to building and customising themes correctly.',
    tags: ['basic', 'theme', 'interview'],
    snippets: [
      {
        label: 'Folder structure',
        language: 'bash',
        code: `my-theme/
├── assets/          # CSS, JS, images, fonts
├── config/
│   ├── settings_schema.json   # Theme settings definition
│   └── settings_data.json     # Saved setting values
├── layout/
│   └── theme.liquid           # Root layout (wraps all pages)
├── locales/                   # Translation strings
├── sections/                  # Reusable + assignable sections
├── snippets/                  # Small, reusable Liquid includes
├── templates/
│   ├── index.json             # Home page template
│   ├── product.json           # Product page template
│   ├── collection.json        # Collection page template
│   ├── cart.liquid            # Cart page (can also be .json)
│   └── customers/
│       └── account.liquid     # Customer account page
└── package.json               # (optional) deps for Dawn-based themes`,
      },
    ],
    notes: 'JSON templates (`.json`) enable Online Store Editor customization. Liquid templates are simpler but less customizable by merchants.',
  },
  {
    id: 'theme-sections',
    category: 'Themes',
    subcategory: 'Sections',
    title: 'Sections Anatomy',
    description:
      'Sections are the building blocks of Shopify themes. Each section combines a Liquid template with a JSON `{% schema %}` block that defines its settings.',
    tags: ['basic', 'theme', 'snippet'],
    snippets: [
      {
        label: 'Minimal section',
        language: 'liquid',
        code: `<div class="hero" style="background-color: {{ section.settings.bg_color }}">
  <h1>{{ section.settings.heading }}</h1>
  <p>{{ section.settings.subtext }}</p>
</div>

{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Welcome to our store"
    },
    {
      "type": "textarea",
      "id": "subtext",
      "label": "Subtext"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#ffffff"
    }
  ],
  "presets": [
    {
      "name": "Hero Banner"
    }
  ]
}
{% endschema %}`,
      },
    ],
  },

  // ─── SCHEMA ─────────────────────────────────────────────────────────────────
  {
    id: 'schema-settings-types',
    category: 'Schema',
    subcategory: 'General',
    title: 'Schema Setting Types',
    description:
      'Shopify schema supports many setting types for the Theme Editor. Choose the right type to give merchants the best editing experience.',
    tags: ['basic', 'schema', 'interview'],
    snippets: [
      {
        label: 'All common setting types',
        language: 'json',
        code: `[
  { "type": "text",       "id": "title",     "label": "Title" },
  { "type": "textarea",   "id": "bio",       "label": "Bio" },
  { "type": "richtext",   "id": "content",   "label": "Content" },
  { "type": "number",     "id": "count",     "label": "Count", "default": 4 },
  { "type": "range",      "id": "speed",     "label": "Speed",
    "min": 1, "max": 10, "step": 1, "default": 5 },
  { "type": "checkbox",   "id": "show",      "label": "Show section", "default": true },
  { "type": "select",     "id": "size",      "label": "Size",
    "options": [
      { "value": "sm", "label": "Small" },
      { "value": "md", "label": "Medium" },
      { "value": "lg", "label": "Large" }
    ],
    "default": "md"
  },
  { "type": "color",      "id": "bg",        "label": "Background" },
  { "type": "image_picker", "id": "image",   "label": "Image" },
  { "type": "url",        "id": "link",      "label": "Link" },
  { "type": "product",    "id": "product",   "label": "Product" },
  { "type": "collection", "id": "coll",      "label": "Collection" },
  { "type": "font_picker","id": "font",      "label": "Font" }
]`,
      },
      {
        label: 'Blocks in schema',
        language: 'json',
        code: `{
  "name": "Testimonials",
  "max_blocks": 6,
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        { "type": "textarea", "id": "quote", "label": "Quote" },
        { "type": "text",     "id": "author", "label": "Author" },
        { "type": "image_picker", "id": "avatar", "label": "Avatar" }
      ]
    }
  ]
}`,
      },
    ],
  },

  // ─── SHOPIFY CLI ─────────────────────────────────────────────────────────────
  {
    id: 'shopify-cli-commands',
    category: 'Shopify CLI',
    subcategory: 'General',
    title: 'Essential CLI Commands',
    description:
      'Shopify CLI 3.x commands for theme development. Used to preview, push, pull, and manage themes from the terminal.',
    tags: ['basic', 'cli', 'snippet'],
    snippets: [
      {
        label: 'Theme development commands',
        language: 'bash',
        code: `# Authenticate
shopify auth login --store my-store.myshopify.com

# Start dev server (hot reload)
shopify theme dev --store my-store.myshopify.com

# Push theme to store
shopify theme push --store my-store.myshopify.com

# Pull live theme to local
shopify theme pull --store my-store.myshopify.com

# List all themes
shopify theme list --store my-store.myshopify.com

# Package theme as zip
shopify theme package

# Check theme for errors
shopify theme check

# Create new theme from skeleton
shopify theme init my-new-theme`,
      },
      {
        label: 'app commands',
        language: 'bash',
        code: `# Create a new Shopify app
shopify app init

# Start local development server
shopify app dev

# Deploy app
shopify app deploy

# Generate a new extension
shopify app generate extension`,
      },
    ],
  },

  // ─── METAFIELDS ─────────────────────────────────────────────────────────────
  {
    id: 'metafields-basics',
    category: 'Metafields',
    subcategory: 'General',
    title: 'Metafields in Liquid',
    description:
      'Metafields allow you to attach custom data to products, collections, customers, etc. Access them in Liquid via dot notation or the `metafield` filter.',
    tags: ['advanced', 'metafields', 'interview'],
    snippets: [
      {
        label: 'Accessing metafields',
        language: 'liquid',
        code: `{# Namespace: custom, Key: care_instructions #}
{{ product.metafields.custom.care_instructions }}

{# With type coercion #}
{% assign size_guide = product.metafields.custom.size_guide %}
{{ size_guide.value }}

{# List metafield (array) #}
{% for feature in product.metafields.custom.features.value %}
  <li>{{ feature }}</li>
{% endfor %}

{# Rich text metafield #}
{{ product.metafields.custom.long_description | metafield_tag }}

{# File metafield (image) #}
{{ product.metafields.custom.extra_image | metafield_tag }}`,
      },
      {
        label: 'Metafield definition (via API)',
        language: 'json',
        code: `{
  "metafield_definition": {
    "name": "Care Instructions",
    "namespace": "custom",
    "key": "care_instructions",
    "type": "multi_line_text_field",
    "owner_type": "PRODUCT"
  }
}`,
      },
    ],
    notes: 'Always define metafield definitions in the Shopify Admin first so they appear in the theme editor.',
  },

  // ─── JAVASCRIPT ─────────────────────────────────────────────────────────────
  {
    id: 'js-cart-api',
    category: 'JavaScript',
    subcategory: 'Cart API',
    title: 'Cart AJAX API',
    description:
      'Use Shopify\'s Cart AJAX API to add, update, and fetch cart data without page reloads. Returns JSON from `/cart/*.js` endpoints.',
    tags: ['advanced', 'javascript', 'snippet'],
    snippets: [
      {
        label: 'Add to cart',
        language: 'javascript',
        code: `async function addToCart(variantId, quantity = 1) {
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

// Usage
addToCart(12345678901234, 1)
  .then(data => console.log('Added:', data))
  .catch(err => console.error(err));`,
      },
      {
        label: 'Fetch cart',
        language: 'javascript',
        code: `// GET current cart state
const cart = await fetch('/cart.js').then(r => r.json());
console.log(cart.item_count, cart.total_price);`,
      },
      {
        label: 'Update item quantity',
        language: 'javascript',
        description: 'Use /cart/change.js to set the exact quantity for a line item.',
        code: `await fetch('/cart/change.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: lineItemKey, quantity: 2 })
});`,
      },
      {
        label: 'Remove item (quantity → 0)',
        language: 'javascript',
        description: 'Shopify has no separate delete endpoint. Setting quantity to 0 removes the item automatically.',
        code: `await fetch('/cart/change.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: lineItemKey, quantity: 0 })
});`,
      },
    ],
  },

  // ─── CSS / RESPONSIVE ───────────────────────────────────────────────────────
  {
    id: 'css-responsive-grid',
    category: 'CSS',
    subcategory: 'Responsive',
    title: 'Responsive Product Grid',
    description:
      'CSS Grid pattern for a responsive product grid — adapts from 1 column on mobile to 4 on desktop without media query bloat.',
    tags: ['basic', 'css', 'snippet'],
    snippets: [
      {
        label: 'Auto-fill grid',
        language: 'css',
        code: `.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.product-card {
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
}`,
      },
      {
        label: 'Liquid + HTML markup',
        language: 'liquid',
        code: `<div class="product-grid">
  {% for product in collection.products %}
    <a href="{{ product.url }}" class="product-card">
      {{ product.featured_image | image_url: width: 400 | image_tag:
         loading: 'lazy', alt: product.featured_image.alt }}
      <div class="p-4">
        <h3>{{ product.title }}</h3>
        <p>{{ product.price | money }}</p>
      </div>
    </a>
  {% endfor %}
</div>`,
      },
    ],
  },

  // ─── PERFORMANCE ─────────────────────────────────────────────────────────────
  {
    id: 'performance-images',
    category: 'Performance',
    subcategory: 'General',
    title: 'Optimized Image Loading',
    description:
      'Shopify\'s CDN-powered `image_url` filter with `image_tag` generates responsive, lazy-loaded images with proper `srcset` and `sizes` attributes automatically.',
    tags: ['performance', 'snippet', 'interview'],
    snippets: [
      {
        label: 'Responsive image with image_tag',
        language: 'liquid',
        code: `{{
  product.featured_image
  | image_url: width: 800
  | image_tag:
      loading: 'lazy',
      widths: '200,400,600,800,1000',
      sizes: '(min-width: 768px) 50vw, 100vw',
      alt: product.featured_image.alt,
      class: 'w-full h-auto'
}}`,
      },
      {
        label: 'Manual srcset',
        language: 'liquid',
        code: `{% assign img = product.featured_image %}
<img
  src="{{ img | image_url: width: 800 }}"
  srcset="
    {{ img | image_url: width: 400 }} 400w,
    {{ img | image_url: width: 800 }} 800w,
    {{ img | image_url: width: 1200 }} 1200w
  "
  sizes="(min-width: 1024px) 800px, 100vw"
  width="{{ img.width }}"
  height="{{ img.height }}"
  loading="lazy"
  alt="{{ img.alt | escape }}"
>`,
      },
    ],
    notes: 'Never use the deprecated `| img_url` filter — it doesn\'t support modern image CDN features.',
  },

  // ─── DEBUGGING ───────────────────────────────────────────────────────────────
  {
    id: 'debugging-tips',
    category: 'Debugging',
    subcategory: 'General',
    title: 'Debugging Liquid Templates',
    description:
      'Useful techniques for inspecting Liquid variables, objects, and template errors in Shopify themes.',
    tags: ['debugging', 'snippet', 'interview'],
    snippets: [
      {
        label: 'Inspect objects with json filter',
        language: 'liquid',
        code: `{# Dump full product object as JSON #}
<pre>{{ product | json }}</pre>

{# Inspect all variant properties #}
{% for variant in product.variants %}
  <pre>{{ variant | json }}</pre>
{% endfor %}

{# Check cart #}
<pre>{{ cart | json }}</pre>

{# List all available settings #}
<pre>{{ settings | json }}</pre>`,
      },
      {
        label: 'Theme check in CLI',
        language: 'bash',
        code: `# Run Shopify Theme Check linter
shopify theme check

# Run on specific file
shopify theme check sections/hero.liquid

# Output as JSON
shopify theme check --output json`,
      },
      {
        label: 'Conditional debug output',
        language: 'liquid',
        code: `{% if settings.debug_mode %}
  <div style="padding:10px;background:#fff3cd;border:1px solid #ffc107;font-size:12px">
    <strong>DEBUG:</strong>
    <pre>{{ product | json }}</pre>
  </div>
{% endif %}`,
      },
    ],
  },
];

// ─── Helper indexes ──────────────────────────────────────────────────────────

export const entriesById = new Map(entries.map(e => [e.id, e]));

export const allTags = [...new Set(entries.flatMap(e => e.tags))].sort();

export const navStructure = [
  {
    category: 'Liquid',
    icon: '💧',
    subcategories: ['Basics', 'Filters', 'Objects'],
  },
  {
    category: 'Themes',
    icon: '🎨',
    subcategories: ['Structure', 'Sections', 'Templates'],
  },
  {
    category: 'Schema',
    icon: '🗂️',
    subcategories: ['General'],
  },
  {
    category: 'Shopify CLI',
    icon: '⚡',
    subcategories: ['General'],
  },
  {
    category: 'Metafields',
    icon: '🔮',
    subcategories: ['General'],
  },
  {
    category: 'JavaScript',
    icon: '🟨',
    subcategories: ['Cart API', 'AJAX'],
  },
  {
    category: 'CSS',
    icon: '🎀',
    subcategories: ['Responsive'],
  },
  {
    category: 'Performance',
    icon: '🚀',
    subcategories: ['General'],
  },
  {
    category: 'Debugging',
    icon: '🐛',
    subcategories: ['General'],
  },
] as const;
