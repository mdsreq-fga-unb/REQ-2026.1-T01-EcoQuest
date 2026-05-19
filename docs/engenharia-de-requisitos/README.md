## 4.1 Atividades e Técnicas de ER

### Elicitação e Descoberta

- **Entrevistas com cliente:** utilizadas para compreender o problema do baixo engajamento em práticas sustentáveis, levantar necessidades do sistema e identificar expectativas em relação à solução proposta.
- **Brainstorming:** utilizado pela equipe para discutir ideias de funcionalidades e estratégias de gamificação adequadas ao contexto do EcoQuest.
- **Análise de domínio:** utilizada para compreender melhor o contexto acadêmico e ambiental do projeto, garantindo que os requisitos estejam alinhados ao propósito da solução.

### Análise e Consenso

- **Discussões em equipe:** utilizadas para alinhar o entendimento sobre os requisitos levantados e avaliar sua viabilidade no contexto do projeto.
- **Priorização MoSCoW:** utilizada para classificar os requisitos conforme sua importância para o MVP, distinguindo funcionalidades essenciais das desejáveis.
- **Análise de custo-benefício:** utilizada para apoiar decisões sobre o escopo da solução, considerando esforço, valor entregue e limitações do projeto.

### Declaração de Requisitos

- **User Stories:** utilizadas para registrar os requisitos de forma clara, objetiva e orientada ao valor entregue ao usuário.
- **Casos de Uso de alto nível:** utilizados para complementar a descrição das funcionalidades principais do sistema e representar as interações mais relevantes.
- **Critérios de aceitação:** utilizados para detalhar as condições que cada requisito deve atender para ser considerado válido e pronto para desenvolvimento.

Para manter consistência entre ER e desenvolvimento, o projeto utiliza **DoR/DoD** como critérios de prontidão e conclusão dos requisitos, conectando cada história aos objetivos (OE) e às características do produto (CP). As checklists estão em [DoR e DoD](../dor-e-dod/).

### Representação de Requisitos

- **Protótipos:** utilizados para representar visualmente as principais funcionalidades do sistema antes da implementação.
- **Wireframes:** utilizados para estruturar as telas e os fluxos de navegação do EcoQuest.
- **Diagramas UML:** utilizados para complementar a representação dos requisitos e facilitar a comunicação entre os membros da equipe.

### Verificação e Validação de Requisitos

- **DoR (Definition of Ready):** utilizado para verificar se os requisitos estão claros, completos, consistentes, rastreáveis e prontos para seguir no fluxo de desenvolvimento. O DoR confirma se cada item possui objetivo, ator, prioridade, critérios de aceitação, regras de negócio e relação com OE e CP antes de ser assumido pela equipe.
- **Revisão de critérios de aceitação:** utilizada para verificar se os critérios definidos são claros, verificáveis e coerentes com os objetivos do projeto.
- **Feedback com stakeholders:** utilizado para validar se os requisitos refletem corretamente as necessidades da cliente e dos demais stakeholders do EcoQuest.
- **Testes:** utilizados posteriormente para verificar se as funcionalidades implementadas atendem aos requisitos e critérios de aceitação definidos.

## 4.2 Engenharia de Requisitos e o OpenUP

A Engenharia de Requisitos (ER) do projeto foi estruturada em alinhamento com o processo **OpenUP**  e com a abordagem híbrida definida. Dessa forma, as atividades de ER são realizadas de forma iterativa e incremental, com maior foco exploratório nas fases iniciais e maior formalização e controle nas fases posteriores.

Considerando o contexto do projeto, uma plataforma gamificada voltada ao engajamento em práticas sustentáveis, as atividades de ER também priorizam a validação contínua com stakeholders e a mitigação de riscos, especialmente relacionados à validação de atividades e ao engajamento dos usuários.

A tabela a seguir apresenta o mapeamento entre as fases do OpenUP, as atividades de ER, práticas, técnicas e os resultados esperados.

| Fases do Processo | Atividades ER | Prática | Técnica | Resultado Esperado |
|------------------|--------------|--------|--------|-------------------|
| **Concepção** | Elicitação e Descoberta | Levantamento inicial de requisitos | Entrevistas com cliente, Brainstorming | Identificação do problema (baixo engajamento) e definição dos requisitos iniciais |
|  | Análise e Consenso | Alinhamento com stakeholders | Discussões em equipe, Priorização MoSCoW | Definição das funcionalidades essenciais para o MVP |
|  | Declaração de Requisitos | Formalização inicial | User Stories, Casos de Uso de alto nível | Registro inicial das funcionalidades (missões, pontuação, validação) |
|  | Organização e Atualização | Estruturação inicial | Criação do backlog | Backlog inicial priorizado e alinhado com os objetivos do projeto |
|  | Verificação e Validação | Avaliação inicial dos requisitos | DoR, revisão de critérios de aceitação, feedback com stakeholders | Confirmação inicial de clareza, consistência, rastreabilidade e alinhamento dos requisitos |
| **Elaboração** | Elicitação e Descoberta | Refinamento dos requisitos | Entrevistas detalhadas, Análise de domínio | Requisitos mais claros e alinhados ao contexto acadêmico e ambiental |
|  | Análise e Consenso | Avaliação de viabilidade | Análise de custo-benefício, Discussões técnicas | Definição do escopo viável (MVP) |
|  | Representação de Requisitos | Modelagem da solução | Protótipos, Wireframes, Diagramas UML | Visualização das funcionalidades (quests, ranking, progresso) |
|  | Declaração de Requisitos | Detalhamento | Critérios de aceitação, Especificação de requisitos | Requisitos prontos para desenvolvimento |
|  | Verificação e Validação | Revisão dos requisitos refinados | DoR, revisão de critérios de aceitação, feedback com stakeholders | Confirmação de que os requisitos refinados estão claros, verificáveis e alinhados às necessidades dos stakeholders |
|  | Organização e Atualização | Refinamento e controle dos requisitos | Atualização do backlog, versionamento, DoR | Requisitos refinados, priorizados e preparados para avançar no desenvolvimento |
| **Construção** | Representação de Requisitos | Apoio à implementação | Protótipos evolutivos | Melhor entendimento das funcionalidades pela equipe |
|  | Elicitação e Descoberta | Descoberta de ajustes durante a construção | Feedback de uso, revisões com stakeholders, análise de novas necessidades | Identificação de ajustes, lacunas e novas informações surgidas durante a implementação |
|  | Declaração de Requisitos | Atualização da especificação durante a implementação | Ajuste de requisitos, critérios de aceitação e regras de negócio | Requisitos mantidos consistentes com as decisões e aprendizados da construção |
|  | Verificação da implementação | Conferência do incremento | Testes funcionais e testes de aceitação | Garantia de que a implementação atende aos requisitos especificados |
|  | Organização e Atualização | Controle de mudanças | Atualização do backlog, versionamento | Ajustes contínuos com base no feedback |
|  | Análise e Consenso | Ajustes incrementais | Reuniões de acompanhamento | Correção de problemas e melhoria do sistema |
| **Transição** | Validação com stakeholder | Aceite final | Feedback e aceite do cliente | Confirmação de que o sistema atende aos objetivos |
|  | Organização e Atualização | Ajustes finais | Correções baseadas em feedback | Sistema refinado e pronto para uso |
|  | Declaração de Requisitos | Consolidação | Documentação final | Requisitos formalizados e rastreáveis |
|  | Representação de Requisitos | Documentação final | Diagramas atualizados | Visão final consistente do sistema |
