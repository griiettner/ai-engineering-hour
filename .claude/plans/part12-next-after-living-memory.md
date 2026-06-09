# Plano · P12 · O Dev do Futuro

## Contexto

P11, **Memória Viva**, fechou um bloco técnico forte: RAG local, reflect, lifecycle de lições, memória consultável e captura automática. O próximo módulo não deve repetir organização de `.agents/`, bridges, índices e arquitetura operacional, porque esse conteúdo já foi explicado para o grupo em outras conversas e ficaria redundante.

A nova P12 deve puxar a série para a pergunta que interessa agora:

**Quem serão os desenvolvedores valiosos na realidade de agentic development?**

O repositório já tem [part14.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/part14.html) com o tema "O Dev Sênior do Futuro". Ele deve ser usado como matéria-prima, mas precisa ser aprofundado e atualizado. A versão atual fala em orquestração e gestão de intenção, mas ainda está curta, genérica e muito presa ao contraste "digitar menos, pensar mais".

P12 deve ser mais precisa: o futuro não é só "dev como orquestrador". É **humano como arquiteto de intenção, contexto, sistemas, verificação e responsabilidade**.

## Decisão editorial

Transformar P12 em:

**O Dev do Futuro · Agentic Development e o Humano como Arquiteto**

Possíveis subtítulos:

- "Da implementação manual para a arquitetura de intenção"
- "Como continuar relevante quando agentes escrevem código"
- "O novo papel do dev: definir sistemas, restrições, feedback e responsabilidade"

## Tese da sessão

**O dev do futuro não compete com agentes na produção de código. Ele projeta o sistema onde agentes trabalham, define intenção, contexto e limites, e valida se o resultado serve ao negócio, à arquitetura e às pessoas.**

## Arquétipos centrais

A sessão deve apresentar a nova senioridade como uma composição de quatro arquétipos. Eles não são necessariamente cargos separados. Em muitos times, o mesmo dev sênior vai alternar entre eles ao longo de uma task.

### 1. Systems Architect

Foco:

- Desenhar a estrutura geral do sistema.
- Definir boundaries, contratos, integração, escalabilidade e restrições.
- Garantir que agentes atuem dentro de uma arquitetura coerente.

Skillset:

- System design.
- Infraestrutura e integração.
- Escalabilidade, segurança, observabilidade e trade-offs.
- Capacidade de transformar requisitos vagos em decisões técnicas duráveis.

### 2. AI Orchestrator / Context Engineer

Foco:

- Criar pipelines de contexto para agentes.
- Quebrar problemas complexos em etapas delegáveis.
- Fornecer documentação, regras, exemplos, testes e limites corretos para cada execução.

Skillset:

- Domínio de ferramentas agentic.
- Prompting estruturado, mas sem reduzir o papel a "prompt mágico".
- Context management, memória, retrieval, planos, checks e feedback loops.
- Capacidade de dirigir múltiplos agentes ou modos de trabalho sem perder coerência.

### 3. Product Engineer

Foco:

- Conectar necessidade do cliente, regra de negócio e comportamento do software.
- Validar se a solução resolve o problema real, não apenas se o código compila.
- Traduzir linguagem de negócio em contratos técnicos testáveis.

Skillset:

- Empatia com usuário.
- Pensamento de produto.
- UX básica, métricas de uso e validação de hipótese.
- Comunicação direta com stakeholders.

### 4. Quality & Reliability Lead

Foco:

- Revisar outputs de IA com rigor.
- Encontrar edge cases, riscos de segurança, dívida técnica e regressões.
- Desenhar redes de verificação que suportem alta velocidade de geração.

Skillset:

- Debugging avançado.
- Test strategy.
- Segurança e privacidade.
- Observabilidade, incident response, code review e gestão de dívida técnica.

Mensagem principal: a senioridade se desloca de "eu implemento melhor" para "eu garanto que o sistema certo seja construído, do jeito certo, com evidência suficiente".

## O que esta aula não deve ser

- Não repetir P11 sobre memória viva, RAG, reflect e lifecycle.
- Não repetir a aula de arquitetura operacional com `.agents/` como centro.
- Não virar palestra motivacional sobre "IA não vai substituir você".
- Não vender produtividade como número mágico de throughput.
- Não reduzir senioridade a "prompt engineering".

