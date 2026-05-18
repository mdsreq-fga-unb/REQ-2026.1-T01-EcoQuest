### Definition of Ready (DoR) - Pronto para Iniciar

#### Domínio 1: Dimensão de Clareza

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Verifica se o "o quê" e o "por quê" estão absolutos e inquestionáveis para toda a equipe. Garante que o valor de negócio e os parâmetros de aceitação não sejam dúbios.
    
*   **Fonte teórica:** _Engenharia de Requisitos_ (Ian Sommerville) e _User Stories Applied_ (Mike Cohn).
    
*   **A Frase:** "Sem essa dimensão, a equipe constrói a funcionalidade errada com perfeição."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

Cada pergunta abaixo é verificada individualmente na cerimônia de
comprometimento. A resposta "Não" em qualquer uma delas bloqueia o
item antes do Commitment Point.

**C1 — Ator e Objetivo**
- O ator está nomeado, seu papel está descrito e seu objetivo de negócio está explícito na US?

**C2 — Priorização**
- O IP foi calculado, o quadrante definido e a classificação MoSCoW registrada no backlog?

**C3 — Critérios de Aceitação**
- Os critérios de aceitação existem, estão no formato verificável (Dado / Quando / Então) e estão rastreados ao OE e CP correspondentes?

**C4 — Regras de Negócio** As regras de negócio específicas do domínio (missões, tokens, gamificação) que afetam esta US estão documentadas e compreendidas por todos os membros da equipe?

**C5 — Validação**
- O validador, o canal de validação e o critério de aprovação estão definidos e registrados na US?

**Artefato obrigatório para "Sim" em todas:**
US formalmente preenchida na ferramenta de gestão com IP calculado
na Tabela de Priorização, ACs mapeados aos OE/CP correspondentes,
regras de negócio documentadas e campo de validação preenchido.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Falha de Ator/Regra Ambígua:** A **US06 — Localizar PEVs** solicita a exibição de pontos no mapa, mas não especifica qual é o raio de distância padrão a ser carregado inicialmente (5km? 10km?) nem se a ordenação deve ser por proximidade geográfica ou por tipo de material reciclável aceito, deixando a regra de completude de negócio ambígua.
    
*   **Falha de Fluxo Alternativo/AC Incompleto:** A **US08 — Ler Token de Doação** não especifica o que acontece quando o token está expirado, já foi lido anteriormente ou pertence a outro usuário. O ator está nomeado, mas a falta desses fluxos de exceção torna os critérios de aceitação incompletos para aprovação.
  
**CAMADA 4 — FLUXO DE RESOLUÇÃO**

*   **Diagrama de Decisão:**
    
    *   _Se NÃO_ ➔ O item é imediatamente bloqueado na coluna de Refinamento.
        
    *   _Ação:_ A equipe revisa a US com o cliente.
        
    *   _Registro:_ Issue sinalizada com _tag_ "Bloqueado - Falta Clareza". Só retorna à Planning após revisão de completude de negócio.
  
#### Domínio 2: Dimensão de Viabilidade

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Garante que não existem bloqueadores externos, de infraestrutura ou de dependência sistêmica que impeçam o início imediato e a fluidez do desenvolvimento.
    
*   **Fonte teórica:** _Kanban: Successful Evolutionary Change for Your Technology Business_ (David J. Anderson) - Gestão de Gargalos e Classes de Serviço.
    
*   **A Frase:** "Sem essa dimensão, o desenvolvedor puxa o item e fica ocioso no meio da sprint esperando uma liberação."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** Todas as dependências técnicas para esta US foram concluídas e não há nenhum impedimento de infraestrutura sem plano de mitigação ativo?
    
*   **Artefato obrigatório:** Matriz de dependências validada e checklist de acessos/ambientes com status "Liberado" no card.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Dependência Externa Não Mapeada:** A **US10 — Catálogo de recompensas** depende da integração com o sistema ou API de um parceiro/patrocinador para listar os itens disponíveis, mas as chaves de acesso a essa API de homologação e a documentação do endpoint ainda não foram disponibilizadas.
    
*   **Impedimento de Infraestrutura:** A **US06 — Localizar PEVs** requer o uso de uma API de Geolocalização/Mapas (ex: Google Maps API), mas a equipe não possui a cota de uso ou o cartão de crédito cadastrado na nuvem para realizar os testes de desenvolvimento local.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

- *Se NÃO* ➔ O item não cruza o Commitment Point do Kanban.

- *Ação:* Um membro da equipe, definido por disponibilidade ou
  afinidade prévia com a cliente, assume a responsabilidade de
  contatar terceiros ou reordenar o backlog para que a dependência
  seja desenvolvida primeiro.

