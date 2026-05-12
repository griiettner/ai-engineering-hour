# Plano · P10 · TDD com IA · Testes Como Contrato

## Contexto

Depois de P9 entregar a teoria da composição (Hooks + Memory + Agents + Skills + Plans + MCP trabalhando juntos), P10 aterriza tudo na prática de engenharia mais demandada: **testes automatizados gerados e mantidos com IA**.

A sessão precisa enfrentar o problema mais comum: IA gera testes que sempre passam (test theater), mocks que escondem bugs, cobertura inflada sem confiança real. O objetivo é mostrar como inverter a dinâmica: usar testes como contrato/especificação que a IA precisa cumprir, não como prova post-hoc de que algo "funciona".

**Mantra:** "Testes não provam que o código funciona. Especificam o que ele deve fazer."

**Cor:** Lime `#65a30d` (distinta de Gov Emerald `#065f46` da P3)
**Slug accent Tailwind:** `tdd-lime`
**Emoji header:** 🧪

## Abordagem

### Arquivo

- Novo: `part10.html` (slot já liberado pelo shift +1 dos drafts antigos)
- Modificar: `index.html` (atualizar card P10 de "em breve" para "available")
- NÃO criar `locales/en/part10.json` nesta fase (Fase 2, após aprovação humana, veja [[feedback-translation-workflow]])

### Estrutura de navegação (7 seções, 4 grupos)

```
O Conceito
├── paradoxo      🎭  O Paradoxo do Teste com IA
└── inversao      🔄  Inversão Red-Green

Na Prática
├── pipeline      🔗  Pipeline TDD Integrado
└── mocks         🎭  Mocks vs Realidade

Limites
└── antipatterns  ⚠️  Anti-patterns

Impacto
└── metricas      📊  Confiança Real vs Cobertura

Ação
└── proximos      🚀  Próximos Passos
```

IDs pareados: `id="nav-<slug>"` + `id="sec-<slug>"`. Nav usa `nav.js`, sem `navigate()` inline. Hook `window.onNavigate` para lazy-init de charts.

### Detalhamento das seções

#### 1. `paradoxo` · O Paradoxo do Teste com IA
**Objetivo:** quebrar a falsa segurança de cobertura alta.

**Conteúdo:**
- Frase de abertura: pedir para IA gerar testes resulta em testes que validam o que o código já faz, não o que o código deveria fazer
- 2 cards lado-a-lado:
  - "Cobertura ≠ Confiança" · 95% de cobertura com mocks vazios e asserções tautológicas
  - "Tests as Spec" · 60% de cobertura com testes que falham quando você quebra o contrato

**Elemento interativo:** toggle "Teste pós-código" vs "Teste como spec"
- Mostra o mesmo pedaço de código JS/Python com 2 testes gerados
- Toggle pós-código: `expect(result).toBeDefined()` + mock everything
- Toggle como spec: `expect(parseDate('2026-02-30')).toThrow(InvalidDateError)` + casos de borda

**Chart.js:** linha dupla `paradoxoChart`
- Eixo X: tempo (sprints 1-10)
- Linha 1 vermelha: "Cobertura % gerada por IA" (cresce até 95%)
- Linha 2 lime: "Bugs em produção" (não cai junto, fica plana)
- Title: "Cobertura sobe, mas regressões continuam"

#### 2. `inversao` · Inversão Red-Green
**Objetivo:** mostrar a inversão do red-green-refactor clássico quando IA entra na equação.

**Conteúdo:**
- Diagrama em 3 colunas:
  - Tradicional: Humano escreve teste vermelho → humano implementa código → humano refatora
  - IA gerando teste após código: IA escreve código → IA escreve teste verde → 0 valor
  - **Recomendado:** Humano escreve teste vermelho (define contrato) → IA implementa para passar → humano revisa código gerado

