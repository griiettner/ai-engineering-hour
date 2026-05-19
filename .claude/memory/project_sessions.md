---
name: project-sessions
description: Temas, cores accent, mantras e decisões de conteúdo estabelecidas em cada sessão da série (renumerada 2026-04-09)
metadata:
  type: project
---

## P1 · Setup & Regras de Ouro | Sky Blue `#0284c7`
- IDE vs CLI (Claude Code / Gemini CLI, nunca "Codex CLI")
- Contexto: toggle "Poluído" [15,20,65] / "Limpo" [55,35,10]
- Guardrails em 3 tabs: CLAUDE.md / .cursorrules / copilot-instructions.md
- Copy buttons reais com `navigator.clipboard.writeText()`
- Trio Essencial, Anti-patterns, Workflow de 5 passos

## P2 · Memória de IA | Cyan `#0891b2` (inserida 2026-04-09)
- Pedido do grupo: nunca tinham visto sessão sobre memória de IA
- Toggle "Sem Memória" vs "Com Memória" com código simulado
- Chart.js: barras comparando tokens de contexto por conversa
- 4 tipos de memória: User, Feedback, Project, Reference (cada um com sample .md)
- Seção avançada: organização por subpastas com Skill + Agent
- Mantra: "A memória da IA é tão boa quanto a curadoria humana por trás dela."
- Inserção causou renumeração de todas as parts 2-14 para 3-15 (série agora tem 15 parts)

## P3 · Planejamento Avançado & Governança | Gov Emerald `#065f46`
- Maturação (radar chart), A Constituição, Ritual Plan.md
- Estratégia vs Código, Limites & Cuidados
- Mantra: "Aprovamos estratégias, não linhas de código."

## P4 · Claude Hooks & Confiança Automatizada | Violet `#6d28d9`
- Ciclo Autônomo, Tipos de Hooks, Configuração, Métricas, Novo Code Review
- Eventos reais: `PreToolUse`, `PostToolUse`, `Stop`, `Notification`
- Config real: `.claude/settings.json` (projeto) ou `~/.claude/settings.json` (global)
- `autoFix: true` não existe na API, nunca inventar chaves
- Hooks em scripts `.sh` separados, não inline no JSON
- Mantra: "A máquina valida o que é verificável. Você julga o que é intencional."

## P5 · Decisões Embasadas com MCP | Teal `#0d9488`
- Fim das Alucinações (bar chart), Ecossistema MCP (4 cards)
- Arquitetura, Debugging em Tempo Real (3 passos + reset), Limites & Cuidados
- Nunca dizer "alucinação zero" · MCP reduz erros de contexto factual, não de raciocínio
- Config MCP em `.claude/settings.json` sob `mcpServers`
- Mantra: "O MCP transforma a IA de uma enciclopédia estática em um membro do time..."

## P6 · Workspace Seguro & Guardrails | Orange `#ea580c`
- O Incidente Real (toggle sem/com guardrails)
- A Pasta .claude (árvore interativa)
- CONSTITUTION.md (4 tabs), CLAUDE.md como Índice
- Hooks & Permissões, MCP/Skills/Comandos
- CLAUDE.md deve ter menos de 30 linhas, só @import CONSTITUTION + roteamento
- Mantra: "Guardrails não tornam a IA segura. Eles tornam os seus limites explícitos."

## P7 · Skills & Comandos Slash | Indigo `#4f46e5`
- Skills vivem em `.claude/skills/<nome>/SKILL.md`
- Commands legados em `.claude/commands/<nome>.md` continuam funcionando
- Frontmatter YAML: `name`, `description`, `disable-model-invocation`, `context`, `agent`, `allowed-tools`
- Padrão Índice (Sub-Skills): SKILL.md como índice leve + arquivos detalhados

## P8 · Agentes, Sub-Agentes & Agent Teams | Fuchsia `#c026d3`
- Agente único, subagentes (contexto isolado), Agent Teams (EXPERIMENTAL, peer-to-peer)
- Custos: chat 1x, subagentes ~4x, agent teams ~15x
- Padrões: Plan Then Build (Rocklin), Ralph Loop (Osmani), Independent Review

## P9 · O Sistema Integrado | Amber `#d97706`
- Hooks + Memory + Agents + Skills + Plans + MCP trabalhando juntos
- Cenários reais de integração e receitas avançadas

## P10 · TDD com IA · Testes Como Contrato | Lime `#65a30d`
- Concluído em 2026-05-12 (Phase 1 + Phase 2)
- Mantra: "Testes não provam que o código funciona. Especificam o que ele deve fazer."
- 8 seções: Paradoxo (cobertura ≠ confiança), Inversão Red-Green, Pipeline TDD Integrado (PostToolUse hook), Mocks vs Realidade (pirâmide invertida), Anti-patterns (tautologia, mock-everything, snapshot-only, happy-path), Confiança vs Cobertura, Cucumber para Contratos Legíveis, Próximos Passos
- Endereça test theater, mocks que escondem bugs, inversão red-green com IA
- Conecta primitivas de P2/P4/P7/P8 num caso prático
- Seção Cucumber adicionada como "Sugestão" para colaboração com PM/QA não-tech
- Charts: paradoxoChart (dual-axis line, cobertura sobe / bugs constantes), metricasChart (horizontal bar, sem TDD vs TDD-first)
- Em 2026-05-12: arquivos partN.html de 10-15 shiftados para 11-16 para abrir o slot 10

## P11 · Memória Viva · RAG Local + Reflect | Blue `#2563eb`
- Concluído em 2026-05-19 (Phase 1)
- Mantra: "A IA não precisa lembrar tudo. Precisa lembrar o que importa, e você precisa decidir o que importa."
- 9 seções: Problema (load all vs query), RAG em 90s (embed/index/search + hybrid BM25 ∪ vector ∪ rerank), QMD (embeddinggemma-300M + qwen3-reranker-0.6b + SQLite FTS5 + sqlite-vec, MCP server), Memória Estática (`.agent/memory/` tool-agnostic, frontmatter YAML, dense bullets), Limite da Estática (virada da aula, conhecimento órfão), Reflect (skill end-of-session, 5 passos, reflection file dense), Lifecycle (high/medium/low routing, learn/stage/recall/graduate/reject, --rationale obrigatório, auto-learn launchd 30min, post-commit hook, memory-steward), Anti-patterns (5 pares), Próximos Passos (4 comandos)
- Charts: `efficiencyChart` (line dual, tokens carregados por sessão · estática vs RAG), `capturaChart` (horizontal bar dual, captura por tipo de lição · manual vs reflect)
- Complementa P2 (4 tipos de memória) sem repetir: foco em retrieval + auto-captura, não em curadoria estática
- Ganchos cruzados: P5 (MCP), P6 (`.agent/` vs `.claude/`), P7 (skills), P8 (memory-steward agent), P4 (post-commit hook)
- TBDs resolvidos com fallback: reflection file fictício (jwt-rotation-bug), apontar pro repo tobi/qmd, mostrar `qmd embed` + `qmd-reindex.sh`
- Stack referenciada: phi4-mini via Ollama localhost:11434, launchd labels `dev.qmd.mcp` / `dev.qmd.reindex` / `dev.brain.auto-learn`

## Drafts shiftados em 2026-05-12 (eram P10-P15, agora P11-P16)
- P12 `n8n & OpenClaw`
- P13 `O Dev Sênior do Futuro`
- P14 `Governança e Segurança`
- P15 `Métricas e ROI`
- P16 `A Próxima Fronteira`
