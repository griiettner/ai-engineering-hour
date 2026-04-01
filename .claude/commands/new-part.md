Scaffold a new presentation part for the Engineering Hour series.

## Usage
`/new-part <number> <topic>`

Example: `/new-part 8 "Orquestração de Pipelines com IA"`

## Workflow — Two Phases

This skill creates the session in **Phase 1 only**. Translation (Phase 2) happens separately, after human review.

### Phase 1: Scaffold (this skill)
1. Create `part{N}.html` with all content in PT-BR
2. Add `data-i18n` / `data-i18n-html` annotations on all visible text
3. Add `i18n:applied` listener if page has charts
4. Update `index.html` card to "Available"
5. **Do NOT create `locales/en/part{N}.json`** — wait for human approval

### Phase 2: Translation (after human says "go" / "finish" / "translate")
1. Create `locales/en/part{N}.json` with all translation keys
2. Update `locales/en/index.json` if index card text changed
3. Verify key parity between HTML annotations and JSON

**Why:** Content changes during review would invalidate the translation, causing rework. The human reviews the PT-BR content first, iterates until satisfied, then gives the green light for translation.

---

## Instructions

Read `CLAUDE.md` at the project root first to load all design conventions.

Then create `part<number>.html` following the complete structure below.

---

### HTML skeleton

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Engineering Hour P{N}: {Subtitle}</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="nav.js" defer></script>
    <script src="i18n.js" defer></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        stone: {
                            50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4',
                            300: '#d6d3d1', 700: '#44403c', 800: '#292524', 900: '#1c1917',
                        },
                        accent: {
                            // Define the part's accent color here
                            // Pick a distinct color not used by existing parts
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="shared.css">
    <style>
        :root { --accent: <ACCENT_HEX>; }
        /* Add part-specific styles here (chart-container overrides, custom components, etc.) */
    </style>
</head>
<body class="bg-stone-50 text-stone-800">
    <!-- Header -->
    <!-- Nav + Main layout -->
    <!-- Session Complete -->
    <!-- Footer -->
    <!-- Script -->
</body>
</html>
```

---

### Required sections (minimum 6)
1. **Introdução / Conceito Central** — explain the core idea with an interactive element
2. **Como Funciona** — technical detail with a code block or diagram
3. **Casos de Uso Reais** — concrete examples from the dev workflow
4. **Limites & Cuidados** — what can go wrong, when NOT to use
5. **Impacto / Métricas** — comparison or chart showing the value
6. **Próximos Passos** — 4-step actionable checklist with real commands + closing mantra

### Nav structure
Group sections with `nav-group-label` divs (uppercase, `text-stone-400`). Suggested groups:
- "O Conceito" → intro + how it works
- "Na Prática" → use cases + limits
- "Impacto" → comparison + metrics
- "Ação" → próximos passos

### Header
```html
<header class="sticky top-0 z-20 bg-white border-b border-stone-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <span class="text-xl">🎓</span>
            <h1 class="text-lg font-bold text-stone-800">
                Engineering Hour <span class="text-{accent}">P{N}</span>
            </h1>
        </div>
        <span class="text-sm text-stone-400 hidden sm:block" data-i18n="header.subtitle">{Subtitle in PT-BR}</span>
    </div>
</header>
```

### Session Complete CTA (between layout `</div>` and `<script>`)
```html
<!-- Session Complete -->
<div id="session-complete" class="hidden border-t border-stone-200 bg-stone-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <span class="text-3xl mb-3 block">🎉</span>
        <h3 class="text-xl font-bold text-stone-800 mb-2" data-i18n="complete.title">Sessão concluída!</h3>
        <p class="text-stone-500 mb-6 text-sm" data-i18n="complete.desc">Você completou esta sessão. Continue para a próxima ou volte ao índice.</p>
        <div class="flex items-center justify-center gap-3">
            <a href="index.html" class="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-white rounded-lg text-sm font-semibold hover:bg-stone-700 transition-colors" data-i18n="complete.home">← Voltar ao índice</a>
        </div>
    </div>
</div>
```

### Footer (after session-complete, before `</body>`)
```html
<!-- Footer -->
<footer class="border-t border-stone-200 mt-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-sm text-stone-400">
            <span class="text-base">🎓</span>
            <span data-i18n-html="footer.brand">Engineering Hour · By <a href="https://github.com/griiettner/ai-engineering-hour" target="_blank" class="underline hover:text-stone-600">Paulo Griiettner</a></span>
        </div>
        <div class="flex items-center gap-4 text-xs text-stone-400">
            <span data-i18n="footer.stack">HTML · Tailwind CSS · Chart.js</span>
            <span>·</span>
            <span data-i18n="footer.tagline">Sem build. Abra e use.</span>
        </div>
    </div>
</footer>
```

### Navigation — handled by `nav.js`

**Do NOT write a `navigate()` function or `window.onload` in the page.** The shared `nav.js` handles:
- Section show/hide, nav active state, session-complete toggle (auto-detects last nav-item)
- URL hash sync (`#sectionId`) — survives page refresh
- Auto-init on DOMContentLoaded (navigates to hash or first section)

If the page has **page-specific logic** on navigate (e.g. chart init), define a hook:
```javascript
window.onNavigate = function(sectionId) {
    if (sectionId === 'metricas' && !window.chartInit) initChart();
};
```

If no page-specific logic is needed, do not define `onNavigate`.

---

### i18n annotations (Phase 1 — HTML only, no JSON yet)

Every user-visible text element MUST have i18n attributes during scaffolding:
- `data-i18n="key"` for plain text (replaces `textContent`)
- `data-i18n-html="key"` for text with inline HTML (`<strong>`, `<code>`, `<a>`)
- **Never** annotate inside `<pre>` blocks
- Emoji prefix: separate spans — `<span>🚀</span> <span data-i18n="key">Text</span>`

**Key naming convention** (flat dot notation):
- Nav items: `nav.{sectionId}` or `nav.group.{groupName}`
- Section headings: `sec.{sectionId}.h2`
- Section content: `sec.{sectionId}.{element}` (e.g., `sec.intro.desc`, `sec.limits.item.1`)
- Step cards: `sec.{sectionId}.step.{N}.title`, `sec.{sectionId}.step.{N}.desc`
- Chart labels: `chart.{name}.label.{item}`, `chart.{name}.dataset.{item}`
- Header: `header.subtitle`

**Chart.js i18n listener** — add this if the page has charts (even though JSON doesn't exist yet, the listener should be ready):
```javascript
window.addEventListener('i18n:applied', function(e) {
    var t = function(k) { return e.detail.t(k); };
    if (currentState.chart) {
        currentState.chart.data.labels = [
            t('chart.{name}.label.1') || 'Fallback PT',
            // ...
        ];
        currentState.chart.update();
    }
});
```

**Shared keys** (footer, complete, header.subtitle) are already in `locales/en/common.json` — do NOT duplicate them in the part JSON.

**Do NOT create `locales/en/part{N}.json` in this phase.** The human will review content first.

---

### Color accent — pick a DISTINCT color
Already used:
| Part | Color | Hex |
|------|-------|-----|
| P1 | Sky Blue | `#0284c7` |
| P2 | Gov Emerald | `#065f46` |
| P3 | Violet | `#6d28d9` |
| P4 | Teal | `#0d9488` |
| P5 | Orange | `#ea580c` |
| P6 | Indigo | `#4f46e5` |
| P7 | Fuchsia | `#c026d3` |

Pick a new distinct color for the new part. Document it in the HTML file's tailwind config.

---

### Update index.html
After creating the part file:
1. Find the "Coming soon" card for this part number in `index.html`
2. Change its status from "Coming soon" to "Available" with an `<a href="part{N}.html">` link
3. **Do NOT update `locales/en/index.json` yet** — that happens in Phase 2

---

### Phase 1 Checklist (scaffold)
- [ ] All nav items have matching `id="sec-*"` and `id="nav-*"` pairs
- [ ] `<script src="nav.js" defer>` is in `<head>` (before i18n.js)
- [ ] No inline `navigate()` function — use `window.onNavigate` hook if needed
- [ ] Session complete CTA is present between layout `</div>` and `<script>`
- [ ] Footer is present before `</body>`
- [ ] `<script src="i18n.js" defer>` is in `<head>`
- [ ] All visible text has `data-i18n` or `data-i18n-html` attributes
- [ ] No `data-i18n` inside `<pre>` blocks
- [ ] `i18n:applied` event listener added for any Chart.js charts
- [ ] No "Task 1, Task 2" chart labels — use realistic scenario names
- [ ] Copy buttons use real `navigator.clipboard.writeText()`
- [ ] Code examples use real API/config syntax (verify against docs)
- [ ] Closing mantra avoids putting 100% responsibility on the machine
- [ ] Brazilian Portuguese throughout visible content
- [ ] No references to "Ubivis" — this is a personal project
- [ ] Accent color is distinct from all existing parts
- [ ] `index.html` card updated from "Coming soon" to "Available"
- [ ] **No `locales/en/part{N}.json` created** — wait for Phase 2

### Phase 2 Checklist (translation — after human approval)
- [ ] `locales/en/part{N}.json` created with ALL `data-i18n` and `data-i18n-html` keys
- [ ] `locales/en/index.json` updated with card text for this part
- [ ] No shared keys duplicated (footer, complete, header are in `common.json`)
- [ ] Key parity verified: every HTML annotation has a JSON key and vice-versa
- [ ] Translation is natural English, not literal word-for-word

---

### Finishing the session
After the human reviews and approves the PT-BR content, they will say something like "translate", "finish", or "green light". At that point:
1. Read all `data-i18n` and `data-i18n-html` keys from `part{N}.html`
2. Create `locales/en/part{N}.json` with English translations
3. Update `locales/en/index.json` with the card's English text
4. Confirm key parity between HTML and JSON
