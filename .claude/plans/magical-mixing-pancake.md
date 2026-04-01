# Plan: i18n for Engineering Hour

## Context
The Engineering Hour series (index + part1–part7 HTML files on GitHub Pages) is 100% PT-BR hardcoded. The goal is to add a lightweight, contributor-friendly internationalization layer — starting with English — without introducing a build system or heavy dependencies.

All text is inline in HTML. No templating engine exists. Files are opened directly in the browser.

---

## Approach

### File Structure
```
/locales/
  en/
    common.json     ← shared strings across all pages
    index.json      ← index.html only
    part1.json      ← part1.html only
    ...
    part7.json
/i18n.js            ← shared runtime, ~120 lines, no dependencies
/.claude/agents/
  i18n-project-manager.md
  i18n-coder.md
  i18n-code-reviewer.md
  i18n-translator.md
  i18n-translation-reviewer.md
```

PT-BR JSON files are **not required** — the HTML is the canonical PT-BR source. Missing keys fall back to the DOM text silently.

### HTML Conventions

- **Pure text** (`<div>`, nav labels, simple `<p>`): `data-i18n="key"` → replaces `textContent`
- **Mixed HTML** (paragraphs with `<strong>`, `<code>` inline): `data-i18n-html="key"` → replaces `innerHTML`
- **Emoji prefix pattern** (nav buttons, `<h2>` with emoji spans): wrap text node in `<span data-i18n="key">`
- **Code blocks** (`<pre>`, `<canvas>`, syntax spans): **never marked** — runtime guards with `el.closest('pre')`

Key naming: flat dot notation — `sec.tools.h2`, `nav.group.fundamentals`, `chart.dirty.caption`

### i18n.js Runtime (~120 lines)
- Reads language from `localStorage` (key: `eh_lang`), defaults to `pt`
- Fetches `locales/{lang}/common.json` + `locales/{lang}/{page}.json` in parallel via `Promise.all`
- Missing file (404): silently falls back to DOM text
- Dispatches `i18n:applied` CustomEvent so pages can update Chart.js labels
- Injects `PT | EN` switcher into header via JS (change once, all pages update)
- Persists choice via `localStorage` across page navigations

### Adding New Languages (Contributor Flow)
1. Create `locales/{lang}/common.json`
2. Create `locales/{lang}/partN.json` for desired pages
3. Add lang code to `SUPPORTED` array in `i18n.js`
4. Add button to `injectSwitcher()` in `i18n.js`

---

## Multi-Agent Pipeline

```
         i18n-project-manager
                 │
         Phase 1 (blocking)
                 │
           i18n-coder
         (creates i18n.js)
                 │
      i18n-code-reviewer loop
                 │ ✅
         Phase 2 (parallel)
         ┌───────┴────────┐
         ▼                ▼
   i18n-coder       i18n-translator
  (annotates HTML)  (reads HTML → JSON)
  uses key schema   uses same key schema
         │                │
         ▼                ▼
  i18n-code-    i18n-translation-
    reviewer        reviewer
         │                │
    ❌ loop          ❌ loop
         │ ✅             │ ✅
         └───────┬────────┘
                 │
         Phase 3: reconcile keys
         (rename mismatches if any)
                 │
         PM reports completion
```

**Key contract**: the flat dot notation schema in this plan is shared between coder and translator. Both derive key names independently from the HTML structure — no sequential dependency.

**Execution order:**
1. PM delegates `i18n.js` + script tag injection to coder → code-reviewer loop (blocking)
2. PM launches coder (HTML annotation) and translator (JSON creation) **simultaneously**
3. Each runs its own review loop independently
4. PM reconciles any key name mismatches between HTML attrs and JSON files
5. Done

---

## Critical Files

| File | Action |
|------|--------|
| `i18n.js` | **Create** — shared runtime |
| `locales/en/common.json` | **Create** — shared EN strings |
| `locales/en/index.json` | **Create** — index page EN |
| `locales/en/part1.json`–`part7.json` | **Create** — EN translations |
| `index.html` | **Modify** — add `<script src="i18n.js">`, `data-i18n` attrs |
| `part1.html`–`part7.html` | **Modify** — same + `i18n:applied` listener for charts |
| `.claude/agents/i18n-project-manager.md` | **Create** |
| `.claude/agents/i18n-coder.md` | **Create** |
| `.claude/agents/i18n-code-reviewer.md` | **Create** |
| `.claude/agents/i18n-translator.md` | **Create** |
| `.claude/agents/i18n-translation-reviewer.md` | **Create** |

---

## Verification
- Open `part1.html` in browser → displays PT-BR
- Click `EN` → text switches to English, switcher activates
- Refresh → stays in English (localStorage)
- Navigate to `part2.html`–`part7.html` → stays English, no PT-BR flash
- DevTools → no console errors, no 404s for `pt` locale
- Toggle context chart on part1 → chart labels also translate
