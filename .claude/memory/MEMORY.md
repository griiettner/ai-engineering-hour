# Engineering Hour — Memória do Projeto

## O que é
Série de apresentações SPA (HTML + Tailwind + Chart.js) para developers da Ubivis.
Cada `partN.html` é independente. Sem build system. Aberto direto no browser.

---

## Parts concluídas

| Part | Cor principal | Seções | Mantra |
|------|--------------|--------|--------|
| **part1.html** | `accent-blue` #0284c7 | Ferramentas, Contexto, Guardrails (3 tabs), Trio Essencial, Anti-patterns, Workflow (5 passos), Próximos Passos | — |
| **part2.html** | `gov-emerald` #065f46 | Maturação (radar chart), A Constituição, Ritual Plan.md, Estratégia vs Código, Limites & Cuidados, Próximos Passos | "Aprovamos estratégias, não linhas de código." |
| **part3.html** | `auto-violet` #6d28d9 | Ciclo Autônomo, Tipos de Hooks, Configuração, Limites & Cuidados, Métricas, Novo Code Review, Próximos Passos | "A máquina valida o que é verificável. Você julga o que é intencional." |
| **part4.html** | `mcp-teal` #0d9488 | Fim das Alucinações (bar chart), Ecossistema MCP (4 cards), Arquitetura, Debugging em Tempo Real (3 passos + reset), Limites & Cuidados, Próximos Passos | "O MCP transforma a IA de uma enciclopédia estática em um membro do time..." |
| **part5.html** | `safety-orange` #ea580c | O Incidente Real (toggle sem/com guardrails), A Pasta .claude (árvore interativa), CONSTITUTION.md (4 tabs), CLAUDE.md como Índice, Hooks & Permissões, MCP/Skills/Comandos, Limites & Cuidados, Próximos Passos | "Guardrails não tornam a IA segura. Eles tornam os seus limites explícitos." |

---

## Parts pendentes (existem mas não foram revisadas)

- **part6.html** — (era part5) AI Review & Skills
- **part7.html** — (era part6) Multi-Agentes
- **part8.html** — (era part7) Orquestração
- **part9.html** — (era part8) Memória RAG
- **part10.html** — (era part9) n8n & OpenClaw
- **part11.html** — (era part10) Dev Sênior do Futuro
- **part12.html** — (era part11) Governança e Segurança
- **part13.html** — (era part12) Métricas e ROI
- **part14.html** — (era part13) A Próxima Fronteira

---

## Pasta demo/ — arquivos reais para apresentação

Estrutura criada em `demo/` para mostrar ao time durante a Part 5:

```
demo/
├── CLAUDE.md                          → roteador mínimo com @import
└── .claude/
    ├── settings.json                  → referencia hooks por caminho, MCP servers
    ├── hooks/
    │   └── block-destructive.sh       → script comentado, chmod +x
    ├── rules/
    │   ├── CONSTITUTION.md            → regras inegociáveis completas (6 categorias)
    │   └── README.md                  → índice de roteamento de contexto
    ├── commands/                      → vazio (placeholder para skills)
    └── memory/                        → vazio (placeholder para memória da IA)
```

Todos os arquivos têm aviso `⚠️ DEMO` no topo.
Hooks ficam em `.claude/hooks/` como scripts separados — não inline no `settings.json`.

---

## Estrutura .claude recomendada (padrão estabelecido na Part 5)

```
.claude/
├── settings.json     → MCP servers + referências a hooks (não inline)
├── hooks/            → scripts .sh separados por responsabilidade
├── rules/            → CONSTITUTION.md + README.md + docs sob demanda
├── commands/         → skills customizadas *.md
└── memory/           → memória persistente da IA
Raiz: CLAUDE.md       → @import CONSTITUTION + aponta para rules/README.md
```

---

## Padrões visuais confirmados
Ver `CLAUDE.md` na raiz para referência completa de componentes.

Resumo rápido:
- Step cards: `flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm` + `.step-number`
- Nav com `.nav-group-label` separando seções em grupos lógicos (mín. 3 grupos por part)
- Code blocks dark com cores: violet=chaves, emerald=strings, blue=props, orange=booleans
- Copy buttons: `navigator.clipboard.writeText()` — nunca simular
- Toda part deve ter: Limites & Cuidados + Próximos Passos + ao menos 1 elemento interativo

## Decisões de conteúdo fixadas
- Hooks config: `PreToolUse`/`PostToolUse` + `matcher` + `hooks[]` em `.claude/settings.json`
- Lógica de hook vai em `.claude/hooks/*.sh` — não inline no JSON
- `autoFix: true` não existe na API de hooks — não usar
- CLI: "Claude Code / Gemini CLI" (não mencionar Codex)
- MCP: nunca dizer "alucinação zero" — reduz erros de *contexto factual*, não de raciocínio
- Config MCP fica em `.claude/settings.json` sob `mcpServers`
- CLAUDE.md deve ter menos de 30 linhas — só @import CONSTITUTION + roteamento

## Preferências do usuário
- Idioma: Português brasileiro no conteúdo visível; código/identifiers em inglês
- Não colocar nada em arquivos globais (`~/.claude/`) — tudo local ao projeto
- Hooks em scripts separados, não inline — facilita manutenção e leitura
- Usar `/review-part` antes de implementar mudanças em qualquer part
- Manter consistência visual entre todas as parts
