# 3. Estratégias de Engenharia de Software
## 3.1. Estratégia Priorizada

- **Abordagem:** Híbrida
- **Ciclo de Vida:** Adaptativo
- **Processo:** OpenUP 
- **Framework:** Kanban
  
## 3.2. Quadro Comparativo

| Características | OpenUP (Open Unified Process) | AUP (Agile Unified Process) |
|---|---|---|
| Abordagem Geral | Iterativo, incremental, centrado na arquitetura, mitigação precoce de riscos e colaboração. | Iterativo e incremental, focado em aplicar técnicas ágeis (simplicidade) dentro de um ciclo de vida unificado. |
| Foco em Arquitetura | Forte ênfase na definição e estabilização de uma arquitetura executável logo nas fases iniciais do projeto. | A arquitetura é validada através de modelagem ágil, evoluindo de forma ligeiramente mais orgânica. |
| Estrutura de Processos | Fases bem definidas (Concepção, Elaboração, Construção, Transição) com critérios de transição rigorosos. | Utiliza as mesmas quatro fases clássicas, mas com foco em simplificar ao máximo as cerimônias e fluxos de trabalho. |
| Flexibilidade de Requisitos | Alta flexibilidade nas fases iniciais, mas exige estabilização e congelamento para iniciar a Construção com segurança. | Alta flexibilidade, lidando com mudanças de requisitos de forma mais contínua através de modelagem ágil e enxuta. |
| Colaboração com Cliente | Exige alinhamento contínuo com os stakeholders, especialmente nas validações de entregas parciais e viradas de fase. | Interação constante com a cliente para validação rápida de incremento, seguindo os princípios do manifesto ágil. |
| Complexidade do Processo | Equilibra agilidade com rigor formal. Define papéis claros, estruturando bem a equipe de 5 pessoas. | Mais leve que o OpenUP. Tende a tratar a equipe de forma mais generalista, com menos separação estrita de papéis. |
| Qualidade Técnica | Assegurada pela validação arquitetural precoce, revisões de escopo e testes integrados a cada iteração. | Forte ênfase em práticas de engenharia de software diretamente no código (TDD, refatoração, padrões limpos). |
| Práticas de Desenvolvimento | Orientado a Casos de Uso/User Stories, arquitetura baseada em componentes e desenvolvimento iterativo. | Modelagem Ágil, Desenvolvimento Orientado a Testes e foco na programação funcional. |
| Adaptação ao Projeto (EcoQuest) | Ideal. Une as entregas ágeis do MVP em 12 semanas com o rigor de documentação formal exigido pelo ambiente acadêmico. | Adequado. Excelente para o ritmo da equipe de 5 pessoas, mas sua aversão natural à documentação pode gerar penalidades acadêmicas. |
| Documentação | Progressiva e fundamental. Gera os artefatos formais necessários para comprovar a transição de fases. | Minimiza a documentação. A premissa é gerar apenas o "bom o suficiente" para continuar escrevendo código. |
| Controle de Qualidade | Validações embutidas nos marcos do projeto (avaliação de riscos e aderência ao domínio ambiental/educacional). | Controle de qualidade focado principalmente no nível do código (testes automatizados) e interface. |
| Escalabilidade | Perfeito para micro e pequenas equipes, fornecendo a estrutura e divisão de trabalho exatas para evitar sobrecarga. | Focado em equipes ágeis pequenas e coesas, com baixíssima necessidade de governança externa. |
| Suporte a Equipes de Desenvolvimento | Ajuda desenvolvedores a entenderem responsabilidades, dividindo o trabalho em papéis bem delimitados. | Exige maior maturidade técnica da equipe para auto-organização, pois depende de alta disciplina em técnicas como TDD. |

## 3.3. Justificativa

Com base nas restrições de prazo, no tamanho reduzido da equipe (5 membros) e na natureza acadêmica do projeto EcoQuest, o OpenUP (Open Unified Process) é o processo mais adequado pelos seguintes motivos:

**Ciclo de Vida Adaptativo:**
Como o projeto exige a validação de mecânicas de gamificação e engajamento, as fases iniciais precisam ser altamente focadas na validação com a cliente. O OpenUP atende a essa necessidade por possuir uma abordagem híbrida: permite iniciar o projeto de forma experimental e exploratória para entender o valor esperado e, uma vez que o escopo seja definido e validado, transacionar para um processo de construção altamente estruturado.

**Rigor Documental e Natureza Acadêmica:**
O projeto possui exigências avaliativas e formais inegociáveis. Diferente de abordagens como o DSDM, que seria atrativo para o prazo de 12 semanas, mas prioriza o código em detrimento da documentação, o OpenUP une a rastreabilidade estruturada do RUP com a cadência adaptativa dos métodos ágeis. Isso garante a produção progressiva de documentação e artefatos formais conforme o entendimento do sistema evolui, sem engessar a equipe.

**Critérios de Transição Claros e Mitigação de Riscos:**
Com uma equipe de apenas 5 pessoas, qualquer retrabalho na fase de código pode estourar o limite de 12 semanas. O OpenUP foca em um planejamento detalhado logo no início e estabelece critérios de transição rigorosos entre suas fases. Isso força a equipe a realizar uma avaliação contínua de riscos e a garantir o Sign-off dos requisitos antes de iniciar o desenvolvimento técnico pesado.

**Foco na Entrega de Valor em Prazos Curtos:**
O framework permite que uma equipe pequena adapte o contexto metodológico a cada fase. Ao focar primeiro na descoberta do problema e manter uma forte colaboração síncrona/assíncrona com a cliente, os 5 membros conseguem otimizar seus esforços para codificar e entregar estritamente o MVP, garantindo a entrega de valor real dentro do tempo hábil.