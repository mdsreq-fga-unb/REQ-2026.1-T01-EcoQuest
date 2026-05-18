---
name: "Spike / Investigação Técnica"
about: "Template para pesquisa, Prova de Conceito (PoC) ou mitigação de risco técnico (Timeboxed)."
title: "SPIKE - [Tema da Investigação. Ex: API do Google Maps]"
labels: ''
assignees: ''
---

## 🔬 1. Contexto e Objetivo da Investigação
**Qual é a dúvida técnica ou risco a ser mitigado?**
[Ex: Não sabemos como integrar a API X e isso está bloqueando a estimativa da UC06.]

**O que precisamos descobrir?**
1. [Ex: A API é gratuita para o nosso volume?]
2. [Ex: Qual a latência média da requisição?]

**Caso de Uso Bloqueado:** [Link para a Issue do UC que depende deste Spike]

---

## ⏱️ 2. Restrição de Tempo (Timebox)
*Spikes não duram para sempre. Se o tempo acabar e não houver solução, a arquitetura deve ser repensada.*
- **Esforço Máximo Alocado:** [Ex: 4 horas / 1 dia / Meio ciclo]

---

## 🚦 3. Definition of Ready (DoR)
- [ ] O objetivo da pesquisa está claro (sabemos exatamente a pergunta que queremos responder).
- [ ] O timebox (limite de tempo) foi acordado.

---

## 🚀 4. Definition of Done (DoD) - Fim do Spike
- [ ] A investigação foi concluída dentro do tempo estipulado.
- [ ] **Resultado:** A resposta ou decisão arquitetural foi documentada em um comentário final nesta issue ou na GitHub Pages.
- [ ] Se aplicável, uma Prova de Conceito (PoC) em código foi gerada (pode ser uma branch descartável).
- [ ] O Caso de Uso que estava bloqueado por esta dúvida foi atualizado com as novas informações e agora pode ser estimado.