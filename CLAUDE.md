# Engineering Hour | AI-Augmented Developer Series

## Projeto
Série de apresentações interativas sobre uso de IA no desenvolvimento.
Cada `partN.html` é uma SPA standalone em HTML + Tailwind CSS + Chart.js.

---

## ⚠️ Localização de Arquivos (REGRA INEGOCIÁVEL)

**Tudo deste projeto vive em `.claude/` na raiz do projeto.** NUNCA em `~/.claude/`.

| O quê | Caminho correto | NUNCA usar |
|-------|-----------------|------------|
| Memory (MEMORY.md + suporte) | `/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/memory/` | `~/.claude/projects/-Users-griiettner-Projects-ubivis-ai-engineering-hour/memory/` |
| Plans (planos de implementação) | `.claude/plans/` | `~/.claude/plans/` |
| Agents (subagent definitions) | `.claude/agents/` | `~/.claude/agents/` |
| Commands (slash commands) | `.claude/commands/` | `~/.claude/commands/` |
| Settings | `.claude/settings.json` | `~/.claude/settings.json` |
| Hooks scripts | `.claude/hooks/` | `~/.claude/hooks/` |
| Skills (se houver) | `.claude/skills/` | `~/.claude/skills/` |

Esta regra **OVERRIDE** o comportamento default do sistema de auto-memory que tenta gravar em `~/.claude/projects/.../memory/`. Se o sistema sugerir o caminho global, ignore: escreva em `.claude/memory/` do projeto.

A única coisa que pode estar em `~/.claude/projects/.../` são os `.jsonl` de sessão (auto-gerados pelo Claude Code), que você NÃO deve criar nem deletar.

**Por que:** tudo do projeto fica versionado, portátil e visível ao GitHub. Nada do projeto pode viver fora do repositório.

---

## Arquivos
Status verificado em 2026-05-25 (17 parts total após inserir a nova P12 e renumerar os drafts finais):

| Part | Status | Tema |
|------|--------|------|
| `part1.html` | ✅ | Setup & Regras de Ouro |
| `part2.html` | ✅ | Memória de IA |
| `part3.html` | ✅ | Planejamento & Governança |
| `part4.html` | ✅ | Hooks & Confiança Automatizada |
| `part5.html` | ✅ | Decisões Embasadas com MCP |
| `part6.html` | ✅ | Workspace Seguro & Guardrails |
| `part7.html` | ✅ | Skills & Comandos Slash |
| `part8.html` | ✅ | Agentes, Sub-Agentes & Agent Teams |
| `part9.html` | ✅ | O Sistema Integrado |
| `part10.html` | ✅ | TDD com IA · Testes Como Contrato |
| `part11.html` | ✅ | Memória Viva · RAG Local + Reflect |
| `part12.html` | ✅ | Arquitetura Operacional para Agentes |
| `part13.html` | 📝 draft | n8n & OpenClaw |
| `part14.html` | 📝 draft | O Dev Sênior do Futuro |
| `part15.html` | 📝 draft | Governança e Segurança |
| `part16.html` | 📝 draft | Métricas e ROI |
| `part17.html` | 📝 draft | A Próxima Fronteira |
| `agents-structure.html` | ✅ | Docs standalone · Estrutura `.agents/` + `AGENT.md` |

Detalhes de cada sessão em `.claude/memory/project_sessions.md`.

## Stack
- **CSS**: Tailwind CSS via CDN (tailwindcss.com)
- **Charts**: Chart.js via CDN
- **Fontes**: Inter (sans), Fira Code (mono), carregadas pelo sistema
- **Sem build**: arquivos abertos direto no browser, sem bundler
- **Shared files**: `nav.js`, `i18n.js`, `shared.css` (incluir em toda part)

## Paleta de Cores
| Módulo | Cor | Hex |
|--------|-----|-----|
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
| P12 | Ink Blue | `#1f3a5f` |

Fundo body sempre `stone-50` (`#fafaf9`). Texto principal `stone-800` (`#292524`). Novas parts escolhem cor distinta e documentam aqui + em `.claude/memory/project_conventions.md`.

## Estrutura Padrão de Cada Part
```
header (sticky, bg-white, border-b)
  └─ logo + título + subtítulo do módulo

layout (max-w-7xl, flex md:flex-row gap-8)
  ├─ nav (md:w-64, sticky, bg-white, rounded-xl)
  │    ├─ nav-group-label (uppercase, text-stone-400)
  │    └─ nav-item buttons (active: border-left + bg-stone-200)
  └─ main (flex-1, bg-white, rounded-xl, p-6 md:p-8)
       └─ sections (hidden/block via nav.js)

session-complete (banner ao chegar na última seção)
footer (links, créditos)
```

Navegação é controlada por `nav.js` (compartilhado). Lógica específica da página vai em `window.onNavigate`.

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
Background `#1c1917`, cores: violet = chaves, emerald = strings/valores, blue = propriedades, orange = booleans.

### Anti-pattern Cards
- `.antipattern-wrong` · `border-left: 4px solid #e11d48` + bg-red-50
- `.antipattern-right` · `border-left: 4px solid #059669` + bg-emerald-50

### Copy buttons
Sempre `navigator.clipboard.writeText()` real, nunca simulado.

## Convenções de Conteúdo
- **Idioma**: Português brasileiro em todo o conteúdo visível, código/identifiers em inglês
- **Código inline**: `font-mono bg-stone-100 px-1 rounded text-xs`
- **Referências técnicas**: sempre usar nomes/paths reais, verificar docs antes de escrever
- **Hooks Claude Code**: eventos reais são `PreToolUse`, `PostToolUse`, `Stop`, `Notification`
- **Settings config**: `.claude/settings.json` (projeto) ou `~/.claude/settings.json` (apenas se for global do harness, NUNCA escrever sobre este projeto lá)
- **i18n**: toda string visível com `data-i18n` ou `data-i18n-html`, exceto dentro de `<pre>`
- **Mantra**: toda sessão fecha com frase que preserva o julgamento humano

## O que NÃO fazer
- **Nunca escrever em `~/.claude/`** nada relacionado a este projeto (veja regra no topo)
- **Nunca usar em dash** em nenhum arquivo (HTML, JSON, MD). Usar vírgula, dois-pontos, ponto, pipe (`|`) ou middle dot (`·`) conforme o contexto
- Não inventar chaves de config que não existem na API real (ex: `autoFix: true` não existe em hooks)
- Não usar `opacity-60/80` em cards só para "parecer desabilitado", use cores semânticas
- Não criar seções sem exemplos concretos de código ou casos de uso reais
- Não usar labels genéricas em gráficos ("Task 1, Task 2"), usar cenários reais
- Não referenciar "Ubivis" no conteúdo das parts, é um projeto pessoal de Paulo Griiettner
- Não criar `locales/en/partN.json` durante scaffold, é fase 2 (após aprovação humana)

## Decisões Estabelecidas
Decisões específicas por sessão (mantras, charts, configs) ficam em `.claude/memory/project_sessions.md`. Não duplicar aqui, esse arquivo é o índice de convenções gerais.