O tom correto é pragmático: algumas habilidades perdem valor relativo, outras ficam muito mais importantes, e parte do trabalho muda de execução direta para desenho, coordenação e julgamento.

## Estrutura editorial recomendada

### 1. A mudança real: de executor para arquiteto

Abrir com a transição:

- Antes: o dev produzia código diretamente como principal unidade de valor.
- Agora: agentes produzem grande parte da implementação.
- O valor humano migra para intenção, decomposição, trade-offs, validação e responsabilidade.

Mensagem principal: o problema não é "escrever código mais rápido". É decidir **qual código deve existir** e **como saber se ele está correto**.

Visual sugerido: comparação em três colunas:

- Dev 2018: implementador.
- Dev 2023: copiloto com autocomplete.
- Dev 2026: arquiteto de agentes, contexto e verificação.

### 2. Agentic development muda o workflow

Explicar o fluxo novo sem glamour:

1. Humano define objetivo, contexto e restrições.
2. Agente propõe plano.
3. Humano calibra arquitetura, risco e escopo.
4. Agente executa com ferramentas.
5. Testes, hooks, reviewers e memória validam.
6. Humano decide se o resultado é aceitável.

Mensagem principal: agentic development é um ciclo de delegação controlada, não uma conversa solta com chatbot.

Visual sugerido: loop "Intent -> Plan -> Execute -> Verify -> Learn -> Re-scope".

### 3. As cinco novas competências centrais

Trocar o radar simples da P14 por um mapa de competências mais forte:

1. **Intent Architecture**
   - Formular objetivos, critérios de aceite, limites e não-objetivos.
   - Separar requisito real de preferência de implementação.

2. **Context Engineering**
   - Dar ao agente o contexto certo, no tamanho certo, na hora certa.
   - Saber quando usar memória, docs, exemplos, testes ou código existente.

3. **System Design for Agents**
   - Criar superfícies que agentes conseguem modificar com segurança.
   - Modularidade, contratos, testes e boundaries viram multiplicadores de IA.

4. **Verification Design**
   - Desenhar testes, hooks, checks, reviewers e critérios de rollback.
   - O humano não revisa cada linha, revisa a rede de garantias.

5. **Judgment and Accountability**
   - Tomar decisões quando há trade-off.
   - Assumir responsabilidade por impacto, segurança, produto e manutenção.

Mensagem principal: prompt é interface. A competência real é arquitetar o sistema inteiro ao redor dela.

Observação editorial: conectar essas cinco competências aos quatro arquétipos:

- Systems Architect: system design, boundaries, integração e infraestrutura.
- AI Orchestrator / Context Engineer: intent architecture e context engineering.
- Product Engineer: tradução negócio-produto-tecnologia.
- Quality & Reliability Lead: verification design, segurança e confiabilidade.

### 4. O novo loop do trabalho

Mostrar como uma task muda na prática.

Antes:

```text
Ler ticket -> escrever código -> rodar teste -> abrir PR
```

Agora:

```text
Ler objetivo -> definir contrato -> preparar contexto -> delegar plano
-> revisar estratégia -> deixar agente executar -> validar evidência
-> capturar aprendizado -> ajustar sistema
```

Exemplo concreto:

- Ticket: "Adicionar export CSV no dashboard financeiro".
- Dev antigo: cria endpoint, botão e teste.
- Dev do futuro: define contrato de dados, limites de permissão, formato de auditoria, casos de teste, critério de performance, instrução para agente e plano de validação.

Mensagem principal: o trabalho sobe um nível de abstração, mas fica mais exigente.

### 5. O que fica mais valioso

Apresentar habilidades que ganham valor:

- Modelagem de domínio.
- Arquitetura incremental.
- Especificação de contratos.
- Leitura crítica de diffs.
- Debugging de sistemas distribuídos.
- Escrita de testes que representam comportamento.
- Segurança e privacidade por design.
- Comunicação com produto e negócio.
- Curadoria de memória e conhecimento do projeto.

Mensagem principal: o dev que entende o sistema real fica mais valioso, não menos.

### 6. O que perde valor relativo