- *Registro:* Item marcado com label `dependencia-ativa` na
  ferramenta de gestão, com nome do responsável e prazo de
  resolução registrados no card.

#### Domínio 3: Dimensão de Estimabilidade

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Confirma que a equipe possui o domínio técnico necessário para prever o esforço (ES) e a complexidade técnica (CX), essenciais para o cálculo do Índice de Prioridade (IP).
    
*   **Fonte teórica:** _Agile Estimating and Planning_ (Mike Cohn) e a heurística _INVEST_ (Bill Wake).
    
*   **A Frase:** "Sem essa dimensão, o cronograma e os OKRs tornam-se ficção e os prazos explodem."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** A equipe consegue quantificar de forma consensual o esforço total, incluindo validação, passando em todos os crivos do acrônimo INVEST?
    
*   **Artefato obrigatório:** Valores de CX e ES preenchidos na Tabela de Priorização e acatados pela dupla de desenvolvimento.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Lacuna Técnica Indefinida:** A **US15 — Visualizar Painel de Impacto Pessoal** (PT 3) exige a consolidação de dados de todo o histórico do usuário. A equipe ainda não decidiu se utilizará uma _view_ materializada no banco relacional ou se consolidará isso via código, gerando uma incerteza técnica que inviabiliza cravar se o Esforço (ES) será 3 ou 5.
    
*   **Item Grande Demais (Fere o 'S' do INVEST):** A **US05 — Excluir conta** tem PT 4. A equipe percebeu que excluir a conta envolve apagar a autenticação, mas _anonimizar_ as doações passadas (para manter estatísticas de impacto sem ferir a LGPD). O esforço é muito grande para um ciclo só e a US precisa ser dividida.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

*   **Diagrama de Decisão:**
    
    *   _Se NÃO_ ➔ Identificar qual das 3 raízes causou a falha.
        
    *   _Ação:_
        
        *   Se Requisito Vago ➔ Retorna à Clareza.
            
        *   Se Lacuna Técnica ➔ Abre-se uma _Issue de Spike_ (Pesquisa Técnica Timeboxed) atribuída a um Dev. O item principal espera.
            
        *   Se Grande Demais ➔ PO e Equipe quebram (Split) a US em duas ou mais menores.
    
#### Domínio 4: Dimensão de Escopo

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Garante o alinhamento mental compartilhado da equipe sobre a arquitetura da solução e se o "tamanho" físico do trabalho cabe no ciclo de entrega.
    
*   **Fonte teórica:** _User Story Mapping_ (Jeff Patton).
    
*   **A Frase:** "Sem essa dimensão, desenvolvedores diferentes constroem soluções conflitantes para o mesmo problema dentro do mesmo ciclo."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** Cada desenvolvedor escalado consegue explicar agora mesmo, sem fazer perguntas, exatamente o que vai construir, como vai testar, e atestar que isso cabe nesta iteração?
    
*   **Artefato obrigatório:** Estimativas de horas por tarefa anexadas à US na ferramenta de gestão, com detalhamento suficiente para que qualquer membro da equipe consiga responder o que será construído, como será testado e em quanto tempo, sem fazer perguntas adicionais.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Assimetria de Entendimento:** Durante a quebra de tarefas da **US13 — Exibir Progresso Mensal**, o Front-end estimou construir gráficos interativos complexos, enquanto o Back-end estimou apenas devolver um JSON com totais simples. A equipe não tem a mesma visão arquitetural do que será entregue.
    
*   **Estouro de Capacidade:** A equipe quer puxar as **US03, US05 e US08** na mesma iteração. Somando a Complexidade (CX) e o Esforço (ES), a carga de testes de fluxos alternativos ultrapassa a velocidade histórica da equipe de validação em um ciclo semanal.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

*   **Diagrama de Decisão:**
    
    *   _Se NÃO_ ➔ O item é ejetado do planejamento da Iteração atual.
        
    *   _Ação:_ Nível de equipe -> Retorna para refinamento imediato (lousa/design do fluxo). Nível individual -> Abre-se uma _Issue de Estudo/Verificação_.
        
    *   _Registro:_ Repriorizado na base do Backlog Geral aguardando o próximo ciclo.
  
### Definition of Done (DoD) - Pronto para Entregar

#### Domínio 5: Dimensão de Completude Funcional (RF)

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Valida se a engenharia construída executa perfeitamente o comportamento exigido pelos Critérios de Aceite e Casos de Uso.
    
*   **Fonte teórica:** _Behavior-Driven Development_ (Dan North) e OpenUP (Foco em Casos de Uso).
    
*   **A Frase:** "Sem essa dimensão, entregamos código que roda na máquina, mas não resolve a dor do cliente."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** Todos os fluxos principais e alternativos da US foram codificados e contemplados sem gambiarras ou caminhos felizes exclusivos?
    
