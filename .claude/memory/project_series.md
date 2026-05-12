---
name: projeto-engineering-hour
description: Série de 15 apresentações interativas sobre IA no desenvolvimento, contexto geral, stack, i18n e estrutura
metadata:
  type: project
---

Série de SPAs standalone em HTML + Tailwind CSS CDN + Chart.js CDN, projeto pessoal de Paulo Griiettner.
Cada sessão é um `partN.html` aberto direto no browser, sem build, sem servidor.
GitHub: https://github.com/griiettner/ai-engineering-hour

**16 parts total** (segunda inserção em 2026-05-12: slot novo aberto na posição 10, drafts antigos shiftaram para 11-16).

Histórico de renumerações:
- 2026-04-09: P2 "Memória de IA" inserida, série passou de 14 para 15 parts
- 2026-05-12: shift +1 nos drafts 10-15 para 11-16, slot 10 aberto para nova sessão

## Estado atual (verificado em 2026-05-12)
- **P1-P9 finalizadas** (700-1100 linhas cada, com i18n.js, nav.js, shared.css, locales EN completos, footer padrão)
- **P10** · slot aberto, candidato atual: `TDD com IA · Testes Como Contrato` (Lime `#65a30d`), aguardando scaffold
- **P11-P16 existem como drafts/scaffolds** (309-370 linhas cada): conteúdo placeholder, sem i18n annotations, sem shared files, sem footer padrão. Esqueletos que precisam ser refeitos antes de serem considerados prontos.

## Drafts existentes após shift (titulos atuais, sujeitos a revisão)
- P11 `Memória Avançada & Busca Local (RAG/qmd)` (era P10)
- P12 `n8n & OpenClaw` (era P11)
- P13 `O Dev Sênior do Futuro` (era P12)
- P14 `Governança e Segurança` (era P13)
- P15 `Métricas e ROI` (era P14)
- P16 `A Próxima Fronteira` (era P15)

Conteúdo canônico em Português Brasileiro. Código e identificadores técnicos em inglês.

## i18n
- Runtime: `i18n.js` (~180 lines, zero deps), injected as `<script src="i18n.js" defer>` in `<head>`
- Auto-detects browser language (`navigator.language`), falls back to `pt`, persists via `localStorage` key `eh_lang`
- Translations: `locales/{lang}/common.json` (shared) + `locales/{lang}/{page}.json` (per page)
- PT-BR is canonical (HTML text itself), no `locales/pt/` needed
- HTML attrs: `data-i18n="key"` (textContent) / `data-i18n-html="key"` (innerHTML)
- Never annotate inside `<pre>` blocks
- Emoji prefix pattern: wrap text in `<span data-i18n="key">`, leave emoji in separate span
- Key naming: flat dot notation, `sec.tools.h2`, `nav.group.fundamentals`
- Dispatches `i18n:applied` CustomEvent for Chart.js label updates
- Language switcher (PT | EN) auto-injected into header by i18n.js
- EN translations exist for P1-P9 (`locales/en/part1.json` through `part9.json`)

## Shared files
- `nav.js` · section navigation, hash sync, active state, session-complete trigger
- `shared.css` · nav styles, step numbers, code blocks, anti-patterns, charts
- `i18n.js` · language switching runtime

## Footer (all pages)
```html
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

## Demo folder (estabelecido na P6)
Estrutura criada em `demo/` para mostrar ao time durante as sessões:
```
demo/
├── CLAUDE.md                          → roteador mínimo com @import
└── .claude/
    ├── settings.json                  → referencia hooks por caminho, MCP servers
    ├── hooks/
    │   └── block-destructive.sh       → script comentado, chmod +x
    ├── rules/
    │   ├── CONSTITUTION.md            → regras inegociáveis completas
    │   └── README.md                  → índice de roteamento de contexto
    ├── commands/                      → placeholder para skills
    └── memory/                        → placeholder para memória da IA
```
Todos os arquivos têm aviso `⚠️ DEMO` no topo. Hooks ficam em `.claude/hooks/` como scripts separados, não inline no `settings.json`.

## Estrutura .claude recomendada (padrão estabelecido)
```
.claude/
├── settings.json     → MCP servers + referências a hooks (não inline)
├── hooks/            → scripts .sh separados por responsabilidade
├── rules/            → CONSTITUTION.md + README.md + docs sob demanda
├── commands/         → skills customizadas *.md
├── memory/           → memória persistente da IA (incluindo este MEMORY.md)
└── plans/            → planos do projeto
Raiz: CLAUDE.md       → @import CONSTITUTION + aponta para rules/README.md
```

## Automation
- `/new-part` · skill para scaffold de novas sessões (tem checklist de em dash)
- `/review-part` · skill para revisar sessões existentes
- `/sync-parts` · skill para verificar consistência entre parts

Veja também [[project-sessions]], [[project-conventions]], [[feedback-memory-location]].