Ser honesto sobre habilidades que deixam de ser diferencial:

- Digitar boilerplate rápido.
- Memorizar sintaxe de framework.
- Fazer CRUD repetitivo do zero.
- Resolver problemas isolados sem contexto.
- Saber "o comando certo" sem entender o trade-off.
- Ser apenas um executor de tickets.

Mensagem principal: algumas habilidades continuam úteis, mas deixam de ser identidade profissional.

### 7. Anti-patterns do dev no mundo agentic

Usar pares errado/certo:

- **O digitador ansioso**
  - Errado: microgerenciar cada linha.
  - Certo: definir contrato, restrições e evidência esperada.

- **O prompt mágico**
  - Errado: acreditar que frase bonita substitui contexto e testes.
  - Certo: preparar contexto, exemplos, checks e critérios de aceite.

- **O aprovador passivo**
  - Errado: aceitar diff grande porque "passou".
  - Certo: revisar arquitetura, risco e comportamento observável.

- **O arquiteto ausente**
  - Errado: deixar agentes criarem estrutura sem boundaries.
  - Certo: desenhar módulos, contratos e áreas seguras de mudança.

- **O acumulador de automação**
  - Errado: adicionar agentes, hooks e ferramentas sem governança.
  - Certo: medir onde a automação reduz risco ou custo real.

Mensagem principal: agentic development aumenta a alavancagem, mas também amplifica julgamento ruim.

### 8. Como evoluir como dev agora

Fechar com ações práticas para o grupo:

1. Pare de pedir só implementação. Peça plano, riscos e critérios de validação.
2. Escreva tickets com comportamento, restrições e exemplos.
3. Fortaleça testes que validam contrato, não detalhes internos.
4. Documente decisões que agentes precisam reutilizar.
5. Faça review por intenção, arquitetura e evidência.
6. Meça retrabalho, não só velocidade.
7. Aprenda a dividir trabalho para agentes sem perder responsabilidade.

Mensagem principal: a transição não acontece por ferramenta. Acontece por mudança de prática.

### 9. O pipeline de carreira foi quebrado

Adicionar uma seção curta e honesta sobre juniors e formação de seniors.

Tese:

O caminho tradicional "passar anos fazendo tarefas simples até acumular repertório" fica instável quando agentes fazem boa parte do trabalho rotineiro. Isso não elimina juniors, mas muda como eles precisam aprender.

Pontos:

- Juniors terão menos oportunidades naturais de aprender só repetindo boilerplate.
- O aprendizado precisa ser mais deliberado: leitura de diffs, debugging, testes, design review e análise de trade-offs.
- Seniors terão responsabilidade maior de ensinar raciocínio, não só delegar tarefas.
- Times precisarão criar práticas de formação: pair review com IA, postmortem de prompts, leitura guiada de PRs, exercícios de decomposição e validação.

Mensagem principal: se o trabalho simples for automatizado, o aprendizado básico precisa ser projetado. Caso contrário, o mercado cria seniors sem base ou juniors sem rampa.

## Relação com P11

P11 respondeu:

**Como o agente lembra e aprende?**

P12 responde:

**Qual é o papel do humano quando o agente lembra, planeja, executa e aprende?**

Essa conexão deve aparecer logo no início da aula. O ponto de virada é:

> Se a memória agora vive no projeto e os agentes conseguem executar fluxos cada vez mais longos, o dev precisa parar de ser o centro da execução e virar o arquiteto do sistema de trabalho.

## Material a reaproveitar da P14 atual

Reaproveitar como base, não como versão final:

- Tema "O Dev Sênior do Futuro".
- Gráfico de pivot de skills, mas atualizar labels e narrativa.
- Comparação entre instrução de baixo nível e gestão de intenção.
- Ideia de dev orquestrador, renomeando para humano como arquiteto.
- Bloco final sobre promoção de papel, mas com menos tom motivacional e mais responsabilidade.

Adicionar material novo:

- Os quatro arquétipos: Systems Architect, AI Orchestrator / Context Engineer, Product Engineer, Quality & Reliability Lead.
- A disrupção do pipeline tradicional de carreira.
- Exemplos de como cada arquétipo atua na mesma task.
- Uma matriz "atividade antiga vs atividade nova vs evidência de qualidade".

