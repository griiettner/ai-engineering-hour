> ⚠️ **DEMO** — Arquivo de demonstração para Engineering Hour Part 5.
> Adapte as regras para o seu projeto antes de usar em produção.
> Envolva o time na revisão — a Constituição deve representar decisões coletivas.

---

# CONSTITUTION.md — Regras Inegociáveis do Projeto

Este arquivo é importado automaticamente em toda conversa via CLAUDE.md.
Leia-o antes de qualquer ação. Não interprete estas regras — siga-as literalmente.

---

## 🔴 NUNCA FAÇA (sem confirmação explícita e textual do desenvolvedor)

- `DROP TABLE`, `TRUNCATE` ou `DELETE` sem cláusula `WHERE`
- `git push --force` em qualquer branch, incluindo feature branches
- `rm -rf` ou exclusão permanente de arquivos sem backup confirmado
- Alterar arquivos `.env` de produção ou staging
- Hardcodar secrets, tokens, senhas ou API keys em código
- `DROP DATABASE` ou operações destrutivas de schema global
- Alterar configurações de autenticação ou autorização sem revisão

Se qualquer uma dessas ações parecer necessária, **pare, explique o motivo e aguarde confirmação explícita**.

---

## 🟡 PERGUNTE ANTES DE EXECUTAR

Pause e obtenha confirmação antes de prosseguir com:

- Qualquer alteração de schema de banco (`ADD COLUMN`, `DROP COLUMN`, novos índices, constraints)
- Instalar dependências globais no sistema (`npm install -g`, `brew install`, `apt-get`)
- Criar arquivos fora do escopo definido no `plan.md`
- Modificar migrations já aplicadas em qualquer ambiente
- Alterar pipelines de CI/CD, `Dockerfiles` ou scripts de deploy
- Remover ou renomear arquivos existentes (mesmo que pareçam desnecessários)

---

## ✅ PADRÕES OBRIGATÓRIOS (todo código novo, sem exceção)

- **TypeScript strict mode** — sem `any` implícito, sem atalhos de tipagem
- **Testes para toda lógica de negócio** — unitários no mínimo, integração para fluxos críticos
- **Nomes de variáveis, funções e arquivos em inglês**
- **Comentários e documentação em Português Brasileiro**
- **Sem `console.log` em código de produção** — use o logger configurado no projeto
- **Variáveis de ambiente via `process.env`** — nunca hardcoded, sempre documentadas em `.env.example`
- **Migrations sempre reversíveis** — todo `up()` deve ter um `down()` funcional e testado

---

## 🏗️ ARQUITETURA (não negocie sem aprovação do time)

- **Feature Folders** — organização por domínio de negócio, não por tipo de arquivo
- **Separação obrigatória** — Repository / Service / Controller sem lógica de negócio em rotas
- **Erros tipados** — use classes de erro customizadas, não `throw "mensagem de string"`
- **Novas dependências** — somente se listadas no `TECH_STACK.md` ou aprovadas explicitamente
- **Sem acoplamento circular** entre módulos — use injeção de dependência

---

## 🌐 MCP & FERRAMENTAS EXTERNAS

- Servidores MCP só podem usar credenciais de **staging com permissão de leitura**
- Nunca conectar a produção via MCP em ambiente local de desenvolvimento
- Auditar servidores MCP da comunidade antes de usar — prefira os oficiais (`@modelcontextprotocol/*`)

---

## ⚡ SKILLS & COMANDOS

- Skills em `.claude/commands/` não devem executar ações irreversíveis automaticamente
- Toda skill que envolve deploy, push ou remoção de dados deve incluir passo de confirmação
- Revisar `.claude/commands/` a cada trimestre — remover o que não for mais necessário

---

*Última revisão: 2026-03 · Próxima revisão: 2026-06*
