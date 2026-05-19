# Plano · Part 11 · Memória Viva · RAG Local + Reflect

## Context

A série Engineering Hour já tem 10 lições publicadas. P2 ensinou **o que** é memória de IA (4 tipos: User/Feedback/Project/Reference, MEMORY.md, frontmatter YAML, curadoria humana). Mas a abordagem do P2 tem um teto: ao escalar para 200+ arquivos `.md`, o startup carrega tudo, contexto explode, e a captura de conhecimento continua 100% manual.

P11 fecha esse gap em duas frentes:

1. **RAG local com QMD** (github.com/tobi/qmd): a IA não carrega memória, ela **consulta sob demanda** via hybrid search (BM25 + vector + LLM rerank), tudo offline. Startup volta a ~600 tokens.
2. **Reflect** (sistema do Paulo em cima do QMD): captura automática de lições no fim de cada sessão, governança via lifecycle (`stage → graduate → reject` com `--rationale` obrigatório), e daemon auto-learn rodando phi4-mini local.

O draft atual de [part11.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/part11.html) (309 linhas) é placeholder genérico sobre RAG, sem i18n, sem shared files, sem footer padrão, sem o ângulo reflect. Vamos reescrever inteiro mantendo só a animação `search-pulse`.

Profundidade alvo: **~1300 linhas, 9 seções** (alinhado com P10).

---

## Identidade da Sessão

| Campo | Valor |
|---|---|
| Título | **Memória Viva · RAG Local + Reflect** |
| Subtítulo (header) | "Módulo 11 · Da memória estática à memória que aprende sozinha" |
| Header emoji | `🧠` |
| Accent color | **Blue `#2563eb`** (Tailwind blue-600) |
| Light fill | `#eff6ff` |
| Border | `#93c5fd` |
| Mantra de fechamento | "A IA não precisa lembrar tudo. Precisa lembrar o que importa, e você precisa decidir o que importa." |

Cor validada: distinta de Sky Blue P1 `#0284c7` (mais cyan) e Indigo P7 `#4f46e5` (mais violet). Não conflita com Rose `#e11d48` dos anti-pattern cards.

---

## Estrutura das 9 Seções

Grupos de nav: **O CONCEITO** (1-2) · **NA PRÁTICA** (3-4) · **O TETO** (5) · **A EVOLUÇÃO** (6-7) · **LIMITES** (8) · **AÇÃO** (9).

### 1 · `problema` · O Problema da Memória Sempre Carregada
- P2 ensinou o quê. P11 ensina o como em escala. Não invalida P2, complementa.
- Em 200 arquivos `.md` curados, startup carrega 18k+ tokens antes da primeira pergunta.
- Pergunta de virada: "E se a IA **consultasse** memória sob demanda? E se aprendesse com cada sessão sem você reescrever os `.md`?"
- **Visual**: toggle "Memória Estática (Load All)" vs "Memória RAG (Query)" no mesmo cenário ("dev pergunta sobre timestamps"). Cards comparativos.

### 2 · `rag-fundamentos` · RAG em 90 Segundos
- 3 operações: **embed** (texto → vetor), **index** (vetor + texto → DB), **search** (query → vetor → top-k).
- Hybrid search = BM25 (lexical) + vetor (semântico) + rerank (LLM pequeno prioriza).
- "BM25 acerta termos. Vetor acerta intenção. Rerank acerta prioridade."
- **Visual**: diagrama 3 caixas `Query → [BM25 ∪ Vetor] → Rerank → Top-3`, com `search-pulse` reaproveitado no nó central.

### 3 · `qmd` · QMD · Seu RAG Local
- Stack: `embeddinggemma-300M-Q8_0` + `qwen3-reranker-0.6b` + SQLite FTS5 + sqlite-vec.
- Storage único: `~/.cache/qmd/index.sqlite`. 100% offline.
- Smart chunking ~900 tokens, 15% overlap, AST-aware para código.
- Expõe MCP server (gancho P5): `qmd mcp --http --port 8080`.
- **Visual**: tabela "Stack do QMD" 4 colunas + card destacado com path do storage + terminal mock.
- **Comandos reais validados** (todos da documentação do repo `tobi/qmd`):
  ```bash
  qmd collection add agent-memory ~/.agent/memory --mask "**/*.md"
  qmd embed agent-memory
  qmd search agent-memory "como serializar timestamps"
  qmd vsearch agent-memory "auth refresh flow"
  qmd query agent-memory "rate limit fastapi" --top 5
  qmd mcp --http --port 8080
  ```

### 4 · `memoria-estatica` · Memória Indexável · O `.agent/memory/`
- Estrutura tool-agnostic: `.agent/` em vez de `.claude/-only` (callback P6).
- Cursor, Warp, Claude Code apontam pro mesmo lugar.
- Layout: `.agent/memory/project/`, `brain/`, `lessons/`, `reflections/`.
- Formato obrigatório: YAML frontmatter (`topic`, `last_updated`, `tags`) + dense bullets.
- Regra: "Todo bullet precisa fazer sentido sozinho como fato pesquisável." Antes de escrever, `qmd search` pra não duplicar.
- **Visual**: árvore ASCII expansível do `.agent/memory/` + side-by-side "Prose-heavy ❌" vs "Dense-bullets ✅" com contagem de tokens.
- **Exemplo concreto**: arquivo `timestamps.md` completo com frontmatter (mostrar literalmente, não descrever).

