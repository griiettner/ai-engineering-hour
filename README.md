# Engineering Hour — AI-Augmented Developer Series

Série de apresentações interativas para o time de engenharia da Ubivis sobre o uso prático de IA no desenvolvimento de software. Cada sessão é uma SPA standalone em HTML aberta direto no browser — sem build, sem dependências, sem servidor.

## Como abrir

```bash
# Qualquer sessão funciona abrindo o arquivo diretamente
open part1.html
open part7.html
```

Ou arraste qualquer `partN.html` para o browser. Não há servidor necessário.

---

## Roadmap das Sessões

| # | Arquivo | Tema | Cor | Status |
|---|---------|------|-----|--------|
| 1 | `part1.html` | **Setup & Regras de Ouro** — IDE vs CLI, Contexto, Guardrails, Anti-patterns | Sky Blue `#0284c7` | ✅ Concluído |
| 2 | `part2.html` | **Planejamento Avançado** — Prompts estruturados e contexto eficiente | — | ✅ Concluído |
| 3 | `part3.html` | **Claude Hooks & Confiança Automatizada** — PostToolUse, PreToolUse, ciclo de validação | Violet `#6d28d9` | ✅ Concluído |
| 4 | `part4.html` | **Decisões Embasadas com MCP** — Model Context Protocol, ferramentas externas | Teal `#0d9488` | ✅ Concluído |
| 5 | `part5.html` | **Workspace Seguro & Guardrails** — CLAUDE.md, .cursorrules, CONSTITUTION.md | Orange `#ea580c` | ✅ Concluído |
| 6 | `part6.html` | **Skills & Comandos Slash** — `.claude/skills/`, frontmatter YAML, auto-invocação, índice de sub-skills | Indigo `#4f46e5` | ✅ Concluído |
| 7 | `part7.html` | **Agentes, Sub-Agentes & Agent Teams** — Single agent, subagentes, Agent Teams, economia de tokens | Fuchsia `#c026d3` | ✅ Concluído |
| 8 | `part8.html` | *(planejado)* | — | 🔜 |
| 9 | `part9.html` | *(planejado)* | — | 🔜 |
| 10 | `part10.html` | *(planejado)* | — | 🔜 |
| 11 | `part11.html` | *(planejado)* | — | 🔜 |
| 12 | `part12.html` | *(planejado)* | — | 🔜 |
| 13 | `part13.html` | *(planejado)* | — | 🔜 |
| 14 | `part14.html` | *(planejado)* | — | 🔜 |

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| CSS | [Tailwind CSS](https://tailwindcss.com) via CDN |
| Charts | [Chart.js](https://www.chartjs.org) via CDN |
| Fontes | Inter (sans-serif), Fira Code (monospace) |
| Build | **Nenhum** — arquivos abertos diretamente no browser |
| Linguagem | HTML + JS vanilla |

---

## Estrutura do Projeto

```
ai-engineering-hour/
├── part1.html          # Sessão 1 — Setup & Regras de Ouro
├── part2.html          # Sessão 2 — Planejamento Avançado
├── part3.html          # Sessão 3 — Claude Hooks
├── part4.html          # Sessão 4 — MCP
├── part5.html          # Sessão 5 — Workspace Seguro
├── part6.html          # Sessão 6 — Skills
├── part7.html          # Sessão 7 — Agentes
├── part8-14.html       # Sessões futuras (stubs)
│
├── demo/               # Arquivos de demonstração ao vivo
│   ├── CLAUDE.md
│   └── .claude/
│       ├── hooks/
│       │   └── block-destructive.sh
│       ├── rules/
│       │   ├── CONSTITUTION.md
│       │   └── README.md
│       └── settings.json
│
├── CLAUDE.md           # Convenções de design para o Claude Code
└── .claude/
    └── commands/       # Skills de automação da série
        ├── new-part.md     # /new-part <n> "<tema>"
        ├── review-part.md  # /review-part <arquivo>
        └── sync-parts.md   # /sync-parts
```

---

## Criando uma Nova Sessão

O projeto tem skills do Claude Code para automatizar a criação e revisão de novas partes.

### Criar nova sessão

```
/new-part 8 "Nome do Tema"
```

Lê o `CLAUDE.md` com todas as convenções e gera o `part8.html` com estrutura completa: nav, seções, chart, componentes de código e próximos passos.

### Revisar uma sessão existente

```
/review-part part7.html
```

Verifica: precisão técnica, consistência visual com as outras partes, completude de seções e correção de idioma.

### Verificar consistência entre todas as partes

```
/sync-parts
```

Audita a série inteira comparando estrutura visual, padrões de componentes e consistência de navegação.

---

## Convenções de Design

Cada `partN.html` segue estas regras:

**Layout**
- Body: `bg-stone-50` (`#fafaf9`), texto `stone-800` (`#292524`)
- Header sticky + sidebar nav (`md:w-64`, `sticky top-24`) + main content (`flex-1`, `bg-white`, `rounded-xl`)
- Container máximo: `max-w-7xl`

**Navegação**
- Grupos de nav com `.nav-group-label` (uppercase, `text-stone-400`)
- Items com active state: `border-left: 4px solid <cor-da-parte>` + `bg-stone-200`
- Função `navigate(sectionId)` controla visibilidade das seções

**Componentes recorrentes**
- Step cards: `flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm` + `.step-number` (círculo 2rem na cor da parte)
- Code blocks: `background: #1c1917` (stone-900), violet = chaves, emerald = strings, orange = booleans
- Copy buttons: `navigator.clipboard.writeText()` real — nunca simulado
- Anti-patterns: `.antipattern-wrong` (border-left `#e11d48`) / `.antipattern-right` (border-left `#059669`)

**Conteúdo**
- Todo texto visível em Português Brasileiro
- Código e identificadores técnicos permanecem em inglês
- Nenhuma seção sem exemplo concreto de código ou caso de uso real
- Mantra de fechamento sempre preserva julgamento humano — nunca coloca 100% de responsabilidade na máquina

---

## Paleta de Cores por Módulo

| Módulo | Cor primária | Hex |
|--------|-------------|-----|
| Part 1 | Sky Blue | `#0284c7` |
| Part 3 | Violet | `#6d28d9` |
| Part 4 | Teal | `#0d9488` |
| Part 5 | Orange | `#ea580c` |
| Part 6 | Indigo | `#4f46e5` |
| Part 7 | Fuchsia | `#c026d3` |
| Base | Warm Stone | `stone-*` |

Novas partes devem escolher uma cor distinta ainda não utilizada e documentá-la aqui.

---

## Contribuindo

1. Use `/new-part <n> "<tema>"` no Claude Code para scaffoldar a nova sessão
2. Siga as convenções documentadas em `CLAUDE.md`
3. Execute `/review-part partN.html` antes de commitar
4. Execute `/sync-parts` para verificar consistência com a série inteira
5. Atualize a tabela de Roadmap neste README

---

*Série desenvolvida para o time de engenharia da [Ubivis](https://ubivis.com).*
