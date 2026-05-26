# Plano · Documento Standalone · Estrutura `.agents/` + `AGENT.md`

## Contexto

Queremos escrever primeiro a **documentação operacional** de como organizar um repositório para agentes, sem amarrar isso a nenhuma aula específica ainda.

Esse documento deve ficar de pé sozinho, como artefato de referência que depois pode servir para:

- virar complemento de uma aula futura
- ser lido diretamente pelos alunos
- ser entregue para uma IA como base de scaffold e organização

[brain.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/brain.html) continua como um artefato separado e não faz parte deste escopo.

A referência concreta mais forte está no repositório `/Users/griiettner/Projects/personal/cortex`, onde:

- `AGENT.md` atua como **roteador de contexto mínimo**
- `.agents/memory/MEMORY.md` atua como **roteador de memória durável**
- `.agents/skills/`, `.agents/memory/` e `.agents/tasks/` concentram o trabalho real
- `index.yaml` e shards YAML organizam descoberta sem forçar leitura de tudo
- arquivos `.md` operacionais usam **YAML frontmatter no topo**

O objetivo desta nova página não é clonar o `cortex`, e sim **documentar o padrão genericamente**, mostrando exemplos de aplicação derivados dele.

## Tese da página

A mensagem central do documento deve ser:

**Um sistema de agentes escalável não começa por prompts longos. Ele começa por roteadores curtos, memória organizada, skills modulares, tarefas explícitas e indexação YAML.**

Também precisa deixar explícito:

- `AGENT.md` não é “a memória toda”; é a porta de entrada
- `.agents/` é uma estrutura operacional, não apenas uma pasta de prompts
- `skills`, `memory` e `tasks` são os três pilares mínimos
- todo arquivo de memória e tarefa que precise ser roteável deve começar com **YAML frontmatter**
- índices YAML existem para reduzir custo de contexto e evitar varrer a árvore inteira

## Decisão de implementação

Este plano passa a descrever **uma página HTML standalone**, dedicada a documentar a estrutura `.agents/` e o papel do `AGENT.md`.

Direção recomendada:

- novo arquivo com nome explícito, por exemplo `agents-structure.html`
- sem dependência de nenhuma aula no primeiro momento
- com possibilidade posterior de ser linkado a partir de uma aula futura

`brain.html` permanece fora deste fluxo.

## Objetivo editorial

Produzir uma página standalone com foco em **documentação estrutural**, não em marketing visual do sistema.

Ela deve responder, de forma prática:

1. O que é `AGENT.md` e o que não é
2. Como a pasta `.agents/` se divide
3. Qual o papel de `skills`, `memory` e `tasks`
4. Por que todo arquivo importante precisa de frontmatter YAML
5. Como índices YAML evitam leitura completa da árvore
6. Como adaptar o padrão a projetos diferentes

## Estrutura proposta da página

### 1 · `overview` · O papel do `AGENT.md`

Explicar `AGENT.md` como:

- bootstrap leve
- mapa de rotas
- arquivo curto, estável e barato em tokens
- ponto que direciona para memória, tarefas e skills sem pré-carregar tudo

Mostrar contraste direto:

- `AGENT.md` correto: curto, prescritivo, com links para índices
- `AGENT.md` ruim: arquivo gigante tentando conter a verdade inteira do projeto

Usar o `cortex/AGENT.md` como inspiração de estrutura, mas sem copiar o texto.

### 2 · `layout` · Anatomia mínima do `.agents/`

Árvore genérica sugerida:

```text
.agents/
├─ AGENT.md
├─ memory/
│  ├─ MEMORY.md
│  ├─ architecture/
│  │  ├─ index.yaml
│  │  └─ overview.md
│  ├─ decisions/
│  │  ├─ index.yaml
│  │  └─ ADR-001-example.md
│  └─ principles/
│     ├─ index.yaml
│     └─ constitution.md
├─ skills/
│  ├─ code-review/
│  │  ├─ SKILL.md
│  │  └─ agents/openai.yaml
│  └─ planning/
│     └─ SKILL.md
├─ tasks/
│  ├─ index.yaml
│  ├─ indexes/
│  │  └─ TKT-001-025.yaml
│  └─ TKT-001/
│     ├─ task.md
│     ├─ plan.md
│     └─ report.md
└─ tools/
   └─ sync_indexes.py
```

