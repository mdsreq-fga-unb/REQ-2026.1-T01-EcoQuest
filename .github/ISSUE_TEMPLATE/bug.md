---
name: "Relato de Bug / Defeito"
about: "Template para reportar um erro, falha de comportamento ou anomalia no sistema."
title: "BUG - [Descrição curta e clara do erro]"
labels: ''
assignees: ''
---

## 🐞 1. Descrição do Bug
**O que está acontecendo?**
[Descreva o erro de forma clara. Ex: Ao tentar ler um Token de Doação expirado, o aplicativo fecha inesperadamente em vez de mostrar a mensagem de erro.]

**Comportamento Esperado:**
[O que deveria acontecer segundo o Caso de Uso original? Ex: O sistema deveria exibir o modal "Token Inválido".]

**Ambiente:**
- Ambiente: [ex: Local, Homologação, Produção]
- Navegador / Dispositivo: [ex: Chrome 115, Android 13]

---

## 🔁 2. Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Preencha '...' com o dado '...'
4. Veja o erro.

*Anexe prints, GIFs ou logs do terminal abaixo, se possível.*

---

## 🚦 3. Definition of Ready (DoR) - Filtro de Triagem
- [ ] O erro foi reproduzido com sucesso seguindo os passos acima.
- [ ] A gravidade e a prioridade de correção foram alinhadas com a Equipe.

---

## 🚀 4. Definition of Done (DoD) - Resolução do Bug
- [ ] A causa raiz foi identificada e corrigida no código.
- [ ] **Prevenção de Regressão:** Um teste unitário ou de integração foi criado/atualizado para garantir que este bug específico não volte a ocorrer no futuro.
- [ ] O código passou pelo CI (GitHub Actions) e Review.
- [ ] O fix foi validado no ambiente em que o bug foi originalmente reportado.