# 5. Cronograma e Entregas

A partir da estratégia de desenvolvimento estabelecida e utilizando o framework OpenUP, o projeto EcoQuest adota um ciclo de vida adaptativo. O fluxo de trabalho é estruturado em iterações semanais, garantindo entregas contínuas e mitigação precoce de riscos, com definição clara das fases e de suas transições.

Para que o processo não gere sobrecarga na agenda da cliente, as validações ocorrerão de forma síncrona e assíncrona, ancoradas em um *Acordo de Nível de Serviço* de feedback:

**Terças-feiras:** Envio dos incrementos (documentais ou de software) para a cliente.

**Segundas-feiras:** Reuniões síncronas internas da equipe de desenvolvimento para processamento do feedback, análise de viabilidade e planejamento da próxima iteração.

As iterações iniciais da Fase de Iniciação têm ênfase em elicitação e análise do domínio e dos requisitos. Contudo, em conformidade com o ciclo de vida do OpenUP, o refinamento dos requisitos ocorre ao longo de todo o projeto, com especial atenção à mitigação de riscos arquiteturais antes do avanço para a Fase de Construção. A seguir, apresenta-se o cronograma com suas fases, objetivos e resultados esperados:

| Iteração | Início | Fim | Objetivo Principal (Fase OpenUP / Atividade ER) | Entregas Esperadas | Validação do Cliente |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Iteração 1** | 13/04/2026 | 19/04/2026 | **Fase de Iniciação** Levantamento profundo do domínio de sustentabilidade e perfil de usuários. | Identificação clara do problema. Esboço inicial das missões e perfil de usuários. | Validação inicial do entendimento do problema e domínio ambiental. |
| **Iteração 2** | 20/04/2026 | 26/04/2026 | **Fase de Iniciação** Alinhamento com stakeholders e priorização de requisitos (MoSCoW). | Definição das funcionalidades essenciais para o MVP (Mínimo Produto Viável). | Revisão do escopo e confirmação das prioridades essenciais. |
| **Iteração 3** | 27/04/2026 | 03/05/2026 | **Fase de Elaboração** Formalização inicial de requisitos e definição da arquitetura técnica. | Lista de Itens de Trabalho inicial estruturada. Configuração da arquitetura técnica e ambiente de desenvolvimento. | Cliente valida a baseline inicial de requisitos priorizados. |
| **Iteração 4** | 04/05/2026 | 10/05/2026 | **Fase de Elaboração** Modelagem da solução e início da codificação sobre a arquitetura estabelecida. | Protótipos visuais de interface. Inicialização da produção de código e banco de dados; criação do CRUD básico para usuário e administrador. | Feedback sobre navegação e usabilidade das telas desenhadas. |
| **Iteração 5** | 11/05/2026 | 17/05/2026 | **Fase de Elaboração** Detalhamento de requisitos e apoio à implementação dos módulos de acesso. | Módulo de Autenticação e Perfis de Usuário. Alterações nos protótipos baseadas nos feedbacks. | Avaliação da fluidez do processo de cadastro e acesso ao sistema. |
| **Iteração 6** | 18/05/2026 | 24/05/2026 | **Fase de Elaboração** Implementação do núcleo funcional e execução dos primeiros testes de integração para mitigação de riscos técnicos. | Implementação do Motor de Missões (Quests diárias/semanais). | Validação do fluxo de aceite e leitura das missões sustentáveis. |
| **Iteração 7** | 25/05/2026 | 31/05/2026 | **Fase de Construção** Primeira Entrega Parcial: integração do módulo de validação de missões. | Entrega Parcial 1: Integração do sistema de captura de imagens para validação de missões concluídas. | Teste de uso e do sistema de captura em tempo real para validação das atividades. |
| **Iteração 8** | 01/06/2026 | 07/06/2026 | **Fase de Construção** Verificação e validação contínua do fluxo incremental desenvolvido. | Especificação comportamental técnica finalizada e testes integrados do fluxo desenvolvido até aqui. | Feedback sobre possíveis inconsistências encontradas no fluxo de missões. |
| **Iteração 9** | 08/06/2026 | 14/06/2026 | **Fase de Construção** Desenvolvimento do Módulo de Gamificação e mecanismos de engajamento do usuário. | Módulo de Gamificação. Mecanismos de progressão e engajamento do usuário (detalhamento na Lista de Itens de Trabalho). | Validação do balanceamento de pontos e sensação de recompensa. |
| **Iteração 10** | 15/06/2026 | 21/06/2026 | **Fase de Construção** Segunda Entrega Parcial: componentes sociais e de reconhecimento da plataforma. | Entrega Parcial 2: Módulo Social e de Conquistas. Placar de líderes e painel de conquistas (detalhamento na Lista de Itens de Trabalho). | Avaliação da interface do ranking e da competitividade saudável gerada. |
| **Iteração 11** | 22/06/2026 | 28/06/2026 | **Fase de Construção** Ajustes incrementais com foco em usabilidade, correção de defeitos e testes ponta a ponta. | Consolidação dos diagramas arquiteturais. Testes ponta a ponta realizados pela equipe. | Validação final de interface do MVP com o usuário em ambiente de homologação. |
| **Iteração 12** | 29/06/2026 | 05/07/2026 | **Fase de Transição** Publicação, homologação final e encerramento do projeto. | Entrega Final: MVP funcional, documentado, codificado, testado e publicado. | Homologação Final: Confirmação de que o sistema atende aos objetivos traçados. |


**Considerações sobre o cronograma:**
O projeto é guiado por liberações progressivas de valor. As funcionalidades de núcleo, o motor de missões sustentáveis, a validação por mecanismo de captura em tempo real e a estrutura de gamificação, serão entregues e testadas em produção ou ambiente de homologação de forma incremental (Iterações 7, 10 e 12).

Essa estratégia de fatiamento garante que a mitigação de riscos operacionais, especialmente no que tange ao engajamento prático do jovem na plataforma, seja aferida continuamente através do uso real da aplicação, permitindo ajustes de rota e refinamentos na Lista de Itens de Trabalho antes do lançamento final do MVP.