Explicar que esta árvore é **um ponto de partida**, não dogma.

### 3 · `skills` · Skills como procedimentos modulares

Explicar que skills:

- encapsulam fluxos recorrentes
- evitam repetir instruções longas em todo prompt
- podem ter `SKILL.md`, referências auxiliares e configs por provider
- devem ser pequenas, específicas e acionáveis

Exemplo genérico:

- `planning/` para gerar ou atualizar planos
- `code-review/` para revisão sistemática
- `reflect/` para capturar lições ao fim da sessão

Ponto importante a enfatizar:

**skill não substitui memória; skill define procedimento.**

### 4 · `memory` · Memória como conhecimento durável e roteável

Explicar separação entre:

- `AGENT.md` como roteador global
- `MEMORY.md` como roteador da memória
- subpastas temáticas com `index.yaml`
- arquivos `.md` pequenos, focados e com frontmatter

Regras que precisam aparecer com destaque:

- todo arquivo de memória deve ter YAML frontmatter no topo
- cada arquivo deve ter um assunto claro e reutilizável
- índices YAML apontam para arquivos; eles não são a verdade canônica
- primeiro lê-se o índice, depois o arquivo relevante

Exemplo de frontmatter:

```markdown
---
id: architecture-overview
title: Architecture overview
type: architecture
status: active
created: 2026-05-20
updated: 2026-05-25
tags:
  - architecture
  - boundaries
read_when:
  - changing app boundaries
  - deciding folder structure
---
```

### 5 · `tasks` · Tasks como memória operacional por unidade de trabalho

Explicar o padrão de tarefas inspirado no `cortex`:

- uma pasta por ticket ou trabalho
- `task.md` como artefato mínimo
- `plan.md`, `report.md`, `concept.md` e `updates/` quando necessário
- a pasta da tarefa é a verdade da história daquele trabalho
- `index.yaml` é um atalho de navegação, não substitui os arquivos

Exemplo de frontmatter de tarefa:

```markdown
---
id: TKT-012
title: Module federation shell host
artifact: task
status: done
owner: codex
created: 2026-05-25
updated: 2026-05-25
dependencies:
  - TKT-011
areas:
  - apps/ui
  - apps/tauri
skills:
  - ui-implementation
  - tkt-management
---
```

### 6 · `indexes` · Indexação YAML como mecanismo de escala

Esta deve ser uma das seções mais fortes da página.

Explicar claramente:

- sem índices, o agente tende a abrir diretórios inteiros
- com `index.yaml`, ele consegue rotear leitura por tema, faixa ou shard
- shards como `TKT-001-025.yaml` evitam arquivos gigantes
- índice YAML existe para **descoberta barata**

Mostrar dois exemplos:

1. índice de memória por categoria
2. índice de tarefas shardado por intervalo

Também vale explicitar a regra:

**se existe arquivo indexável, ele precisa ser sincronizável.**

Ou seja, a página deve recomendar:

- convenção de campos YAML estável
- script de sync/validação
- rotina para regenerar índices ao criar ou mover artefatos

### 7 · `anti-patterns` · Erros comuns

Lista de anti-patterns a cobrir:

- usar `AGENT.md` como dumping ground de tudo
- criar `.md` sem YAML frontmatter
- escrever memória longa demais e vaga demais
- não separar memória durável de tarefa temporária
- deixar `index.yaml` manual e desatualizado
- duplicar conhecimento em `skills` e `memory`
- acoplar a estrutura a uma única ferramenta quando a intenção é ser multi-tool

### 8 · `adaptacao` · Como adaptar para qualquer projeto

Dar 3 exemplos de aplicação:

- projeto pequeno solo
- produto SaaS em evolução
- monorepo com múltiplos apps e libs

A mensagem aqui é:

- o padrão é genérico
- a profundidade muda com o projeto
- o mínimo continua sendo `AGENT.md` + `.agents/skills` + `.agents/memory` + `.agents/tasks`

### 9 · `starter-kit` · Comece por aqui

Fechar com um kit inicial simples:

1. criar `AGENT.md`
2. criar `.agents/memory/MEMORY.md`
3. criar uma primeira skill
4. criar `tasks/index.yaml`
5. padronizar frontmatter em todos os `.md`
6. automatizar sync dos índices

