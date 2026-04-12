# 3. Estratégias de Engenharia de Software
## 3.1. Estratégia Priorizada

- **Abordagem:** Híbrida
- **Ciclo de Vida:** Adaptativo
- **Processo:** OpenUP + Kanban

## 3.2. Quadro Comparativo

| Critério de Análise | OpenUP (Open Unified Process) | AUP (Agile Unified Process) | DSDM (Dynamic Systems Dev. Method) | RAD (Rapid Application Development) |
| :--- | :--- | :--- | :--- | :--- |
| **Foco Principal** | Equilíbrio entre agilidade e rigor arquitetural/documental. | Desenvolvimento ágil simplificado, focado nas práticas da engenharia. | Entrega rigorosa dentro do prazo. | Prototipagem visual rápida e feedback imediato do usuário. |
| **Abordagem (Ciclo de Vida)** | Híbrida/Adaptativa. Dividido em 4 fases claras (Concepção, Elaboração, Construção, Transição). | Híbrida. Também utiliza as 4 fases, mas com menos ênfase na colaboração orgânica. | Ágil/Iterativa. Focado estritamente em ciclos de tempo fixo. | Prototipagem iterativa com envolvimento intenso do cliente. |
| **Tratamento da Documentação** | Progressiva e Just-in-Time: Gera apenas os artefatos essenciais, evoluindo-os conforme necessário. | Moderada: Foca em modelos técnicos simples, mas exige disciplina de engenharia. | Baixa/Pragmática: Documentação é secundária ao software funcionando no prazo. | Mínima: A própria interface de software é usada como principal "documento" de validação. |
| **Adequação ao Prazo** | As fases curtas de Concepção e Elaboração cabem nas primeiras semanas, liberando o restante para a Construção. | Permite entregas rápidas, mas a adaptação da equipe ao processo pode tomar tempo. | O prazo é inegociável; se o tempo apertar, o escopo é reduzido via priorização. | Gera entregas rápidas, mas o código gerado às pressas costuma ter baixa qualidade técnica. |
| **Tratamento de Riscos** | Mitigação Precoce: Exige que os maiores riscos sejam resolvidos logo na fase de Elaboração. | Identificação iterativa, mas com menos estruturação formal para mitigação do que o OpenUP. | Gerenciado indiretamente pelo controle estrito de tempo e prioridade. | Baixo foco na gestão de riscos técnicos; o foco é apenas o risco de negócio. |

## 3.3. Justificativa

Além do que já foi citado anteriormente, a natureza acadêmica do projeto exige artefatos formais e critérios de transição claros e bem definidos, fazendo do OpenUP a escolha metodológica definitiva, por unir a rastreabilidade estruturada do RUP com a cadência adaptativa dos métodos ágeis, apesar de o DSDM ser atrativo para prazos curtos.