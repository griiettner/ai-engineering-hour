#!/usr/bin/env bash
# ⚠️ DEMO: Engineering Hour Part 5 — adapte antes de usar em produção.
#
# Hook: block-destructive.sh
# Evento: PreToolUse (matcher: Bash)
# Propósito: Bloquear comandos destrutivos antes da execução.
#
# Como funciona:
#   O Claude Code passa o input da ferramenta via $CLAUDE_TOOL_INPUT.
#   Se um padrão destrutivo for detectado, saímos com exit 2 — o que
#   bloqueia a execução e envia a mensagem de erro para a IA.
#
# Para adicionar novos padrões, amplie o grep abaixo.

BLOCKED_PATTERNS='drop table|drop database|truncate[[:space:]]+[a-z]|delete from|git push.*--force|rm[[:space:]]+-rf|rm[[:space:]]+-fr'

if echo "$CLAUDE_TOOL_INPUT" | grep -iEq "$BLOCKED_PATTERNS"; then
  echo "BLOQUEADO: comando destrutivo detectado pela CONSTITUTION.md." >&2
  echo "Confirme explicitamente com o desenvolvedor antes de prosseguir." >&2
  exit 2
fi

exit 0
