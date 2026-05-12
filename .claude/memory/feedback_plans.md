---
name: feedback-plans
description: Salvar arquivos de plano sempre em `.claude/plans/` do projeto, nunca no global `~/.claude/plans/`
metadata:
  type: feedback
---

Sempre salvar arquivos de plano em `.claude/plans/` dentro do projeto, não no global `~/.claude/plans/`.

**Why:** O projeto tem sua própria pasta `.claude/`. Planos são específicos do projeto e devem viver lá, versionados junto com o resto. Mesma lógica de [[feedback-memory-location]].

**How to apply:** Quando instruções do modo plan especificarem o caminho global, mover o arquivo para `.claude/plans/` do projeto após escrevê-lo. Lembrar o usuário se precisar.