*   **Artefato obrigatório:** Software operando em ambiente de teste reproduzindo 100% dos fluxos documentados na US.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Caminho Feliz Exclusivo:** Na **US02 — Autenticar usuário**, o login com credenciais válidas funciona perfeitamente e o token é gerado, mas o fluxo de erro que deveria bloquear a conta após 5 tentativas incorretas consecutivas (descrito no Caso de Uso) não foi codificado.
    
*   **Incompletude de Transação:** Na **US11 — Resgatar Recompensa**, a interface exibe a mensagem de sucesso e gera o comprovante, mas o código falha em descontar o saldo de pontos do perfil do usuário no banco de dados.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

*   **Diagrama de Decisão:**
    
    *   _Se NÃO_ ➔ A US permanece na coluna de "Em Teste/Revisão".
        
    *   _Ação:_ O desenvolvedor recebe o feedback exato do fluxo que falhou e ajusta o código na branch da _feature_.
        
    *   _Registro:_ Comentário técnico apontando a falha de completude anexado ao _Pull Request_.
  
#### Domínio 6: Dimensão de Qualidade Técnica (RNF)

**Pré-requisito documental mandatório**

Este critério só é verificável se os Requisitos Não Funcionais (RNFs)
do projeto possuírem parâmetros mensuráveis definidos na
Especificação Suplementar. Exemplos de parâmetros aceitáveis:

- Desempenho: tempo de resposta máximo de X segundos para operação Y
- Segurança: algoritmo de hash mínimo Z para senhas
- Usabilidade: padrão de referência W como critério de conformidade

**RNFs sem parâmetros mensuráveis tornam este critério de DoD
inverificável.**

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Assegura que o sistema não apenas funciona, mas obedece a restrições arquiteturais rigorosas (URPS+). Impede a degradação silenciosa do projeto.
    
*   **Fonte teórica:** _Software Architecture in Practice_ (Len Bass, Paul Clements, Rick Kazman).
    
*   **A Frase:** "Sem essa dimensão, criamos um sistema rápido hoje que será impossível de manter, escalar ou proteger amanhã."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** Os parâmetros mensuráveis definidos nos RNFs (Desempenho, Segurança, Usabilidade) ligados a esta funcionalidade foram aferidos e validados?
    
*   **Artefato obrigatório:** Relatório de _linter_, análise estática de código ou aprovação em checklist rigoroso de RNF documentado.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Violação de Desempenho:** A **US16 — Consultar Estatísticas do Impacto da Comunidade** está demorando 8 segundos para processar a agregação de dados de todos os PEVs e carregar a tela, violando o RNF arquitetural que estipula um tempo de resposta máximo de 5 segundos para relatórios web.
    
*   **Violação de Segurança:** A **US01 — Cadastrar usuário** está salvando a senha em texto plano (ou usando um hash obsoleto) no banco de dados, falhando no checklist de segurança estipulado pela arquitetura de software.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

- *Se NÃO* ➔ Bloqueio imediato de liberação para homologação.

- *Ação:* Refatoração técnica por parte da dupla ou membro
  assignado à US.

- *Registro:* Tarefa de refatoração criada e associada à US pai
  na ferramenta de gestão.
  
#### Domínio 7: Dimensão de Validação

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Institui a governança de engenharia. Valida a inexistência de regressões no código e atesta formalmente a aderência da solução aos olhos do usuário final (KR).
    
*   **Fonte teórica:** _Test-Driven Development_ (Kent Beck) e Scrum Guide.
    
*   **A Frase:** "Sem essa dimensão, o custo e o estresse para consertar _bugs_ em produção destroem a moral da equipe."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** Os testes unitários estão passando, o _Code Review_ foi aprovado e o cliente validou (síncrona ou assincronamente) o incremento visual/regra de negócio?
    
*   **Artefato obrigatório:** Relatório de Cobertura de Testes (verde), _Pull Request_ assinado por um par, e Ata/Registro de Aceite do cliente.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Uso Incorreto de Test Doubles:** Os testes unitários da **US08 — Ler Token de Doação** não utilizaram um _Mock_ ou _Spy_ adequadamente isolado na camada de validação do PubSub. Em vez de simular, o teste está tentando realizar requisições reais de leitura, quebrando a estrutura AAA (Arrange, Act, Assert).
    
*   **Rejeição do Cliente:** A **US04 — Gerenciar Perfil** foi implementada e validada internamente. Contudo, ao validar sincronamente, o cliente apontou que o fluxo de edição de dados é tão confuso que não diminuiu os chamados de suporte técnico, não atingindo o KR esperado para a funcionalidade.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

