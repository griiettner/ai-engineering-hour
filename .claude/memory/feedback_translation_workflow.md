---
name: feedback-translation-workflow
description: Não criar `locales/en/partN.json` durante o scaffolding, esperar o humano aprovar o conteúdo PT-BR primeiro
metadata:
  type: feedback
---

Arquivos de tradução (`locales/en/part{N}.json`) NÃO devem ser criados durante o scaffolding de uma sessão. O workflow é em duas fases:

1. **Fase 1 (scaffold):** Criar o HTML com todo conteúdo PT-BR e anotações `data-i18n`, mas sem JSON de tradução.
2. **Fase 2 (translate):** Só após o humano revisar, iterar e aprovar explicitamente ("translate", "finish", "green light").

**Why:** Mudanças no conteúdo durante o review invalidam a tradução, causando retrabalho. Cada edição no texto PT-BR significa atualizar chaves e valores no JSON também, dobrando o trabalho em cada iteração.

**How to apply:** Ao usar `/new-part` ou criar uma sessão manualmente, adicionar atributos `data-i18n` no HTML mas pular `locales/en/part{N}.json`. Quando o usuário sinalizar aprovação, criar o arquivo de tradução e atualizar `locales/en/index.json`.
