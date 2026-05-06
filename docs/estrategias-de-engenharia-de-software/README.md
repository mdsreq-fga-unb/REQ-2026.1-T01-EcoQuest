# 3. Estratégias de Engenharia de Software

## 3.1. Estratégia Priorizada

- **Abordagem:** Híbrida
- **Ciclo de Vida:** Adaptativo
- **Processo:** OpenUP
- **Mecanismo de Gestão de Fluxo:** Kanban
---

## 3.2. Quadro Comparativo

| Características | OpenUP (Open Unified Process) | Scrum |
|---|---|---|
| **Abordagem Geral** | Iterativo, incremental, centrado na arquitetura, com mitigação precoce de riscos e fases formalmente definidas. | Iterativo e incremental, organizado em Sprints de duração fixa, com forte ênfase na auto-organização da equipe e entrega contínua de valor. |
| **Foco em Arquitetura** | Forte ênfase na definição e estabilização de uma arquitetura executável nas fases iniciais, reduzindo riscos técnicos antes da Construção. | A arquitetura emerge organicamente ao longo das Sprints, sem uma fase dedicada à sua estabilização prévia. |
| **Estrutura de Fases** | Quatro fases bem definidas (Iniciação, Elaboração, Construção, Transição) com critérios de transição rigorosos e marcos formais. | Não possui fases formais. O ciclo de vida é composto por Sprints contínuas, sem distinção estrutural de etapas do projeto. |
| **Flexibilidade de Requisitos** | Alta flexibilidade nas fases iniciais. Ao final da Elaboração, exige estabilização da arquitetura e do escopo essencial, mas permite a evolução contínua de requisitos durante a Construção. | Alta flexibilidade em qualquer ponto do projeto. O Product Backlog pode ser reordenado e modificado a cada Sprint, o que favorece projetos com requisitos altamente voláteis. |
| **Colaboração com Cliente** | Exige alinhamento contínuo com os stakeholders, especialmente nas validações de entregas parciais e nas viradas de fase. | Interação constante com o Product Owner para priorização e refinamento do Backlog, seguindo os princípios do Manifesto Ágil. |
| **Papéis e Responsabilidades** | Define papéis claros e delimitados (Analista, Arquiteto, Desenvolvedor, Testador, Gerente de Projeto), facilitando a divisão de trabalho em equipes pequenas. | Define apenas três papéis (Product Owner, Scrum Master, Time de Desenvolvimento), exigindo maior generalismo técnico e maturidade da equipe para a auto-organização. |
| **Complexidade do Processo** | Equilibra agilidade com rigor formal. Mais pesado que o Scrum em termos de artefatos e cerimônias, o que pode representar custo de entrada para equipes sem experiência prévia. | Processo mais simples e leve de adotar. Sua estrutura minimalista reduz a curva de aprendizado, sendo uma das metodologias mais amplamente utilizadas na indústria. |
| **Qualidade Técnica** | Assegurada pela validação arquitetural precoce, revisões de escopo e testes integrados a cada iteração. | Dependente de práticas complementares para garantir qualidade técnica. O Scrum em si não prescreve práticas de engenharia de software. |
| **Documentação** | Progressiva e fundamental. Gera os artefatos formais necessários para comprovar a transição de fases e rastrear decisões arquiteturais. | Minimalista por concepção. Prioriza software funcionando sobre documentação abrangente; artefatos formais precisam ser adicionados explicitamente pela equipe. |
| **Controle de Qualidade** | Validações embutidas nos marcos do projeto, com avaliação de riscos técnicos e aderência ao domínio. | Controle de qualidade realizado via cerimônias de Sprint Review e Definition of Done, com foco na entrega de incrementos potencialmente publicáveis. |
| **Escalabilidade** | Projetado para micro e pequenas equipes, fornecendo estrutura e divisão de trabalho suficientes para evitar sobrecarga sem necessidade de frameworks adicionais. | Escala bem em equipes pequenas e, com frameworks como SAFe ou LeSS, também em organizações maiores. Para equipes de 5 pessoas, pode ser subutilizado em sua estrutura de cerimônias. |
| **Adaptação ao Projeto** | Une a cadência ágil de entregas em 12 semanas com o rigor documental exigido pelo ambiente acadêmico, estruturando bem os papéis de uma equipe de 5 membros. | Favorece o ritmo de entrega, mas não prescreve documentação formal, o que pode gerar penalidades em contextos acadêmicos sem esforço adicional explícito da equipe. |