Descartar ou reescrever:

- Métricas genéricas como "+300% velocity" e "-80% bugs de sintaxe".
- Seção de memória do projeto se ela repetir P11.
- Linguagem que pareça promessa de produtividade sem evidência.
- Contraste simplista junior vs senior.

## Nova identidade visual sugerida

Manter uma paleta de senioridade, mas menos "ouro motivacional" e mais "arquitetura":

- Accent: `#a16207` ou escolher novo tom mais distinto se P12 atual mantiver `#1f3a5f`.
- Base: stone.
- Apoios: slate para responsabilidade, emerald para validação, amber para decisão.

Ícone sugerido: `🏛️` ou `🧭`.

Mantra final sugerido:

**"O futuro do dev não é escrever cada linha. É decidir o que deve existir, criar as condições para que agentes construam com segurança e assumir responsabilidade pelo resultado."**

## Arquivos a ajustar quando implementar

- [part12.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/part12.html)
  - Reescrever de "Arquitetura Operacional para Agentes" para "O Dev do Futuro".
  - Expandir para sessão completa com padrão das parts maduras.
  - Usar `nav.js`, `i18n.js`, `shared.css`, footer e session complete.

- [part14.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/part14.html)
  - Depois de migrar o conteúdo útil, decidir se vira outro tema, fica como draft obsoleto ou é renumerado.

- [index.html](/Users/griiettner/Projects/ubivis/ai-engineering-hour/index.html)
  - Atualizar card P12 com o novo título e descrição.
  - Evitar duplicidade com P14.

- [README.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/README.md)
  - Atualizar tabela de sessões.

- [CLAUDE.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/CLAUDE.md)
  - Atualizar status e título de P12.

- [locales/en/index.json](/Users/griiettner/Projects/ubivis/ai-engineering-hour/locales/en/index.json)
  - Atualizar `card.p12.*`.

- `locales/en/part12.json`
  - Criar ou reescrever tradução após a versão PT-BR estabilizar.

- [.claude/memory/project_sessions.md](/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/memory/project_sessions.md)
  - Registrar P12 como "O Dev do Futuro".
  - Remover ou ajustar referência antiga que ainda coloca esse tema em P13/P14.

## Critérios de aceite

- P12 não repete o conteúdo técnico da P11.
- A tese "human as architect" aparece claramente no primeiro bloco.
- A aula explica agentic development como workflow, não como ferramenta.
- A sessão apresenta claramente os quatro arquétipos: Systems Architect, AI Orchestrator / Context Engineer, Product Engineer, Quality & Reliability Lead.
- O papel de Product Engineer aparece como tradução direta entre necessidade de negócio, usuário e sistema.
- A disrupção da carreira junior -> senior é abordada sem fatalismo e com práticas concretas de formação.
- Cada competência nova tem exemplo prático.
- A sessão é honesta sobre o que perde valor e o que ganha valor.
- Anti-patterns mostram comportamentos reais de devs usando agentes.
- O fechamento chama para responsabilidade, não só produtividade.
- Índice e README não deixam dois módulos com o mesmo tema "Dev do Futuro".

## Verificação

- Buscar duplicidade de tema:

```bash
rg -n "Dev Sênior do Futuro|Dev do Futuro|O Dev do Futuro|agentic|arquiteto|architect" .
```

- Verificar links e títulos:

```bash
rg -n "part12|P12|part14|P14" index.html README.md CLAUDE.md .claude/memory/project_sessions.md
```

- Revisar i18n:

```bash
rg -n "data-i18n|data-i18n-html" part12.html
```

- Abrir `index.html` e `part12.html` no browser e validar navegação, charts e layout em desktop e mobile.

## Fora de escopo

- Reexplicar RAG, QMD, reflect ou lifecycle de memória.
- Fazer uma aula detalhada de `.agents/` e bridges.
- Resolver toda a numeração futura da série.
- Criar conteúdo de governança, segurança ou ROI.

Esses temas podem voltar depois. A P12 precisa ser a virada conceitual: depois de ensinar ferramentas e memória, mostrar qual papel humano continua valioso na nova forma de desenvolver software.
