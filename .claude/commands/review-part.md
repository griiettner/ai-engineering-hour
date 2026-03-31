Review the presentation file specified in the argument (e.g., `part2.html`) against the established standards of this project.

## What to check

**1. Factual accuracy**
- All Claude Code config references use the real API (`PostToolUse`, `PreToolUse`, `Stop`, `Notification` events)
- Config file path is `.claude/settings.json`, not `.claudecode/config.json` or any made-up path
- No invented keys like `autoFix: true`
- CLI tools named correctly: "Claude Code / Gemini CLI" — never "Codex CLI" as a current product

**2. Visual consistency with part1 and part3**
- Nav uses group labels (`.nav-group-label`) separating sections into logical groups
- Step cards use: `flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm` + `.step-number`
- Code blocks use correct syntax colors: violet=keys, emerald=strings, blue=properties, orange=booleans
- Copy buttons use `navigator.clipboard.writeText()` — never fake/simulated feedback only

**3. Content completeness**
- Each part should have a "Próximos Passos" section with concrete actionable steps
- Interactive elements (charts, toggles, clickable cards) should have real data — no "Task 1, Task 2" labels
- Before/after comparisons use `.antipattern-wrong` and `.antipattern-right` CSS classes

**4. Language**
- All user-facing text is in Brazilian Portuguese
- Code snippets and technical identifiers stay in English

**5. Missing sections checklist**
- [ ] Does it have nav group labels?
- [ ] Is there at least one interactive element?
- [ ] Is there a "Limites & Cuidados" or equivalent section warning about the downside?
- [ ] Is there a "Próximos Passos" / call-to-action section?
- [ ] Does the mantra / closing quote avoid absolutes like "a máquina faz tudo"?

## Output format
List issues grouped by category (Factual / Visual / Content / Language), each with the line number and a suggested fix. End with a summary of what's good and a priority order for fixes.