**Elemento interativo:** 3 tabs de prompts reais
- Tab "Anti-pattern": `"Gere testes para esta função"` (IA inventa cenários)
- Tab "Ok": `"Gere testes que cubram null, vazio, valor inválido"` (cobre borda mas só do que IA vê)
- Tab "Bom (test-as-spec):"
  ```
  Estou implementando parseDate(input: string). Os seguintes testes
  precisam passar (não altere a especificação):

  - parseDate('2026-05-12') retorna Date(2026, 4, 12)
  - parseDate('2026-02-30') lança InvalidDateError com mensagem 'day out of range'
  - parseDate('') lança InvalidDateError com mensagem 'empty input'
  - parseDate('not a date') lança InvalidDateError

  Implemente parseDate. Não modifique os testes. Se algum teste parecer
  errado, pergunte antes de prosseguir.
  ```

**Copy button** real (`navigator.clipboard.writeText`) em cada tab.

#### 3. `pipeline` · Pipeline TDD Integrado
**Objetivo:** mostrar testes participando do sistema integrado de P9.

**Conteúdo:** diagrama de fluxo animado, 5 nós conectados:
```
[1] Write/Edit (IA escreve código)
       ↓
[2] PostToolUse hook → roda testes
       ↓
[3] Testes falham → exit 1 + stderr
       ↓
[4] Agente "test-fixer" lê o erro, corrige código (não o teste!)
       ↓
[5] Hook roda de novo → exit 0 → Memory grava o padrão
```

**Code block real** (`.claude/settings.json`):
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/run-tests.sh \"$TOOL_INPUT\""
          }
        ]
      }
    ]
  }
}
```

**Code block hook** (`.claude/hooks/run-tests.sh`):
```bash
#!/usr/bin/env bash
file_path="$1"
case "$file_path" in
  *.test.ts|*.spec.ts) npm test --silent -- "$file_path" ;;
  *_test.py|test_*.py) pytest -q "$file_path" ;;
  *) exit 0 ;;
esac
```

**Memory snippet** (`feedback_tests.md`):
```markdown
---
name: feedback-tests
description: Testes deste projeto sempre batem em PostgreSQL real, nunca em mocks
type: feedback
---

