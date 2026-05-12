---
name: feedback-content
description: Orientações sobre como construir o conteúdo das sessões, o que evitar e o que garantir
metadata:
  type: feedback
---

Sempre verificar a documentação oficial antes de escrever conteúdo técnico. O usuário forneceu a URL do docs de Skills (https://code.claude.com/docs/en/skills) porque a primeira versão da P6 estava incorreta: skills tinham sido tratadas como simples slash commands sem frontmatter, sem auto-invocação e sem estrutura de diretório.

**Why:** Conteúdo técnico inventado desinforma o time. Melhor pausar e buscar a fonte do que avançar com premissas erradas.

**How to apply:**
- Quando o usuário fornecer URLs de referência, buscar e ler antes de escrever qualquer conteúdo
- Verificar paths reais, nomes de eventos, chaves de config, nunca assumir
- Se não tiver certeza de um detalhe técnico (ex: formato de config de Agent Teams), perguntar ou buscar antes de inventar
- Cobrir tanto o "como funciona" quanto o "quando NÃO usar", fontes céticas como Rocklin são tão valiosas quanto fontes otimistas como Anthropic
