---
name: project-conventions
description: Paleta de cores, componentes HTML/CSS recorrentes, estrutura de nav, i18n patterns e regras de conteúdo usadas em todos os partN.html
metadata:
  type: project
---

## Layout
- Body: `bg-stone-50` (`#fafaf9`), texto `stone-800` (`#292524`)
- Header sticky + sidebar nav (`md:w-64`, `sticky top-24`) + main (`flex-1`, `bg-white`, `rounded-xl`)
- Container: `max-w-7xl`

## Head structure
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Engineering Hour P{N}: {Subtitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="nav.js" defer></script>
    <script src="i18n.js" defer></script>
    <script>tailwind.config = { ... }</script>
    <link rel="stylesheet" href="shared.css">
    <style>/* custom CSS */</style>
</head>
```

## Navegação
- Grupos com `.nav-group-label` (uppercase, `text-stone-400`)
- Mínimo de 3 grupos por part
- Active state: `border-left: 4px solid <cor-da-parte>` + `bg-stone-200` (`#e7e5e4`)
- Função `navigate(sectionId)` controla visibilidade via `hidden`/`block`
- IDs sempre pareados: `id="nav-X"` + `id="sec-X"`
- Last section triggers `session-complete` banner visibility

## Componentes
- **Step cards**: `flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm` + `.step-number` (círculo 2rem, bg cor-da-parte, texto branco)
- **Code blocks**: `background: #1c1917`, violet = chaves, emerald = strings/valores, blue = props, orange = booleans
- **Copy buttons**: `navigator.clipboard.writeText()` real, nunca simulado
- **Anti-patterns**: `.antipattern-wrong` (`border-left: 4px solid #e11d48`) / `.antipattern-right` (`border-left: 4px solid #059669`)
- **Charts**: Chart.js lazy-init (só inicializa ao navegar para a seção, flag `window.xyzInit`)
- Toda part precisa ter: Limites & Cuidados + Próximos Passos + ao menos 1 elemento interativo

## Paleta de cores por parte (atualizada 2026-05-19)
| Parte | Cor | Hex |
|-------|-----|-----|
| P1 | Sky Blue | `#0284c7` |
| P2 | Cyan | `#0891b2` |
| P3 | Gov Emerald | `#065f46` |
| P4 | Violet | `#6d28d9` |
| P5 | Teal | `#0d9488` |
| P6 | Orange | `#ea580c` |
| P7 | Indigo | `#4f46e5` |
| P8 | Fuchsia | `#c026d3` |
| P9 | Amber | `#d97706` |
| P10 | Lime | `#65a30d` |
| P11 | Blue | `#2563eb` |

Novas partes escolhem cor distinta das anteriores e documentam aqui.

## i18n annotations
- All user-visible text must have `data-i18n="key"` or `data-i18n-html="key"` attributes
- Keys use flat dot notation: `sec.{section}.{element}`, `nav.{item}`, `chart.{name}`
- Never annotate inside `<pre>` blocks
- Emoji spans separate from text spans: `<span>🚀</span> <span data-i18n="key">Text</span>`
- Chart labels translated via `i18n:applied` event listener
- Shared keys (footer, complete, header) go in `common.json`; page-specific keys in `partN.json`

## Regras de conteúdo
- Todo texto visível em Português Brasileiro, código/identifiers em inglês
- Nenhuma seção sem exemplo concreto de código ou caso de uso real
- Referências técnicas sempre verificadas (paths reais, eventos reais, chaves reais da API)
- Mantra de fechamento sempre preserva julgamento humano
- Gráficos com labels reais (cenários), nunca "Task 1, Task 2"
- No reference to "Ubivis", this is a personal project by Paulo Griiettner
- **Nunca usar em dash** em nenhum arquivo (veja [[feedback-no-emdash]])
- Usar `/review-part` antes de implementar mudanças em qualquer part
- Manter consistência visual entre todas as parts (rodar `/sync-parts` se mudar padrão)