Why: incidente em 2026-03 onde teste com mock validou query SQL que falhou em prod.
How to apply: ao escrever testes, usar testcontainers-python para subir Postgres.
```

#### 4. `mocks` · Mocks vs Realidade
**Objetivo:** mostrar quando mockar é OK e quando é traição.

**Conteúdo:** 3 tabs alinhados em pirâmide invertida (mais real → mais mockado)
- **Contract test** (topo, mais valor): exemplo com Pact ou schema-based, valida que a API real cumpre o contrato
- **Integration test** (meio): usa Postgres real via testcontainers, valida a query de verdade
- **Unit test** (base, mais barato mas menos valor): mocka tudo, só serve para lógica pura sem I/O

**Tabela comparativa:**
| Tipo | O que prova | Quando usar | Quando NÃO |
|------|-------------|-------------|------------|
| Unit | Lógica pura | Funções determinísticas sem I/O | Quando há SQL, HTTP, sistema de arquivos |
| Integration | Componentes reais juntos | Camada de dados, API local | Quando o problema é só lógica |
| Contract | API externa cumpre o contrato | Integração com serviço de terceiros | Quando você controla os dois lados |

#### 5. `antipatterns` · Anti-patterns
**Objetivo:** catálogo das 4 armadilhas mais comuns.

**Conteúdo:** 4 cards `.antipattern-wrong` / `.antipattern-right`:

1. **Tautologia** · `expect(true).toBe(true)` · prove nada, só satisfaz o coverage
2. **Mock-everything** · todo módulo mockado, teste testa o mock
3. **Snapshot-only** · `toMatchSnapshot()` sem nenhuma asserção semântica
4. **Happy-path only** · 1 teste por função, sempre com inputs válidos

Cada anti-pattern card mostra: código errado (vermelho) + código certo (verde) + comentário explicando o porquê.

#### 6. `metricas` · Confiança Real vs Cobertura
**Objetivo:** dar argumento para defender TDD-first com IA em revisões e métricas.

**Chart.js:** bar chart horizontal `metricasChart`, 3 grupos de comparação
- Eixo Y: ["Tempo até bug em prod", "Confiança no refactor", "Bugs detectados antes de merge"]
- Dataset 1 (cinza): "Cobertura sem TDD"
- Dataset 2 (lime): "TDD-first com IA"
- Números fictícios mas plausíveis (cite que são ilustrativos, não benchmark real)

**Insight card** abaixo do gráfico: "Cobertura é uma métrica de implementação. Bugs evitados é uma métrica de produto. Os dois não estão correlacionados, escolha a segunda."

#### 7. `proximos` · Próximos Passos
**Objetivo:** checklist acionável.

**Step cards** (4 passos com `.step-number`):

1. **Comece pelo contrato** · Antes de pedir código para a IA, escreva os 3-5 cenários de borda mais importantes como testes
2. **Configure o hook** · Crie `.claude/hooks/run-tests.sh` e registre como `PostToolUse` para `Write|Edit`
3. **Salve padrões na memória** · Quando o time decidir "todos os testes de auth usam testcontainers", grave como `feedback_tests.md` em `.claude/memory/`
4. **Audite seus testes existentes** · Use um agente para procurar tautologias, mock-everything e snapshot-only no test suite

**Mantra de fechamento** (no card escuro): "Testes não provam que o código funciona. Especificam o que ele deve fazer."

### Convenções de implementação

- **Tailwind config:** adicionar `tdd: { lime: '#65a30d', emerald: '#059669', red: '#dc2626' }` no extends
- **CSS custom prop:** `:root { --accent: #65a30d; }` para que `shared.css` herde
- **Charts:** lazy-init via `window.onNavigate('paradoxo'|'metricas')`, flags `window.paradoxoInit` e `window.metricasInit`
- **i18n.js listener** para os 2 charts atualizarem labels ao trocar idioma
- **Sem em dash** em nenhum lugar do arquivo (validar antes de commitar, veja [[feedback-no-emdash]])
- **Português brasileiro** em tudo visível, código/identifiers em inglês
- **Verificar refs técnicas reais** antes de escrever (veja [[feedback-content]]): `PostToolUse` matcher syntax, exit codes de hooks, formato `.claude/hooks/*.sh`

### Anotações i18n (Fase 1, sem JSON)

Toda string visível recebe `data-i18n="<key>"` ou `data-i18n-html="<key>"`:
- `header.subtitle` (Módulo 10: ...)
- `nav.group.{concept,practice,limits,impact,action}`
- `nav.{paradoxo,inversao,pipeline,mocks,antipatterns,metricas,proximos}`
- `sec.paradoxo.{h2,intro,toggle.a,toggle.b,card.coverage.title,card.coverage.desc,card.spec.title,card.spec.desc}`
- `sec.inversao.{h2,intro,tab.bad,tab.ok,tab.good,prompt.good.text}`
- `sec.pipeline.{h2,intro,step.1,step.2,step.3,step.4,step.5,memory.note}`
- `sec.mocks.{h2,intro,tab.unit,tab.integration,tab.contract,table.col.*}`
- `sec.antipatterns.{h2,intro,card.{1..4}.title,card.{1..4}.wrong,card.{1..4}.right,card.{1..4}.why}`
- `sec.metricas.{h2,intro,insight.title,insight.desc}`
- `sec.proximos.{h2,step.{1..4}.title,step.{1..4}.desc,mantra}`
- `chart.paradoxo.{title,label.coverage,label.bugs}` · `chart.metricas.{label.{1..3},dataset.before,dataset.after}`
- Shared (já em `common.json`): `complete.{title,desc,home}`, `footer.{brand,stack,tagline}`

**Nunca anotar dentro de `<pre>` blocks.** Emoji em span separado do texto traduzível.

### Elementos interativos obrigatórios

1. Toggle no `paradoxo` (estado em JS local, não persiste)
2. Tabs no `inversao` com 3 prompts + 3 copy buttons reais
3. Tabs no `mocks` com 3 níveis de teste
4. 2 charts (Chart.js): `paradoxoChart` (line) e `metricasChart` (horizontal bar)
5. Copy buttons em todos os code blocks de configuração

## Multi-Agent Pipeline

Esta sessão NÃO precisa do pipeline i18n completo. O fluxo é:

1. **Eu (Claude)** escrevo o `part10.html` completo seguindo o plano
2. **Humano (Paulo)** revisa o conteúdo PT-BR, itera até estar satisfeito
3. **Humano** dá luz verde ("translate" / "finish")
4. **Eu** crio `locales/en/part10.json` e atualizo `locales/en/index.json` (Fase 2)
5. **Humano** roda `/sync-parts` ou `/review-part` para validar consistência

## Critical Files

| Arquivo | Ação | Notas |
|---------|------|-------|
| `part10.html` | **Criar** | Seguindo o esqueleto de `/new-part` + a estrutura deste plano |
| `index.html` | **Modificar** | Atualizar card P10 de "em breve" para "available" com link `part10.html` |
| `locales/en/part10.json` | **Não criar agora** | Fase 2, após aprovação humana |
| `locales/en/index.json` | **Não criar agora** | Fase 2 |
| `.claude/memory/project_sessions.md` | **Atualizar** | Mover P10 de "Em discussão" para "Concluídas" após aprovação humana |
| `.claude/memory/project_conventions.md` | **Atualizar** | Confirmar Lime `#65a30d` na tabela de paleta |
| `README.md` | **Atualizar** | Trocar `*(slot reservado)*` por descrição real da P10 |

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Conteúdo sobrepor com P4 (Hooks) | Pipeline TDD usa hooks como tijolo, não os explica de novo, só linka para P4 |
| Conteúdo sobrepor com P2 (Memória) | `feedback_tests.md` na seção pipeline mostra aplicação, não explica memória |
| Mocks vs realidade ficar abstrato | Tabela com 3 tipos + 3 exemplos de código reais (Pact, testcontainers, jest mock) |
| Anti-pattern de tautologia ser óbvio | Acompanhar com snapshot-only e mock-everything, que são menos óbvios |
| Métricas inventadas perderem credibilidade | Card explícito dizendo "valores ilustrativos para discussão, não benchmark" |

## Verificação

Antes de marcar a Fase 1 como concluída:

- [ ] `part10.html` abre direto no browser sem console errors
- [ ] Nav lateral mostra 4 grupos com 7 itens
- [ ] Hash navigation funciona (`part10.html#pipeline` abre direto na seção)
- [ ] Toggle de `paradoxo` alterna estados sem reload
- [ ] Tabs de `inversao` e `mocks` alternam corretamente
- [ ] 3 copy buttons copiam texto real (testar no DevTools)
- [ ] `paradoxoChart` inicializa ao navegar para `paradoxo`
- [ ] `metricasChart` inicializa ao navegar para `metricas`
- [ ] Última seção (`proximos`) dispara o banner "Sessão concluída"
- [ ] Botão "Voltar ao índice" volta para `index.html`
- [ ] Switcher PT|EN aparece no header (auto-injetado por `i18n.js`)
- [ ] Trocar para EN mostra fallback silencioso para PT-BR (porque ainda não há JSON)
- [ ] `grep "—" part10.html` retorna vazio (zero em dashes)
- [ ] `grep "Ubivis" part10.html` retorna vazio
- [ ] `index.html` mostra P10 como disponível (card sem `.upcoming`)
- [ ] `locales/en/part10.json` NÃO existe ainda