## Diretrizes de conteúdo

### O que fazer nesta página

- adotar framing documental, não blueprint
- usar `.agents/` como convenção principal
- incluir exemplos curtos de frontmatter e índices YAML
- escrever com clareza suficiente para leitura humana e consumo por IA

### O que evitar

- amarrar a narrativa a uma aula que ainda não existe
- competir com `brain.html`
- repetir blueprint visual ou fluxos específicos demais
- entrar fundo em daemons, portas e automações que não sejam essenciais ao padrão
- transformar a página em tutorial de uma única stack

### O que introduzir

- tom mais documental e menos “demo”
- exemplos explícitos de YAML frontmatter
- exemplos de `index.yaml`
- comparação entre roteador, memória e tarefas
- chamada visual forte para a regra “leia índice primeiro”

## Arquivos a modificar

| Arquivo | Ação |
|---|---|
| `agents-structure.html` | Criar nova página standalone com documentação genérica da estrutura `.agents/` + `AGENT.md`, usando exemplos inspirados no `cortex`. O nome final pode mudar, mas deve deixar a proposta óbvia. |
| `locales/en/agents-structure.json` ou equivalente | Criar JSON de tradução da nova página, seguindo o padrão atual do projeto. |
| [CLAUDE.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/CLAUDE.md) | Atualizar status/contexto da nova página standalone, se esse arquivo acompanhar o inventário do site. |

## Regras editoriais obrigatórias

Estas regras devem aparecer na própria página, não só no plano:

- todo arquivo importante começa com bloco YAML
- todo conteúdo roteável deve ter esquema de campos consistente
- `index.yaml` serve para descoberta e roteamento
- índices não substituem o conteúdo canônico
- tasks guardam história operacional
- memory guarda conhecimento durável
- skills guardam procedimento reutilizável

Formulação recomendada:

**Sem frontmatter consistente, não existe memória organizável. Sem índices YAML, não existe roteamento barato.**

## Referências concretas do `cortex`

Arquivos que servem como base conceitual:

- `/Users/griiettner/Projects/personal/cortex/AGENT.md`
- `/Users/griiettner/Projects/personal/cortex/.agents/memory/MEMORY.md`
- `/Users/griiettner/Projects/personal/cortex/.agents/tasks/index.yaml`
- `/Users/griiettner/Projects/personal/cortex/.agents/tasks/indexes/TKT-001-025.yaml`
- `/Users/griiettner/Projects/personal/cortex/.agents/memory/architecture/overview.md`
- `/Users/griiettner/Projects/personal/cortex/.agents/memory/decisions/ADR-001-agent-ticket-lifecycle.md`
- `/Users/griiettner/Projects/personal/cortex/.agents/skills/tkt-plan/SKILL.md`
- `/Users/griiettner/Projects/personal/cortex/.agents/tasks/TKT-012/task.md`

Essas referências devem inspirar:

- a taxonomia
- os exemplos de frontmatter
- a diferença entre roteador e fonte da verdade
- o papel dos índices YAML

Elas não devem virar cópia literal da página.

## Critérios de sucesso

- a nova página funciona sozinha, sem depender de contexto de aula
- `brain.html` permanece intacto em conteúdo e propósito
- o leitor entende o papel distinto de `AGENT.md`, `memory`, `skills` e `tasks`
- a obrigatoriedade de YAML frontmatter fica inequívoca
- o uso de `index.yaml` e shards YAML fica inequívoco
- o conteúdo serve para qualquer projeto, sem perder concretude
- os exemplos são curtos, copiáveis e tecnicamente coerentes

## Verificação

1. Abrir `agents-structure.html` e validar que ela ensina estrutura `.agents/` e papel de `AGENT.md` sem depender de uma aula.
2. Confirmar que a abertura da página estabelece contexto próprio.
3. Confirmar que os exemplos de frontmatter usam YAML válido e campos coerentes.
4. Confirmar que pelo menos um `index.yaml` de memória e um shard de tasks aparecem na página.
5. Confirmar que `skills`, `memory` e `tasks` aparecem como pilares separados.
6. Confirmar que `brain.html` continua inalterado.
7. Confirmar que PT e EN continuam funcionando sem quebrar a nova página standalone.
