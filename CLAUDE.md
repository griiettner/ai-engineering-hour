# Engineering Hour — AI-Augmented Developer Series

## Projeto
Série de apresentações interativas para developers da Ubivis sobre uso de IA no desenvolvimento.
Cada `partN.html` é uma SPA standalone em HTML + Tailwind CSS + Chart.js.

## Arquivos
- `part1.html` — Setup & Regras de Ouro (IDE vs CLI, Contexto, Guardrails, Trio, Anti-patterns)
- `part2.html` — Prompts & Contexto Avançado
- `part3.html` — Claude Hooks & Confiança Automatizada
- `part4-13.html` — módulos seguintes

## Stack
- **CSS**: Tailwind CSS via CDN (tailwindcss.com)
- **Charts**: Chart.js via CDN
- **Fontes**: Inter (sans), Fira Code (mono) — carregadas pelo sistema
- **Sem build**: arquivos abertos direto no browser, sem bundler

## Paleta de Cores
| Módulo    | Cor primária       | Classe Tailwind      |
|-----------|--------------------|----------------------|
| Part 1    | Sky Blue `#0284c7` | `accent-blue`        |
| Part 3    | Violet `#6d28d9`   | `auto-violet`        |
| Base      | Warm Stone         | `stone-*`            |

Fundo body sempre `stone-50 (#fafaf9)`. Texto principal `stone-800 (#292524)`.

## Estrutura Padrão de Cada Part
```
header (sticky, bg-white, border-b)
  └─ logo + título + subtítulo do módulo

layout (max-w-7xl, flex md:flex-row gap-8)
  ├─ nav (md:w-64, sticky, bg-white, rounded-xl)
  │    ├─ nav-group-label (uppercase, text-stone-400)
  │    └─ nav-item buttons (active: border-left + bg-stone-200)
  └─ main (flex-1, bg-white, rounded-xl, p-6 md:p-8)
       └─ sections (hidden/block via JS navigate())
```

## Componentes Recorrentes

### Step Cards (workflow / próximos passos)
```html
<div class="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm">
  <div class="step-number flex-shrink-0">N</div>
  <div class="flex-1">...</div>
</div>
```
`.step-number` = círculo 2rem, bg accent color, texto branco bold.

### Code Blocks
```html
<pre class="m-0 rounded-none border-0 font-mono text-sm leading-relaxed">
  <span class="text-violet-400">"chave"</span>: <span class="text-emerald-400">"valor"</span>
</pre>
```
Cores: violet = chaves, emerald = strings/valores, blue = propriedades, orange = booleans.

### Anti-pattern Cards
- `.antipattern-wrong` = `border-left: 4px solid #e11d48` + bg-red-50
- `.antipattern-right` = `border-left: 4px solid #059669` + bg-emerald-50

### Info Cards com detalhe
```html
<div id="node-info" class="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden">
  <div id="node-info-header" class="flex items-center gap-3 px-6 py-4 border-b bg-stone-50">
    icon | título | badge (ml-auto, rounded-full, bg-violet-100)
  </div>
  <div id="node-info-body" class="px-6 py-4 text-sm text-stone-600 leading-relaxed"></div>
</div>
```

## Decisões Estabelecidas

### Part 1
- Chart de contexto: 2 estados toggle ("Poluído" `[15,20,65]` / "Limpo" `[55,35,10]`)
- Copy buttons usam `navigator.clipboard.writeText()` (real, não simulado)
- CLI card: "Claude Code / Gemini CLI" (Codex era API deprecated, não CLI agente)
- Guardrails em 3 tabs: CLAUDE.md / .cursorrules / copilot-instructions.md

### Part 3
- Mantra: "A máquina valida o que é verificável. Você julga o que é intencional."
- Config real: `PostToolUse` com `matcher` e `hooks[]` em `.claude/settings.json`
- Não existe `autoFix: true` na API real dos hooks — remover se aparecer
- Setas `→` entre nós do ciclo + indicador de loop abaixo
- Badges dos nodes: "PostToolUse → Write|Edit", "Loop até exit 0"

## Convenções de Conteúdo
- **Idioma**: Português brasileiro em todo o conteúdo visível
- **Código inline**: usar `font-mono bg-stone-100 px-1 rounded text-xs`
- **Referências técnicas**: sempre usar nomes/paths reais (verificar antes de escrever)
- **Hooks Claude Code**: eventos reais são `PreToolUse`, `PostToolUse`, `Stop`, `Notification`
- **Arquivo de config**: `.claude/settings.json` (por projeto) ou `~/.claude/settings.json` (global)

## O que NÃO fazer
- Não inventar chaves de config que não existem na API real
- Não usar `opacity-60/80` em cards apenas para "parecer desabilitado" — use cores semânticas
- Não criar seções sem exemplos concretos de código ou casos de uso reais
- Não usar labels genéricas em gráficos ("Task 1, Task 2") — usar cenários reais
