# Definição de Metodologia e Processo de Desenvolvimento

## 1. Abordagem Híbrida e Ciclo de Vida
A abordagem escolhida para este projeto é **híbrida**, visando uma adaptação contextual a cada fase. Esta estratégia permite equilibrar um planejamento detalhado inicial com uma forte colaboração com o cliente, garantindo avaliação contínua de riscos e ajuste ao contexto momentâneo.

Devido a essa natureza híbrida, o ciclo de vida será **adaptativo**:
* **Fase Inicial:** Foco na entrega de valor e validação pelo cliente, com caráter experimental e exploratório.
* **Fase de Consolidação:** À medida que requisitos e processos são estabelecidos, a abordagem torna-se mais estruturada.
* **Transição:** Baseada em critérios bem definidos e produção progressiva de documentação técnica conforme a evolução do entendimento do sistema.

## 2. Processo Escolhido: OpenUP
O processo selecionado é o **OpenUP (Open Unified Process)**. A escolha justifica-se por:
1.  Contemplar ciclos em fases bem definidas.
2.  Permitir uma evolução exploratória nas fases iniciais.
3.  Culminar em uma construção mais robusta e estruturada.

---

## 3. Quadro Comparativo de Metodologias

| Critério de Análise | OpenUP (Open Unified Process) | AUP (Agile Unified Process) | DSDM (Dynamic Systems Dev. Method) | RAD (Rapid Application Development) |
| :--- | :--- | :--- | :--- | :--- |
| **Foco Principal** | Equilíbrio entre agilidade e rigor arquitetural/documental. | Desenvolvimento ágil simplificado, focado nas práticas da engenharia. | Entrega rigorosa dentro do prazo (Timebox restrito). | Prototipagem visual rápida e feedback imediato do usuário. |
| **Abordagem (Ciclo de Vida)** | Híbrida/Adaptativa. Dividido em 4 fases claras (Concepção, Elaboração, Construção, Transição). | Híbrida. Também utiliza as 4 fases, mas com menos ênfase na colaboração orgânica. | Ágil/Iterativa. Focado estritamente em ciclos de tempo fixo. | Prototipagem iterativa com envolvimento intenso do cliente. |
| **Tratamento da Documentação** | **Progressiva e Just-in-Time:** Gera apenas os artefatos essenciais (como Casos de Uso). | Moderada: Foca em modelos técnicos simples, mas exige disciplina de engenharia. | Baixa/Pragmática: Documentação é secundária ao software funcionando no prazo. | Mínima: A própria interface de software é usada como principal "documento". |
| **Adequação ao Prazo** | **Excelente:** Fases curtas de Concepção/Elaboração liberam tempo para Construção. | Boa: Permite entregas rápidas, mas a adaptação da equipe pode tomar tempo. | Excelente: O prazo é inegociável; escopo reduzido via MoSCoW se necessário. | Razoável: Gera entregas rápidas, mas o código pode ter baixa qualidade técnica. |
| **Tratamento de Riscos** | **Mitigação Precoce:** Exige resolução dos maiores riscos técnicos na fase de Elaboração. | Identificação iterativa, com menos estruturação formal que o OpenUP. | Gerenciado indiretamente pelo controle de tempo e prioridade. | Baixo foco em riscos técnicos; foco no risco de negócio (interface). |

---

## 4. Justificativa Final
A natureza acadêmica do projeto demanda a criação de artefatos formais e critérios de transição claros. O **OpenUP** consolidou-se como a escolha definitiva por unir a **rastreabilidade estruturada** herdada do RUP com a **cadência adaptativa** dos métodos ágeis. Embora o DSDM apresente vantagens para prazos curtos, o OpenUP oferece o suporte necessário para o desenvolvimento documental e arquitetural exigido.