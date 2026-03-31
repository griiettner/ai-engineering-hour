> ⚠️ **DEMO** — Arquivo de demonstração para Engineering Hour Part 5.
> Adapte os caminhos e descrições para o seu projeto antes de usar.

---

# .claude/rules/README.md — Índice de Contexto

Carregue apenas o documento necessário para a tarefa atual.
Não carregue todos de uma vez — isso infla o contexto e reduz a precisão.

---

## Sempre disponível (importado via CLAUDE.md)

- **CONSTITUTION.md** → regras inegociáveis de segurança, padrões de código e arquitetura

---

## Antes de tarefas de banco de dados

- **TECH_STACK.md** → versões, ORMs e configurações aprovadas para o banco
- **DECISIONS.md** → verifique se há decisões sobre o schema antes de propor mudanças

---

## Antes de criar ou alterar features

- **ARCHITECTURE.md** → Feature Folders, padrões de camadas e convenções do projeto
- **REQUIREMENTS.md** → regras de negócio vigentes e critérios de aceite

---

## Antes de sugerir qualquer coisa "nova"

- **DECISIONS.md** → o time pode ter avaliado e descartado essa abordagem antes
- **TECH_STACK.md** → a biblioteca pode não estar aprovada no inventário

---

## Ao investigar bugs em produção

- Use o servidor MCP do Sentry/CloudWatch para buscar logs recentes
- Consulte o banco via MCP com credenciais **read-only de staging**
- Documente o root cause em DECISIONS.md após a resolução

---

## Regra de ouro

Nunca carregue todos os arquivos ao mesmo tempo. Pergunte ao dev qual é o escopo
da tarefa antes de decidir quais documentos são relevantes.
