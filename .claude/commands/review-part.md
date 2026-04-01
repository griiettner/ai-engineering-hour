Review the presentation file specified in the argument (e.g., `part2.html`) against the established standards of this project.

## What to check

**1. Factual accuracy**
- All Claude Code config references use the real API (`PostToolUse`, `PreToolUse`, `Stop`, `Notification` events)
- Config file path is `.claude/settings.json`, not `.claudecode/config.json` or any made-up path
- No invented keys like `autoFix: true`
- CLI tools named correctly: "Claude Code / Gemini CLI" — never "Codex CLI" as a current product
- No references to "Ubivis" — this is a personal project by Paulo Griiettner

**2. Visual consistency**
- Nav uses group labels (`.nav-group-label`) separating sections into logical groups
- Step cards use: `flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm` + `.step-number`
- Code blocks use correct syntax colors: violet=keys, emerald=strings, blue=properties, orange=booleans
- Copy buttons use `navigator.clipboard.writeText()` — never fake/simulated feedback only
- Accent color is distinct from other parts

**3. Content completeness**
- Each part should have a "Próximos Passos" section with concrete actionable steps
- Interactive elements (charts, toggles, clickable cards) should have real data — no "Task 1, Task 2" labels
- Before/after comparisons use `.antipattern-wrong` and `.antipattern-right` CSS classes

**4. Language**
- All user-facing text is in Brazilian Portuguese
- Code snippets and technical identifiers stay in English

**5. i18n annotations**
- All visible text has `data-i18n="key"` or `data-i18n-html="key"` attributes
- No `data-i18n` inside `<pre>` blocks
- Emoji prefix pattern: separate `<span>` for emoji, `<span data-i18n="key">` for text
- Key naming follows flat dot notation: `sec.{section}.{element}`, `nav.{item}`
- `locales/en/part{N}.json` exists with all keys matching the HTML annotations
- Keys in JSON match keys in HTML — no orphaned or missing keys
- `i18n:applied` event listener exists if page has Chart.js charts
- Shared keys (footer, complete, header) are NOT duplicated in part JSON (they're in `common.json`)

**6. Structure**
- `<script src="i18n.js" defer>` present in `<head>`
- Session complete CTA (`<div id="session-complete">`) present between layout `</div>` and `<script>`
- `navigate()` function toggles `session-complete` visibility on last section
- Footer present before `</body>` with correct structure and GitHub link
- `index.html` card updated to "Available" with working link

**7. Missing sections checklist**
- [ ] Does it have nav group labels?
- [ ] Is there at least one interactive element?
- [ ] Is there a "Limites & Cuidados" or equivalent section warning about the downside?
- [ ] Is there a "Próximos Passos" / call-to-action section?
- [ ] Does the mantra / closing quote avoid absolutes like "a máquina faz tudo"?
- [ ] Is the session-complete CTA present and wired to the last section?
- [ ] Is the footer present with the correct Paulo Griiettner attribution?

## Output format
List issues grouped by category (Factual / Visual / Content / i18n / Structure / Language), each with the line number and a suggested fix. End with a summary of what's good and a priority order for fixes.