- *Se NÃO* ➔ Intervenção baseada na origem do erro:

  - **Se Teste Falhou** → O desenvolvedor refatora o código de teste e resubmete para revisão.

  - **Se Cliente Rejeitou** → A US original é fechada como entregue (se atendeu aos requisitos iniciais conforme ACsdocumentados) e abre-se um novo ticket de Ajuste/Melhoria no backlog. Caso a rejeição evidencie erro claro de construção, implementação divergente dos ACs acordados, a própria US é reciclada para correção antes do fechamento.

- *Registro:* Comentário técnico no Pull Request detalhando a origem da falha e a ação tomada.

#### Domínio 8: Dimensão de Documentação

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Garante que o conhecimento institucional sobreviva às mudanças de equipe. Evita o legado "caixa-preta".
    
*   **Fonte teórica:** _Documenting Software Architectures_ (Paul Clements et al.) e OpenUP.
    
*   **A Frase:** "Sem essa dimensão, o sistema pertence a quem o programou, e não à organização."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** A rastreabilidade (Backlog -> US -> OE/CP -> AC) está registrada e a documentação técnica (arquitetura, manuais) foi atualizada de acordo com a nova entrega?
    
*   **Artefato obrigatório:** Links de rastreabilidade atualizados e _commits_ submetidos e mesclados nos repositórios de documentação (ex: MkDocs).
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA**

*   **Assincronia Arquitetural (Dicionário de Dados):** A **US14 — Configurar Anonimato** inseriu uma nova coluna booleana is\_anonymous na tabela de usuários e alterou as rotas de impacto. No entanto, o repositório de documentação oficial do projeto continua refletindo a versão anterior da API.
    
*   **Falha de Rastreabilidade:** O _Pull Request_ da **US10 — Catálogo de recompensas** não faz referência direta ao ID da história de usuário, quebrando o elo rastreável entre a Característica de Produto (CP) exigida, os requisitos e o código versionado.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

*   **Diagrama de Decisão:**
    
    *   _Se NÃO_ ➔ A US não pode receber o status de "Done".
        
    *   _Ação:_ O desenvolvedor que finalizou o código tem a obrigação de gerar a documentação ou acionar o gerente de documentação/processos do time.
        
    *   _Registro:_ Impede o encerramento da Sprint/Iteração para este card específico.
  
#### Domínio 9: Dimensão de Integração

**CAMADA 1 — CONCEITO BASE**

*   **O que verifica e por que existe:** Assegura que o código desenvolvido localmente se comporta perfeitamente no ecossistema central, sem quebrar funcionalidades anteriores.
    
*   **Fonte teórica:** _Continuous Integration_ (Martin Fowler).
    
*   **A Frase:** "Sem essa dimensão, o famoso 'na minha máquina funciona' derruba o servidor de produção."
    

**CAMADA 2 — CRITÉRIO OPERACIONAL**

*   **Pergunta binária:** O código da _feature branch_ foi integrado na branch principal (ex: main ou develop) sem conflitos de mesclagem e o _build_ de integração passou com sucesso?
    
*   **Artefato obrigatório:** Pipeline de CI com status "Passou" (Verde) e mesclagem (Merge) efetivada no repositório remoto.
    

**CAMADA 3 — QUANDO O CRITÉRIO FALHA (Exemplos Concretos)**

*   **Quebra de Build Contínuo:** O desenvolvedor finalizou a **US07 — Consultar Detalhes do PEV**, mas ao subir as alterações na branch main, o servidor de CI/CD quebrou porque ele instalou uma biblioteca nova de roteamento de mapas localmente e esqueceu de declará-la no arquivo de dependências do projeto.
    
*   **Conflitos Ignorados:** O desenvolvedor enviou a **US12 — Exibir Vitrine de Conquistas** com um comando forçado de envio para sobrepor o histórico (_force push_), sobrescrevendo o código da US11 que seu colega havia acabado de integrar no mesmo repositório remoto.
    

**CAMADA 4 — FLUXO DE RESOLUÇÃO**

*   **Diagrama de Decisão:**
    
    *   _Se NÃO_ ➔ _Rollback_ automático ou impedimento de _Merge_.
        
    *   _Ação:_ O desenvolvedor responsável atualiza sua branch local (git pull --rebase), resolve os conflitos de integração manualmente na sua IDE, roda os testes localmente e submete o _Push_ corrigido.
        
    *   _Registro:_ Comentários no _Pull Request_ detalhando a resolução dos conflitos.

## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) | Revisor(a) |
| :---: | :---: | :--- | :--- | :--- |
| 17/05/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | Paulo Vitor | 
| 17/05/2026 | 1.0 | Inclusão das especificações das dimensões e domínios no DoR e DoD, visando rastreabilidade e entendimento de cada critério. | Paulo Vitor | 