---

## 3.3. Alinhamento com o Manifesto Ágil

A escolha pelo OpenUP não representa um afastamento dos valores ágeis. Conforme demonstrado por Balduino (2006), os princípios fundamentais do OpenUP encontram correspondência direta com as declarações do Manifesto Ágil:

**Tabela 1 – Paralelo entre o OpenUP e o Manifesto Ágil**

| Princípio OpenUP | Declaração do Manifesto Ágil |
|---|---|
| Colaborar para alinhar os interesses e compartilhar o entendimento. | Indivíduos e interações mais que processos e ferramentas. |
| Equilibrar as prioridades concorrentes para maximizar o valor para os stakeholders. | Colaboração com o cliente mais que negociação de contratos. |
| Focar na arquitetura desde o início para minimizar os riscos e organizar o desenvolvimento. | Software em funcionamento mais que documentação abrangente. |
| Evoluir continuamente para obter feedback e melhorar. | Responder a mudanças mais que seguir um plano. |

Fonte: BALDUINO, Ricardo. *Introduction to OpenUP (Open Unified Process)*. Eclipse Foundation, 2006.

Essa correspondência reforça que o OpenUP não é um processo burocrático oposto à agilidade, mas sim uma instância formal e estruturada dos mesmos valores, o que o torna especialmente adequado para projetos que precisam conciliar entrega ágil de valor com rastreabilidade documental formal.

---

## 3.4. Justificativa

Com base nas restrições de prazo, no tamanho reduzido da equipe (5 membros) e na natureza acadêmica do projeto EcoQuest, o OpenUP (Open Unified Process) é o processo mais adequado pelos seguintes motivos:

**Ciclo de Vida Adaptativo:**
Como o projeto exige a validação de mecânicas de gamificação e engajamento, as fases iniciais precisam ser altamente focadas na validação com a cliente. O OpenUP atende a essa necessidade por possuir uma abordagem híbrida: permite iniciar o projeto de forma experimental e exploratória para entender o valor esperado e, uma vez que o escopo essencial seja definido e a arquitetura estabilizada, transacionar para um processo de construção estruturado sem interromper a evolução dos requisitos.

**Rigor Documental e Natureza Acadêmica:**
O projeto possui exigências avaliativas e formais inegociáveis. Diferente de abordagens como o DSDM, atrativo para o prazo de 12 semanas, mas orientado à minimização documental, o OpenUP une a rastreabilidade estruturada do RUP com a cadência adaptativa dos métodos ágeis. Isso garante a produção progressiva de documentação e artefatos formais conforme o entendimento do sistema evolui, sem engessar a equipe.

**Critérios de Transição Claros e Mitigação de Riscos:**
Com uma equipe de apenas 5 pessoas, qualquer retrabalho na fase de código pode estourar o limite de 12 semanas. O OpenUP estabelece critérios de transição rigorosos entre suas fases, forçando a equipe a realizar avaliação contínua de riscos e a garantir a estabilização da arquitetura e do escopo essencial antes de iniciar o desenvolvimento técnico pesado, contudo, sem congelar os requisitos de forma definitiva.

**Foco na Entrega de Valor em Prazos Curtos:**
O framework permite que uma equipe pequena adapte o contexto metodológico a cada fase. Ao focar primeiro na descoberta do problema e manter uma forte colaboração síncrona/assíncrona com a cliente, os 5 membros conseguem otimizar seus esforços para codificar e entregar estritamente o MVP, garantindo a entrega de valor real dentro do tempo hábil. O Kanban, adotado como mecanismo de gestão de fluxo, complementa esse esforço ao tornar visível o progresso das tarefas em cada iteração e sinalizar gargalos antes que se tornem riscos de prazo.

> **Nota sobre o papel do Kanban:** O Kanban não atua como processo ou ciclo de vida no contexto deste projeto. Ele é utilizado como mecanismo de gestão visual do fluxo de trabalho dentro das iterações OpenUP, permitindo à equipe limitar o trabalho em progresso (WIP), identificar gargalos e manter a cadência de entrega contínua. Dessa forma, complementa o OpenUP sem substituí-lo nem contradizer sua estrutura de fases.