### 5 · `limite-estatico` · O Teto da Memória Estática (virada da aula)
- Memória estática só registra o que **você** lembrou de escrever.
- 80% do conhecimento real fica órfão: bug consertado, decisão tomada, regra confirmada nascem no calor do trabalho.
- Cross-tool: Cursor não lê `.cursor/rules` quando você abre Warp. Conhecimento preso.
- Pergunta de virada: "E se a captura fosse automática?"
- **Visual**: chart "Conhecimento perdido vs capturado" (capturaChart) + diagrama "Manual capture vs Auto capture".

### 6 · `reflect` · Reflect · Memória que se Captura Sozinha
- Skill que roda no fim da sessão (gancho P7). ~2 minutos.
- 5 passos: lê STATE.md + git log → identifica 1-3 lições → `learn.py`/`stage.py` → escreve reflection file → `qmd-reindex.sh`.
- Reflection file < 20 linhas, dense bullets, never prose.
- Complemento: `conversation-digest` quando user diz "save what we discussed".
- **Visual**: 5 step cards horizontais com setas, card 4 destacado (output file).
- **Exemplo concreto**: reflection file `2026-05-19-jwt-rotation-bug.md` completo. **[TBD-1: pedir ao Paulo um reflect real anonimizável; fallback usa o exemplo fictício]**.

### 7 · `lifecycle` · Ciclo de Vida das Lições
- Routing por confidence: `high → learn.py` (graduate imediato), `medium → stage.py` (review queue), `low → skip`.
- Tooling: `learn.py`, `stage.py`, `recall.py`, `graduate.py`, `reject.py`, `reopen.py`, `list_candidates.py`, `show.py`.
- `--rationale` é **obrigatório** em graduate/reject. Não dá pra rubber-stamp.
- Auto-learn daemon: launchd `dev.brain.auto-learn` a cada 30min, phi4-mini via Ollama, extrai 0-3 lições.
- Post-commit hook escreve `pending-analysis.md`, processado na próxima sessão (não bloqueia commit).
- Memory-steward agent (gancho P8): curadoria periódica, audita stale, flagra contradições.
- **Visual**: decision tree Tailwind + tabela "Quem faz o quê" (Reflect | Auto-learn | conversation-digest | memory-steward) + 2 terminal mocks (`list_candidates.py` output, `recall.py` output com matches).

### 8 · `anti-patterns` · Anti-patterns da Memória Viva
5 pares `.antipattern-wrong` / `.antipattern-right` em grid `md:grid-cols-2`:
1. **Duplicar memória** sem `qmd search` antes → rerank degrada, chunks contraditórios.
2. **Memória prose-heavy** → chunker corta no meio de uma frase, embedding diluído.
3. **Graduate sem evidência** → `"evidence holds"` não é rationale; cite PR + arquivo de teste.
4. **Lock em tool-specific dir** (`.claude/memory/` em projeto multi-tool) → conhecimento preso.
5. **Reflect sem dedup** → 4 reflections dizendo a mesma coisa em palavras diferentes.

### 9 · `proximos-passos` · Próximos Passos · Comece em 4 Comandos
4 step cards numerados com botão copy real (`navigator.clipboard.writeText`):
- **Passo 1**: Instale QMD (`git clone https://github.com/tobi/qmd && ./install.sh`). **[TBD-2: confirmar install path oficial do repo tobi/qmd]**.
- **Passo 2**: Crie `.agent/memory/project/timestamps.md` (heredoc completo).
- **Passo 3**: `qmd collection add` + `qmd embed` + `qmd search`.
- **Passo 4**: Configure reflect skill, rode no fim da sessão.

Banner final com mantra + links "Voltar ao índice" e "Próxima sessão".

---

## Charts (2 Chart.js, lazy via `window.onNavigate`)

### A · `efficiencyChart` (Seção 1) · Line dual-dataset
- Labels: `['Sessão 1', 'Sessão 5', 'Sessão 20', 'Sessão 50', 'Sessão 100']`
- Y: "Tokens carregados no startup (k)"
- "Memória estática (load all)" `[18, 22, 35, 62, 95]` rose `#dc2626`
- "Memória com RAG (query)" `[3, 3, 3, 4, 4]` blue `#2563eb`

### B · `capturaChart` (Seção 5) · Horizontal bar dual-dataset
- Labels Y: `['Bug fix raciocinado', 'Decisão arquitetural', 'Convenção descoberta', 'Trade-off discutido', 'Workaround temporário']`
- X: "% capturado em memória durável"
- "Captura manual" `[15, 30, 20, 10, 5]` slate `#94a3b8`
- "Captura via reflect" `[85, 90, 75, 65, 20]` blue `#2563eb` (workaround baixo de propósito, não vira lição)

