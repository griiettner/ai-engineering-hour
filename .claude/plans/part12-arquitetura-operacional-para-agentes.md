# Plano · P12 · Arquitetura Operacional para Agentes

## Resumo

Criar uma nova sessão principal da série em `part12.html`, derivada de `agents-structure.html`, com foco operacional e formato didático completo no padrão das `partN.html`.

Para abrir espaço, aplicar renumeração completa dos módulos atuais a partir de `part12`:

- `part12` → `part13`
- `part13` → `part14`
- `part14` → `part15`
- `part15` → `part16`
- `part16` → `part17`

`agents-structure.html` permanece no repositório como página de referência complementar, não como substituto da nova sessão.

## Mudanças de implementação

- Criar a nova `part12.html` com estrutura padrão da série: header, sidebar com `nav.js`, seções didáticas, banner final e strings visíveis em PT-BR com `data-i18n` ou `data-i18n-html`.
- Reaproveitar o conteúdo de `agents-structure.html` como base conceitual, mas reorganizar em narrativa de sessão.
- Posicionar a sessão como continuação natural da trilha após memória viva e antes dos temas de automação, governança e ROI.
- Escolher uma nova cor de módulo ainda não usada e aplicá-la em accent, badges, nav active state e callouts.
- Renomear arquivos atuais:
  - `part12.html` atual para `part13.html`
  - `part13.html` atual para `part14.html`
  - `part14.html` atual para `part15.html`
  - `part15.html` atual para `part16.html`
  - `part16.html` atual para `part17.html`
- Atualizar referências internas afetadas pela renumeração:
  - `index.html`
  - `README.md`
  - `CLAUDE.md`
  - títulos e subtítulos internos das parts renumeradas
  - qualquer referência textual ou link hardcoded para `part12` a `part16`
- Manter `agents-structure.html` vivo, com ajuste opcional de links para apontar para a nova `part12` como versão guiada.

## Estrutura editorial recomendada

### 1. Por que arquitetura operacional importa

- Diferenciar agente "útil uma vez" de sistema de agentes sustentável
- Explicar custo de contexto, descoberta e manutenção
- Introduzir `.agents/` como sistema de registro

### 2. `.agents/` como layout canônico

- Explicar separação entre `memory`, `skills`, `tasks` e `tools`
- Mostrar bridges de compatibilidade por ferramenta
- Reforçar a tese "canônico + adapters"

### 3. Memory, skills e tasks

- `memory` como conhecimento durável e roteável
- `skills` como procedimento reutilizável
- `tasks` como história operacional por unidade de trabalho
- Mostrar exemplos reais de frontmatter e índices pequenos

### 4. Índices, sync e regenerabilidade

- Explicar por que `index.yaml` só funciona com tooling regenerável
- Cobrir sync de stubs, validação e prevenção de drift
- Reforçar descoberta barata e leitura seletiva

### 5. Anti-patterns operacionais

- `AGENT.md` como dump file
- editar bridge em vez do canônico
- misturar memória durável com histórico de task
- assumir simetria entre Claude, Codex e Cursor
- manter índices sem sync

### 6. Bootstrap recomendado

- Fechar a sessão com o fluxo recomendado usando `griiettner/agents-scaffolding`
- Mostrar clone, substituição de placeholders, definição de skills canônicas e regeneração de adapters

## Interfaces e conteúdo público

- Nova interface pública: `part12.html` passa a ser "Arquitetura Operacional para Agentes"
- Interface pública renumerada:
  - tema atual de `part12` passa a `part13`
  - tema atual de `part13` passa a `part14`
  - tema atual de `part14` passa a `part15`
  - tema atual de `part15` passa a `part16`
  - tema atual de `part16` passa a `part17`
- `index.html` deve refletir a nova ordem editorial sem ambiguidades de título, badge ou CTA
- `agents-structure.html` continua acessível como artefato complementar de referência

## Testes e validação

- Verificar que `index.html` abre cada card com o arquivo correto após a renumeração
- Validar navegação por hash e sidebar em `part12.html` com `nav.js`
- Confirmar que todas as strings visíveis da nova sessão usam i18n markers, exceto conteúdo em `<pre>`
- Revisar se títulos, badges e subtítulos das parts renumeradas batem com os novos números
- Rodar busca por `part12.html` a `part16.html` para garantir que não restaram referências quebradas
- Abrir localmente `index.html`, `part12.html`, `part13.html` e `part17.html` para checar layout, fluxo e links
- Revisar `agents-structure.html` para garantir que continua coerente como referência auxiliar

## Assunções e defaults

- A nova sessão será uma part madura, não um stub nem uma versão resumida
- O foco é operacional: scaffold, organização de contexto, lifecycle de tasks, compatibilidade entre ferramentas e automação regenerável
- `agents-structure.html` não será removido
- A renumeração é completa e sequencial até `part17`, sem manter duplicatas com a numeração antiga
- Não será criada tradução `locales/en/part12.json` nesta etapa
