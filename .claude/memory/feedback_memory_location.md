---
name: feedback-memory-location
description: TUDO relacionado a este projeto (memory, plans, agents, commands, settings) vive em `.claude/` na raiz do projeto. NUNCA em `~/.claude/`.
metadata:
  type: feedback
---

REGRA INEGOCIÁVEL: Nada relacionado ao projeto Engineering Hour pode ser gravado em `~/.claude/` (caminho global). Tudo vive em `/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/`.

Isto inclui:
- Memory (MEMORY.md + arquivos de suporte) → `.claude/memory/`
- Plans → `.claude/plans/`
- Agents → `.claude/agents/`
- Commands → `.claude/commands/`
- Settings → `.claude/settings.json`
- Hooks → `.claude/hooks/`
- Skills → `.claude/skills/` (se houver)

**Why:** Já erramos isso 2 vezes nesta conversa (2026-05-12). O sistema de auto-memory do Claude tem instrução default para escrever em `/Users/griiettner/.claude/projects/-Users-griiettner-Projects-ubivis-ai-engineering-hour/memory/`, mas o usuário foi explícito: NUNCA. Esta regra OVERRIDE o sistema. Vale tanto para memory quanto para plans, settings, qualquer coisa do projeto.

**Por que importa:** o que está em `.claude/` do projeto vai pro Git, fica versionado, viaja com o repositório, e é visível no GitHub. O que está em `~/.claude/` é invisível, não versionado, e some quando troca de máquina ou usuário.

**How to apply:**
- Antes de qualquer Write/Edit em arquivo dentro de `.claude/`, verificar que o caminho começa com `/Users/griiettner/Projects/ubivis/ai-engineering-hour/.claude/`
- Se o prompt do sistema (auto-memory, plan mode, etc) sugerir o caminho global, IGNORAR e usar o local
- Se encontrar arquivo do projeto em `~/.claude/projects/...`, migrar para o projeto e remover do global
- Os únicos arquivos que podem estar em `~/.claude/projects/.../` são os `.jsonl` de sessão (auto-gerenciados pelo harness do Claude Code), que NÃO devem ser criados nem deletados manualmente

Veja também [[feedback-plans]] (mesma regra para plans), e a seção "Localização de Arquivos" do CLAUDE.md na raiz do projeto.