Ambos com `i18n:applied` listener para troca de labels PT/EN.

---

## Arquivos a Modificar (Phase 1 · scaffold PT-BR)

| Arquivo | Ação |
|---|---|
| [part11.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/part11.html) | **Rewrite completo**. Trocar tailwind config `neural.{...}` por `accent: { blue: '#2563eb', light: '#eff6ff', border: '#93c5fd' }`. Header emoji 🔍 → 🧠. Adicionar `nav.js`, `i18n.js`, `shared.css` no `<head>`. Remover `navigate()` inline. Adicionar session-complete + footer padrão. Todo texto com `data-i18n` ou `data-i18n-html` (exceto dentro `<pre>`). Manter animação `search-pulse`. |
| [index.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/index.html) | Criar card individual P11 `<a href="part11.html">` accent `#2563eb`, badge "Módulo 11", título "Memória Viva · RAG Local + Reflect". Reduzir placeholder "Módulos 11-15" para "12-15". Atualizar hero counter 10→11 disponíveis, 5→4 em breve. |
| [.claude/memory/project_sessions.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/memory/project_sessions.md) | Append bloco "## P11 · Memória Viva · RAG Local + Reflect | Blue `#2563eb`" com bullets sobre seções, mantra, charts. |
| [.claude/memory/project_conventions.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/memory/project_conventions.md) | Adicionar linha na tabela de cores: `\| P11 \| Blue \| #2563eb \|`. |
| [CLAUDE.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/CLAUDE.md) | Status `part11.html` `📝 draft` → `✅`, título atualizado, paleta atualizada. |

**Nenhum arquivo fora de [/Users/griiettner/Projects/ubivis/ai-engineering-hour/](/Users/griiettner/Projects/ubivis/ai-engineering-hour/)** (regra CLAUDE.md).

## Phase 2 · Tradução (pendente até "go" humano)

| Arquivo | Ação |
|---|---|
| `locales/en/part11.json` | Criar com todas as chaves `data-i18n`/`data-i18n-html`, traduzidas natural (não literal). |
| `locales/en/index.json` | Adicionar bloco `card.p11.*` + ajustar `hero.available`/`hero.upcoming`. |

Não duplicar chaves de `common.json` (footer, complete, header.subtitle).

---

## Fontes Canônicas (referência durante implementação)

- [.claude/memory/agent-brain-system.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/memory/agent-brain-system.md) · arquitetura completa do `.agent/`, reflect, lifecycle, services
- [.claude/memory/agent-brain-pieces.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/memory/agent-brain-pieces.md) · snippets reais de scripts e skill prompts
- [.claude/commands/new-part.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/commands/new-part.md) · template HTML, checklist, i18n key naming
- [part10.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/part10.html) · referência de estilo (pipeline-nodes, charts, mantra banner, antipatterns)
- https://github.com/tobi/qmd · API oficial do QMD (não inventar comandos)

---

## TBDs (input do Paulo antes do scaffold final, ou fallbacks)

- **TBD-1** · Reflection file de exemplo na Seção 6: pedir um caso real anonimizável. Fallback: usar o `jwt-rotation-bug.md` fictício esboçado no plano.
- **TBD-2** · Install path oficial do QMD na Seção 9 (Passo 1). Fallback: comando genérico de clone + `./install.sh`.
- **TBD-3** · Confirmar se há `qmd reindex` nativo ou se reindex é sempre via `.agent/engine/bin/qmd-reindex.sh`.

Esses TBDs não bloqueiam o scaffold. Podem ser ajustados na revisão.

---

## Verificação (após Phase 1, antes de pedir tradução)

Sequência manual no browser:

1. Abrir `file:///Users/griiettner/Projects/ubivis/ai-engineering-hour/part11.html`.
2. Header sticky: rolar página, confirmar gruda no topo, emoji 🧠 visível.
3. Nav sidebar: clicar nas 9 seções; confirmar:
   - Active state aplica `border-left: 4px solid #2563eb`
   - Uma seção visível por vez
   - Hash URL atualiza (`#problema`, `#rag-fundamentos`...)
   - Refresh com hash mantém a seção
4. Charts: navegar Seção 1, validar `efficiencyChart` (line vermelha vs azul); navegar Seção 5, validar `capturaChart` (horizontal bar). Confirmar lazy-init não dispara 2x.
5. Toggle Seção 1: alternar entre "Static Load"/"RAG Query", conteúdo troca.
6. Copy buttons (seções 3, 4, 6, 7, 9): clicar, validar clipboard tem o texto exato, feedback "Copiado!" aparece ~1.5s.
7. i18n PT/EN: switcher aparece no header (auto-injetado). Trocar para EN: textos da P11 ficam fallback PT (porque `part11.json` não existe ainda), comum (footer/complete) traduz. **Não pode quebrar**. Refresh persiste `eh_lang`.
8. Session complete: chegar na seção 9, banner 🎉 aparece.
9. Footer: presente, link real para o repo GitHub.
10. `index.html`: card P11 mostra "Disponível", link funciona, hero counter `11 / 4`.

Sem servidor, sem build. `file://` resolve tudo.
