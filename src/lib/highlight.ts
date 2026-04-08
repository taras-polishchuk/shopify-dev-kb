/**
 * Minimal syntax highlighter for Liquid, JS, JSON, CSS, Bash.
 * Returns HTML string with <span class="..."> wrappers.
 */

type Language = 'liquid' | 'json' | 'javascript' | 'typescript' | 'css' | 'bash' | 'html';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type Rule = [RegExp, string];

const LIQUID_RULES: Rule[] = [
  // Comments {# ... #} and {% comment %}
  [/(\{#[\s\S]*?#\})/g, 'hl-comment'],
  // Tags {% ... %}
  [/(\{%-?\s*(?:if|elsif|else|endif|for|endfor|unless|endunless|case|when|endcase|assign|capture|endcapture|include|render|section|layout|paginate|endpaginate|break|continue|tablerow|endtablerow|form|endform|style|endstyle|javascript|endjavascript|schema|endschema|raw|endraw)[^%]*?-?%\})/g, 'hl-tag'],
  // Output {{ ... }}
  [/(\{\{-?[\s\S]*?-?\}\})/g, 'hl-output'],
  // Strings
  [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, 'hl-string'],
  // Numbers
  [/\b(\d+(?:\.\d+)?)\b/g, 'hl-number'],
  // Filters (pipe + word)
  [/(\|\s*[a-z_]+)/g, 'hl-filter'],
];

const JS_RULES: Rule[] = [
  [/(\/\/[^\n]*)/g, 'hl-comment'],
  [/(\/\*[\s\S]*?\*\/)/g, 'hl-comment'],
  [/\b(async|await|const|let|var|function|return|if|else|for|while|of|in|new|class|import|export|default|from|try|catch|throw|typeof|instanceof|true|false|null|undefined)\b/g, 'hl-keyword'],
  [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, 'hl-string'],
  [/\b(\d+(?:\.\d+)?)\b/g, 'hl-number'],
  [/\b([A-Z][a-zA-Z0-9]*)\b/g, 'hl-class'],
  [/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, 'hl-fn'],
];

const JSON_RULES: Rule[] = [
  [/("(?:[^"\\]|\\.)*")\s*:/g, 'hl-key'],
  [/("(?:[^"\\]|\\.)*")/g, 'hl-string'],
  [/\b(true|false|null)\b/g, 'hl-keyword'],
  [/\b(\d+(?:\.\d+)?)\b/g, 'hl-number'],
];

const CSS_RULES: Rule[] = [
  [/(\/\*[\s\S]*?\*\/)/g, 'hl-comment'],
  [/([.#]?[a-zA-Z][a-zA-Z0-9-_]*)\s*\{/g, 'hl-selector'],
  [/([a-z-]+)\s*:/g, 'hl-property'],
  [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, 'hl-string'],
  [/\b(\d+(?:\.\d+)?)(%|px|rem|em|vh|vw|fr)?\b/g, 'hl-number'],
  [/(#[0-9a-fA-F]{3,8})\b/g, 'hl-string'],
];

const BASH_RULES: Rule[] = [
  [/(#[^\n]*)/g, 'hl-comment'],
  [/\b(shopify|npm|npx|node|git|mkdir|cd|ls|cat|echo|curl|export)\b/g, 'hl-keyword'],
  [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, 'hl-string'],
  [/(--[a-z-]+)/g, 'hl-flag'],
];

function applyRules(code: string, rules: Rule[]): string {
  // Collect all token positions from the ORIGINAL code (no HTML escaping yet).
  // Running regexes on already-tagged HTML causes cascading corruption where
  // class names like "hl-keyword" get re-matched by subsequent rules.
  type Token = { start: number; end: number; cls: string };
  const tokens: Token[] = [];

  for (const [regex, cls] of rules) {
    // Always use a fresh /g regex so lastIndex doesn't bleed between calls
    const r = new RegExp(regex.source, 'g');
    let m: RegExpExecArray | null;
    while ((m = r.exec(code)) !== null) {
      // m[1] is the first capture group (the actual token), m[0] is the full match
      // (may include surrounding context like trailing : or {)
      const tokenText = m[1] ?? m[0];
      const start = m.index;
      const end = start + tokenText.length;
      tokens.push({ start, end, cls });
    }
  }

  // Sort by start position; on ties, prefer the longer match
  tokens.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlaps — first (earliest) non-overlapping token wins
  const kept: Token[] = [];
  let cursor = 0;
  for (const tok of tokens) {
    if (tok.start >= cursor) {
      kept.push(tok);
      cursor = tok.end;
    }
  }

  // Reconstruct the string: escape plain text, wrap tokens in spans
  let out = '';
  cursor = 0;
  for (const { start, end, cls } of kept) {
    out += escapeHtml(code.slice(cursor, start));
    out += `<span class="${cls}">${escapeHtml(code.slice(start, end))}</span>`;
    cursor = end;
  }
  out += escapeHtml(code.slice(cursor));
  return out;
}

export function highlight(code: string, language: Language): string {
  switch (language) {
    case 'liquid':
    case 'html':
      return applyRules(code, LIQUID_RULES);
    case 'javascript':
    case 'typescript':
      return applyRules(code, JS_RULES);
    case 'json':
      return applyRules(code, JSON_RULES);
    case 'css':
      return applyRules(code, CSS_RULES);
    case 'bash':
      return applyRules(code, BASH_RULES);
    default:
      return escapeHtml(code);
  }
}

export const languageLabels: Record<Language, string> = {
  liquid: 'Liquid',
  json: 'JSON',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  css: 'CSS',
  bash: 'Shell',
  html: 'HTML',
};
