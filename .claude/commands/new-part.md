Scaffold a new presentation part for the Engineering Hour series.

## Usage
`/new-part <number> <topic>`

Example: `/new-part 4 "Agentes Autônomos e Sub-agentes"`

## Instructions

Read `CLAUDE.md` at the project root first to load all design conventions before generating any code.

Then create `part<number>.html` following this structure:

### Required sections (minimum)
1. **Introdução / Conceito Central** — explain the core idea with an interactive element
2. **Como Funciona** — technical detail with a code block or diagram
3. **Casos de Uso Reais** — concrete examples from the dev workflow
4. **Limites & Cuidados** — what can go wrong, when NOT to use
5. **Impacto / Antes & Depois** — comparison showing the value
6. **Próximos Passos** — 4-step actionable checklist with real commands

### Nav structure
Group sections with `nav-group-label` divs. Suggested groups:
- "O Conceito" → intro + how it works
- "Na Prática" → use cases + limits
- "Impacto" → comparison + metrics
- "Ação" → próximos passos

### Color accent
- Part 1: `accent-blue` (#0284c7)
- Part 3: `auto-violet` (#6d28d9)
- New parts: pick a distinct color and add it to the tailwind config block, document in CLAUDE.md

### Checklist before finishing
- [ ] All nav items have matching `id="sec-*"` and `id="nav-*"` pairs
- [ ] `navigate()` JS function handles all section IDs
- [ ] No "Task 1, Task 2" chart labels — use realistic scenario names
- [ ] Copy buttons use real `navigator.clipboard.writeText()`
- [ ] Code examples use real API/config syntax (verify against CLAUDE.md)
- [ ] Closing mantra avoids putting 100% responsibility on the machine
- [ ] Brazilian Portuguese throughout
