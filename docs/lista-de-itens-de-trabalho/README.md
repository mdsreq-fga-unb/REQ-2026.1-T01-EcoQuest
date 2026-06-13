# 10. Lista de Itens de Trabalho

## 10.1. Regras de negócio

| ID  | Nome da Regra de Negócio                  | Descrição |
| :--- | :--- | :--- |
| **RN1** | Extensibilidade Modular | O backend deve ser desenvolvido via API desacoplada para permitir inclusão de novos tipos de resíduos e hardware IoT |
| **RN2** | Gestão das Pontuações e Recompensas | A quantidade de pontos atribuída a cada tipo ou volume de resíduo poderá ser configurada pelos administradores do sistema |
| **RN3** | Validação do Descarte | Um descarte somente será considerado válido após a leitura e validação do token emitido pelo PEV. |
| **RN4** | Pontuação por Descarte | O sistema deve converter o volume e/ou tipo de resíduo descartado em pontos creditados na conta do usuário, conforme tabela de pontuação vigente |
| **RN5** | Insígnias de Conquista | O sistema deve conceder insígnias automaticamente quando o usuário atingir critérios de engajamento previamente definidos |
| **RN6** | Elegibilidade para Resgate | O usuário somente poderá resgatar recompensas quando possuir saldo de pontos igual ou superior ao valor exigido para o benefício selecionado |
| **RN7** | Unicidade do Token | Cada token emitido para validação de descarte poderá ser utilizado apenas uma única vez |
| **RN8** | Progresso das Conquistas | O sistema deve calcular e exibir o percentual de progresso do usuário em relação aos critérios necessários para obtenção de cada insígnia disponível |

## 10.2. Lista de Itens de Trabalho

| ID | Nome | ID UC | Objetivo UC | RNFs Relacionados | RNs Relacionadas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RF01** | Cadastrar usuário | **UC01** | Permitir a criação de uma conta no sistema | **RNF01** — Responsividade Mobile<br>**RNF03** — Acessibilidade Digital<br>**RNF05** — Segurança de Dados | — |
| **RF02** | Autenticar usuário | **UC02** | Permitir acesso seguro ao sistema | **RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens | — |
| **RF03** | Recuperar senha | **UC03** | Permitir redefinição da senha | **RNF02** — Desempenho de Resposta<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens | — |
| **RF04** | Gerenciar Perfil | **UC04** | Permitir edição de dados pessoais e preferências | **RNF01** — Responsividade Mobile<br>**RNF03** — Acessibilidade Digital<br>**RNF05** — Segurança de Dados | — |
| **RF05** | Excluir conta | **UC05** | Permitir exclusão da conta conforme LGPD | **RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados | — |
| **RF06** | Localizar PEVs | **UC06** | Exibir pontos de coleta próximos | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade | — |
| **RF07** | Consultar detalhes do PEV | **UC07** | Exibir informações detalhadas de um ponto de coleta | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital | — |
| **RF08** | Ler Token para Descarte | **UC08** | Permitir leitura de QR Code para descarte | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens | **RN3** — Validação do Descarte <br>**RN4** — Pontuação por descarte<br>**RN5** — Insígnias de conquistas |
| **RF09** | Consultar Extrato | **UC09** | Exibir histórico de descartes e saldo de créditos disponível | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados | **RN4** — Pontuação por descarte |
| **RF10** | Exibir Catálogo de Recompensas | **UC10** | Exibir benefícios, cupons e prêmios disponíveis para resgate | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade | **RN2** — Gestão das pontuções e recompensas |
| **RF11** | Resgatar Recompensas | **UC11** | Processar o resgate de uma recompensa do catálogo | **RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens | **RN2** — Gestão das pontuções e recompensas |
| **RF12** | Exibir Vitrine de Conquistas | **UC12** | Exibir marcos e medalhas conquistados pelo usuário | **RNF01** — Responsividade Mobile<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade | **RN5** — Insígnias de conquistas |
| **RF13** | Exibir Progresso das Insígnias | **UC13** | Mostrar o status atual do progresso da conquista das insignias e proximidade de bônus | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade | **RN8** — Progresso das Conquistas |
| **RF14** | Configurar Anonimato | **UC14** | Permitir que o usuário oculte sua identidade no ranking social | **RNF03** — Acessibilidade Digital<br>**RNF05** — Segurança de Dados | — |
| **RF15** | Visualizar Ranking | **UC15** | Exibir ranking social com pontuação dos usuários | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade | **RN4** — Pontuação por descarte |
| **RF16** | Visualizar Painel de Impacto Pessoal | **UC16** | Exibir métricas de impacto ambiental geradas pelo usuário | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade | **RN4** — Pontuação por descarte |
| **RF17** | Consultar Estatísticas do Impacto da Comunidade | **UC17** | Exibir o impacto ambiental acumulado por todos os usuários da plataforma | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade | — |

### UC01 — Cadastrar Usuário

- Atores: Usuário

- Objetivo: Permitir a criação de uma conta no sistema.

- Pré-condições: Usuário não possuir cadastro ativo.

- Fluxo Principal

1. Usuário acessa a tela de cadastro.
2. Usuário informa e-mail, senha e dados básicos.
3. Sistema valida os dados informados.
4. Sistema cria a conta do usuário.
5. Sistema confirma o cadastro realizado.

- Fluxos Alternativos

    - 3A — E-mail já cadastrado

        - 3A.1 Sistema identifica e-mail existente.
        - 3A.2 Sistema exibe mensagem de erro.

    - 3B — Dados inválidos

        - 3B.1 Sistema detecta campos inválidos ou vazios.
        - 3B.2 Sistema solicita correção.

* Fluxos de Exceção

    - E1 — Falha ao salvar cadastro

        - E1.1 Sistema tenta persistir os dados do usuário.
        - E1.2 Ocorre erro de comunicação com o banco de dados.
        - E1.3 Sistema cancela a operação.
        - E1.4 Sistema exibe mensagem informando que o cadastro não pôde ser concluído e para tentar novamente mais tarde.

- Pós-condições: Conta criada no sistema.

### UC02 — Autenticar Usuário

- Atores: Usuário

- Objetivo: Permitir acesso seguro ao sistema.

- Pré-condições: Usuário possuir conta cadastrada.

- Fluxo Principal

1. Usuário acessa a tela de login.
2. Usuário informa e-mail e senha.
3. Sistema valida as credenciais.
4. Sistema inicia sessão autenticada.
5. Sistema libera acesso às funcionalidades.

- Fluxos Alternativos

    - 3A — Credenciais inválidas

        - 3A.1 Sistema rejeita autenticação.
        - 3A.2 Sistema exibe mensagem de erro.

- Fluxos de Exceção

    - E1 — Serviço de autenticação indisponível

        - E1.1 Sistema tenta validar as credenciais.
        - E1.2 O serviço de autenticação não responde.
        - E1.3 Sistema impede o acesso.
        - E1.4 Sistema informa indisponibilidade temporária e para tentar novamente mais tarde.

- Pós-condições: Usuário autenticado no sistema.

### UC03 — Recuperar Senha

- Atores: Usuário

- Objetivo: Permitir redefinição da senha.

- Pré-condições: Usuário possuir e-mail cadastrado.

- Fluxo Principal

1. Usuário solicita recuperação de senha.
2. Sistema solicita e-mail cadastrado.
3. Usuário informa o e-mail.
4. Sistema envia link seguro de redefinição.
5. Usuário acessa o link recebido.
6. Usuário informa nova senha.
7. Sistema atualiza a senha.

- Fluxos Alternativos

    - 3A — E-mail não encontrado

        - 3A.1 Sistema não localiza cadastro.
        - 3A.2 Sistema informa erro.

    - 5A — Link expirado

        - 5A.1 Sistema detecta expiração do link.
        - 5A.2 Sistema solicita nova recuperação.

- Fluxos de Exceção
    - E1 — Falha no envio do link de redefinição

        - E1.1 Sistema não confirma a solicitação de recuperação.
        - E1.2 Sistema informa que o envio não foi concluído.

    - E2 — Falha ao atualizar a nova senha

        - E2.1 Sistema mantém a senha anterior ativa.
        - E2.2 Sistema informa que a redefinição não foi concluída.

- Pós-condições: Senha redefinida com sucesso.

### UC04 — Gerenciar Perfil

- Atores: Usuário

- Objetivo: Permitir edição de dados pessoais e preferências de privacidade.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa a área de perfil.
2. Sistema exibe os dados atuais.
3. Usuário altera as informações desejadas.
4. Usuário salva as alterações.
5. Sistema valida os novos dados.
6. Sistema atualiza o perfil.

- Fluxos Alternativos

    - 5A — Dados inválidos

        - 5A.1 Sistema detecta inconsistências.
        - 5A.2 Sistema solicita correção.

- Fluxos de Exceção

    - E1 — Falha ao carregar dados do perfil
        - E1.1 Sistema não exibe informações incompletas como definitivas.
        - E1.2 Sistema informa indisponibilidade temporária dos dados.

    - E2 — Falha ao salvar alterações

        - E2.1 Sistema mantém os dados anteriores do perfil.
        - E2.2 Sistema informa que a atualização não foi concluída.

- Pós-condições: Perfil atualizado no sistema.

### UC05 — Excluir Conta

- Atores: Usuário

- Objetivo: Permitir exclusão da conta conforme a LGPD.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa a opção de exclusão da conta.
2. Sistema solicita confirmação da operação.
3. Usuário confirma a exclusão.
4. Sistema remove os dados do usuário.
5. Sistema encerra a sessão ativa.
6. Sistema confirma exclusão da conta.

- Fluxos Alternativos

    - 3A — Cancelamento da exclusão

        - 3A.1 Usuário cancela a operação.
        - 3A.2 Sistema mantém a conta ativa.

- Fluxos de Exceção

    - E1 — Falha ao remover dados da conta
        - E1.1 Sistema não encerra a operação como concluída.
        - E1.2 Sistema informa que a exclusão não foi realizada.

    - E2 — Falha ao encerrar sessão após exclusão

        - E2.1 Sistema invalida o acesso da conta removida.
        - E2.2 Sistema informa necessidade de novo acesso caso a operação não finalize corretamente.

- Pós-condições: Conta removida do sistema.

### UC06 — Localizar PEVs

- Atores: Usuário

- Objetivo: Exibir pontos de coleta próximos ao usuário.

- Pré-condições: Sistema possuir acesso à localização do usuário.

- Fluxo Principal

1. Usuário acessa o mapa de PEVs.
2. Sistema obtém a geolocalização do usuário.
3. Sistema busca os PEVs próximos.
4. Sistema exibe mapa interativo com os pontos disponíveis.
5. Usuário visualiza os PEVs disponíveis.

- Fluxos Alternativos

    - 2A — Localização negada

        - 2A.1 Usuário nega acesso à localização.
        - 2A.2 Sistema solicita localização manual.

    - 3A — Nenhum PEV encontrado

        - 3A.1 Sistema não encontra pontos próximos.
        - 3A.2 Sistema informa indisponibilidade.

- Fluxos de Exceção

    - E1 — Falha no serviço de geolocalização

        - E1.1 Sistema não obtém a localização automaticamente.
        - E1.2 Sistema oferece busca manual por endereço ou região.

    - E2 — Falha ao carregar mapa ou lista de PEVs

        - E2.1 Sistema informa indisponibilidade temporária.
        - E2.2 Sistema permite nova tentativa de carregamento.

- Pós-condições: Lista ou mapa de PEVs exibido ao usuário.

### UC07 — Consultar Detalhes do PEV

- Atores: Usuário

- Objetivo: Exibir informações detalhadas de um ponto de coleta.

- Pré-condições: Existir PEV cadastrado no sistema.

- Fluxo Principal

1. Usuário seleciona um PEV no mapa.
2. Sistema recupera as informações do ponto.
3. Sistema exibe:
    - horários;
    - materiais aceitos;
    - capacidade de coleta;
    - endereço do PEV.
4. Usuário consulta os detalhes do ponto.

- Fluxos Alternativos

    - 2A — PEV indisponível

        - 2A.1 Sistema não consegue acessar os dados do ponto.
        - 2A.2 Sistema informa indisponibilidade temporária.

- Fluxos de Exceção

    - E1 — Falha ao recuperar detalhes do PEV

        - E1.1 Sistema não exibe dados desatualizados como confirmados.
        - E1.2 Sistema informa indisponibilidade temporária das informações.

    - E2 — PEV removido ou inexistente

        - E2.1 Sistema impede a consulta do ponto inválido.
        - E2.2 Sistema orienta o usuário a selecionar outro PEV.

- Pós-condições: Informações do PEV apresentadas ao usuário.

### UC08 — Ler Token para Descarte

- Atores: Usuário

- Objetivo: Permitir leitura de QR Code para descarte.

- Pré-condições:
    - Usuário autenticado.
    - PEV possuir QR Code válido.

- Fluxo Principal

1. Usuário acessa funcionalidade de leitura.
2. Sistema ativa a câmera do dispositivo.
3. Usuário aponta a câmera para o QR Code.
4. Sistema realiza leitura do token.
5. Sistema valida o token recebido.
6. Sistema registra a operação de descarte.
7. Sistema confirma leitura realizada.

- Fluxos Alternativos

    - 4A — QR Code inválido

        - 4A.1 Sistema não reconhece o código.
        - 4A.2 Sistema solicita nova leitura.

    - 5A — Token expirado

        - 5A.1 Sistema detecta token inválido ou expirado.
        - 5A.2 Sistema bloqueia a operação.

- Fluxos de Exceção

    - E1 — Falha ao acessar a câmera

        - E1.1 Sistema não inicia a leitura do QR Code.
        - E1.2 Sistema informa que a permissão ou o recurso de câmera está indisponível.

    - E2 — Falha ao registrar o descarte

        - E2.1 Sistema não credita pontos ao usuário.
        - E2.2 Sistema informa que a operação não foi concluída.

- Pós-condições: Descarte registrado no sistema.

### UC09 — Consultar Extrato

- Atores: Usuário

- Objetivo: Exibir histórico de descartes e saldo de créditos disponível.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa a área de extrato.
2. Sistema recupera o histórico de descartes do usuário.
3. Sistema exibe lista de operações realizadas.
4. Sistema exibe saldo de créditos disponível.
5. Usuário consulta as informações.

- Fluxos Alternativos

    - 2A — Sem histórico

        - 2A.1 Sistema não encontra registros.
        - 2A.2 Sistema informa ausência de histórico.

- Fluxos de Exceção

    - E1 — Falha ao carregar histórico financeiro

        - E1.1 Sistema não exibe saldo ou movimentações incompletas como definitivas.
        - E1.2 Sistema informa indisponibilidade temporária do extrato.

    - E2 — Falha ao calcular saldo atualizado

        - E2.1 Sistema mantém o último saldo confiável.
        - E2.2 Sistema informa que a atualização do saldo não foi concluída.

- Pós-condições: Extrato exibido ao usuário.

### UC10 — Exibir Catálogo de Recompensas

- Atores: Usuário

- Objetivo: Exibir benefícios, cupons e prêmios disponíveis para resgate.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa o catálogo de recompensas.
2. Sistema recupera os itens disponíveis.
3. Sistema exibe catálogo com benefícios, cupons e prêmios.
4. Usuário visualiza as recompensas disponíveis.

- Fluxos Alternativos

    - 2A — Catálogo indisponível

        - 2A.1 Sistema não consegue carregar os itens.
        - 2A.2 Sistema informa indisponibilidade temporária.

    - 3A — Sem itens disponíveis

        - 3A.1 Sistema não encontra recompensas cadastradas.
        - 3A.2 Sistema informa ausência de itens.

- Fluxos de Exceção

    - E1 — Falha ao carregar catálogo

        - E1.1 Sistema não exibe lista parcial como catálogo completo.
        - E1.2 Sistema informa indisponibilidade temporária dos itens.

    - E2 — Falha ao consultar saldo do usuário

        - E2.1 Sistema exibe o catálogo sem habilitar resgate dependente de saldo.
        - E2.2 Sistema informa que a disponibilidade por pontos não pôde ser verificada.

- Pós-condições: Catálogo exibido ao usuário.

### UC11 — Resgatar Recompensas

- Atores: Usuário

- Objetivo: Processar o resgate de uma recompensa do catálogo.

- Pré-condições:
    - Usuário autenticado.
    - Usuário possuir saldo suficiente.

- Fluxo Principal

1. Usuário seleciona uma recompensa no catálogo.
2. Sistema exibe detalhes e custo em pontos.
3. Usuário confirma o resgate.
4. Sistema debita os pontos do saldo.
5. Sistema gera o código ou cupom de benefício.
6. Sistema confirma o resgate realizado.

- Fluxos Alternativos

    - 3A — Saldo insuficiente

        - 3A.1 Sistema identifica pontos insuficientes.
        - 3A.2 Sistema bloqueia a operação e informa o usuário.

    - 4A — Recompensa esgotada

        - 4A.1 Sistema identifica item indisponível.
        - 4A.2 Sistema informa indisponibilidade.

- Fluxos de Exceção

    - E1 — Falha ao debitar pontos

        - E1.1 Sistema não gera cupom de benefício.
        - E1.2 Sistema informa que o resgate não foi concluído.

    - E2 — Falha ao gerar código ou cupom

        - E2.1 Sistema reverte ou não confirma o débito de pontos.
        - E2.2 Sistema informa indisponibilidade temporária do resgate.

- Pós-condições: Pontos debitados e cupom gerado para o usuário.

### UC12 — Exibir Vitrine de Conquistas

- Atores: Usuário

- Objetivo: Exibir marcos e medalhas conquistados pelo usuário.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa a vitrine de conquistas.
2. Sistema recupera as conquistas do usuário.
3. Sistema exibe medalhas e marcos obtidos.
4. Sistema exibe conquistas ainda não desbloqueadas.
5. Usuário visualiza seu progresso.

- Fluxos Alternativos

    - 2A — Sem conquistas

        - 2A.1 Sistema não encontra conquistas registradas.
        - 2A.2 Sistema exibe vitrine vazia com conquistas disponíveis para obter.

- Fluxos de Exceção

    - E1 — Falha ao carregar conquistas

        - E1.1 Sistema não exibe progresso incompleto como definitivo.
        - E1.2 Sistema informa indisponibilidade temporária da vitrine.

    - E2 — Falha ao identificar conquistas bloqueadas

        - E2.1 Sistema exibe somente informações confiáveis.
        - E2.2 Sistema informa que parte do progresso não pôde ser calculada.

- Pós-condições: Vitrine de conquistas exibida ao usuário.

### UC13 — Exibir Progresso das Insígnias

- Atores: Usuário

- Objetivo: Mostrar o status atual do progresso do usuário em relação aos critérios necessários para obtenção das insígnias disponíveis e sua proximidade para conquistá-las.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa o painel de progresso das insígnias.
2. Sistema recupera o histórico de descartes e demais dados relevantes do usuário.
3. Sistema identifica as insígnias disponíveis e seus respectivos critérios de conquista.
4. Sistema calcula o percentual de progresso do usuário para cada insígnia, com base nos critérios definidos.
5. Sistema exibe visualmente o progresso das insígnias, indicando o percentual concluído e o que falta para sua obtenção.
6. Usuário visualiza seu progresso e as próximas conquistas que poderá desbloquear.

- Fluxos Alternativos

    - 2A — Nenhum progresso registrado

        - 2A.1 Sistema identifica que o usuário ainda não possui progresso em relação aos critérios das insígnias.
        - 2A.2 Sistema exibe todas as insígnias com progresso inicial (0%) e incentiva o usuário a realizar seu primeiro descarte responsável.

    - 4A — Insígnia já conquistada

        - 4A.1 Sistema identifica que os critérios de determinada insígnia já foram integralmente atendidos.
        - 4A.2 Sistema exibe a insígnia como conquistada, com progresso de 100%.

- Fluxos de Exceção

    - E1 — Falha ao recuperar os dados do usuário

        - E1.1 Sistema tenta recuperar o histórico de descartes e demais dados necessários para o cálculo das insígnias.
        - E1.2 Ocorre falha na comunicação com o banco de dados ou serviço responsável.
        - E1.3 Sistema interrompe o processamento do progresso das insígnias.
        - E1.4 Sistema informa ao usuário que não foi possível carregar o progresso naquele momento e orienta a tentar novamente mais tarde.

    - E2 — Erro no cálculo do progresso das insígnias

        - E2.1 Sistema recupera os dados do usuário com sucesso.
        - E2.2 Ocorre falha ao processar os critérios de uma ou mais insígnias.
        - E2.3 Sistema não exibe informações inconsistentes ou incompletas.
        - E2.4 Sistema registra o erro para auditoria e informa ao usuário que houve um problema ao calcular o progresso das insígnias.

    - E3 — Falha ao carregar a interface de exibição das insígnias

        - E3.1 Sistema conclui o processamento do progresso das insígnias.
        - E3.2 Ocorre erro ao renderizar ou carregar os componentes visuais do painel.
        - E3.3 Sistema não apresenta o painel de progresso.
        - E3.4 Sistema exibe mensagem de indisponibilidade temporária e permite que o usuário tente recarregar a página.

- Pós-condições: O progresso atualizado das insígnias é exibido ao usuário, incluindo o percentual concluído e as conquistas já obtidas.

### UC14 — Configurar Anonimato

- Atores: Usuário

- Objetivo: Permitir que o usuário oculte sua identidade no ranking social.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa as configurações de privacidade.
2. Sistema exibe opções de anonimato disponíveis.
3. Usuário escolhe ocultar posição ou definir pseudônimo.
4. Sistema salva a preferência.
5. Sistema aplica a configuração no ranking.

- Fluxos Alternativos

    - 3A — Pseudônimo já utilizado

        - 3A.1 Sistema identifica conflito de pseudônimo.
        - 3A.2 Sistema solicita novo pseudônimo.

- Fluxos de Exceção

    - E1 — Falha ao salvar preferência de anonimato

        - E1.1 Sistema mantém a configuração anterior.
        - E1.2 Sistema informa que a alteração não foi aplicada.

    - E2 — Falha ao atualizar exibição no ranking

        - E2.1 Sistema não confirma a aplicação da nova preferência.
        - E2.2 Sistema informa indisponibilidade temporária da atualização.

- Pós-condições: Preferência de anonimato salva e aplicada no ranking.

### UC15 — Visualizar Ranking

- Atores: Usuário

- Objetivo: Exibir ranking social com pontuação dos usuários.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa o ranking.
2. Sistema recupera a classificação dos usuários.
3. Sistema exibe lista ordenada por pontuação.
4. Sistema destaca a posição do usuário no ranking.
5. Usuário visualiza o ranking.

- Fluxos Alternativos

    - 2A — Ranking indisponível

        - 2A.1 Sistema não consegue carregar os dados.
        - 2A.2 Sistema informa indisponibilidade temporária.

- Fluxos de Exceção

    - E1 — Falha ao carregar ranking

        - E1.1 Sistema não exibe classificação incompleta como definitiva.
        - E1.2 Sistema informa indisponibilidade temporária do ranking.

    - E2 — Falha ao aplicar preferências de anonimato

        - E2.1 Sistema preserva a privacidade configurada pelos usuários.
        - E2.2 Sistema informa que o ranking não pôde ser exibido no momento.

- Pós-condições: Ranking exibido ao usuário.

### UC16 — Visualizar Painel de Impacto Pessoal

- Atores: Usuário

- Objetivo: Exibir métricas de impacto ambiental geradas pelo usuário.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa o painel de impacto pessoal.
2. Sistema recupera os dados de descarte do usuário.
3. Sistema calcula as métricas de impacto ambiental.
4. Sistema exibe indicadores como kg de CO2 evitado e resíduos desviados.
5. Usuário visualiza seu impacto.

- Fluxos Alternativos

    - 2A — Sem descartes registrados

        - 2A.1 Sistema não encontra histórico.
        - 2A.2 Sistema exibe painel zerado com incentivo ao primeiro descarte.

- Fluxos de Exceção

    - E1 — Falha ao carregar dados de descarte

        - E1.1 Sistema não calcula métricas com dados incompletos.
        - E1.2 Sistema informa indisponibilidade temporária do painel.

    - E2 — Falha ao atualizar métricas após novo descarte

        - E2.1 Sistema mantém as últimas métricas confiáveis.
        - E2.2 Sistema informa que a atualização ainda não foi concluída.

- Pós-condições: Métricas de impacto exibidas ao usuário.

### UC17 — Consultar Estatísticas do Impacto da Comunidade

- Atores: Usuário

- Objetivo: Exibir o impacto ambiental acumulado por todos os usuários da plataforma.

- Pré-condições: Nenhuma.

- Fluxo Principal

1. Usuário acessa o painel de impacto da comunidade.
2. Sistema recupera os dados agregados de todos os usuários.
3. Sistema calcula o impacto ambiental coletivo.
4. Sistema exibe contador global com as métricas acumuladas.
5. Usuário visualiza o impacto da comunidade.

- Fluxos Alternativos

    - 2A — Dados indisponíveis

        - 2A.1 Sistema não consegue carregar os dados agregados.
        - 2A.2 Sistema informa indisponibilidade temporária.

- Fluxos de Exceção

    - E1 — Falha ao carregar dados agregados

        - E1.1 Sistema não exibe contador global incompleto como definitivo.
        - E1.2 Sistema informa indisponibilidade temporária das estatísticas.

    - E2 — Falha ao atualizar dados periódicos

        - E2.1 Sistema mantém o último conjunto de dados confiável.
        - E2.2 Sistema informa que a atualização mais recente não foi concluída.

- Pós-condições: Painel de impacto da comunidade exibido ao usuário.

## 10.2 Priorização

A priorização da lista de itens de trabalho foi realizada com base no modelo MoSCoW (Must Have, Should Have, Could Have e Won’t Have). Esse modelo orienta o desenvolvimento conforme os objetivos do projeto, garantindo que as funcionalidades mais relevantes sejam priorizadas durante o planejamento das entregas.

A priorização dos Casos de Uso (UC) foi definida considerando sua relevância para o funcionamento da solução, impacto no usuário e esforço técnico necessário para implementação. Para isso, foi adotado um modelo baseado em Valor Funcional (VF) e Complexidade Técnica (CT).

Cada Caso de Uso foi avaliado em dois eixos principais: Valor Funcional e Complexidade Técnica.

### Critérios de Valor Funcional (VF)

Os critérios abaixo foram utilizados para analisar a importância do Caso de Uso para o produto e para os objetivos do projeto:

- (+1) O Caso de Uso é essencial para o funcionamento principal da plataforma?
- (+1) O Caso de Uso impacta diretamente a experiência ou engajamento do usuário?
- (+1) O Caso de Uso contribui para os objetivos estratégicos do produto?
- (+1) O Caso de Uso reduz problemas identificados na análise de negócio?

Com base na pontuação obtida, os Casos de Uso foram classificados conforme o modelo MoSCoW:

| Pontos VF | Classificação |
|---|---|
| 4 | Must Have |
| 3 | Should Have |
| 2 | Could Have |
| 1 | Won’t Have |

Após a classificação, foi atribuído um peso para representar a relevância funcional do Caso de Uso:

| Classificação | Peso |
|---|---|
| Must Have | 10 |
| Should Have | 7 |
| Could Have | 4 |
| Won’t Have | 1 |

### Critérios de Complexidade Técnica (CT)

Além da relevância funcional, cada Caso de Uso foi avaliado quanto ao esforço necessário para implementação.

A pontuação de Complexidade Técnica representa o nível de esforço exigido para o desenvolvimento da funcionalidade. Quanto maior a pontuação, maior a complexidade da implementação.

Os seguintes critérios foram considerados:

- (+1) Necessidade de integração com serviços externos
- (+1) Necessidade de pesquisa ou aprendizado de novas tecnologias
- (+1) Alto impacto arquitetural no sistema
- (+1) Maior volume de regras de negócio
- (+1) Alto risco técnico ou operacional

A soma dos critérios técnicos gera a pontuação de Complexidade Técnica (CT).

### Cálculo da Prioridade Final

A prioridade final de cada Caso de Uso foi definida pela seguinte fórmula:

```text
Valor Final = Peso - Complexidade Técnica (CT)
```

Quanto maior o valor final obtido, maior a prioridade do Caso de Uso dentro da lista de itens de trabalho  do projeto.

### Classificação na Matriz de Esforço

Após o cálculo da prioridade final, os Casos de Uso foram posicionados em uma Matriz de Esforço, considerando a relação entre valor agregado e complexidade técnica:

| Quadrante | Característica |
|---|---|
| Quadrante 1 | Alto valor e baixa complexidade |
| Quadrante 2 | Alto valor e alta complexidade |
| Quadrante 3 | Médio valor e baixa complexidade |
| Quadrante 4 | Baixo valor e alta complexidade |

### Tabela de Priorização

| ID | Nome | VF | Peso | CT | Valor Final (Peso - CT) | MoSCoW | Matriz de Esforço | MVP |
|---|---|---|---|---|---|---|---|---|
| **UC01** | Cadastrar usuário | 4 | 10 | 1 | 9 | Must Have | Quadrante 1 | X |
| **UC02** | Autenticar usuário | 4 | 10 | 1 | 9 | Must Have | Quadrante 1 | X |
| **UC03** | Recuperar senha | 3 | 7 | 2 | 5 | Should Have | Quadrante 3 | -- |
| **UC04** | Gerenciar Perfil | 3 | 7 | 1 | 6 | Should Have | Quadrante 3 | -- |
| **UC05** | Excluir conta | 3 | 7 | 1 | 6 | Should Have | Quadrante 3 | -- |
| **UC06** | Localizar PEVs | 2 | 4 | 3 | 1 | Could Have | Quadrante 4 | -- |
| **UC07** | Consultar detalhes do PEV | 2 | 4 | 2 | 2 | Could Have | Quadrante 3 | -- |
| **UC08** | Ler Token para Descarte | 4 | 10 | 4 | 6 | Must Have | Quadrante 2 | X |
| **UC09** | Consultar Extrato | 4 | 10 | 3 | 7 | Must Have | Quadrante 2 | X |
| **UC10** | Exibir Catálogo de Recompensas | 4 | 10 | 3 | 7 | Must Have | Quadrante 2 | X |
| **UC11** | Resgatar Recompensas | 4 | 10 | 4 | 6 | Must Have | Quadrante 2 | X |
| **UC12** | Exibir Vitrine de Conquistas | 4 | 10 | 3 | 7 | Must Have | Quadrante 2 | X |
| **UC13** | Exibir Progresso da Sequência | 2 | 4 | 3 | 1 | Could Have | Quadrante 4 | -- |
| **UC14** | Configurar Anonimato | 2 | 4 | 2 | 2 | Could Have | Quadrante 3 | -- |
| **UC15** | Visualizar Ranking | 4 | 10 | 3 | 7 | Must Have | Quadrante 2 | X |
| **UC16** | Visualizar Painel de Impacto Pessoal | 2 | 4 | 3 | 1 | Could Have | Quadrante 4 | -- |
| **UC17** | Consultar Estatísticas do Impacto da Comunidade | 2 | 4 | 3 | 1 | Could Have | Quadrante 4 | -- |


## 10.3. Matriz de esforço

<iframe
  width="100%"
  height="600"
  src="https://miro.com/app/live-embed/uXjVHSUAvQU=/?embedMode=view_only_without_ui&moveToViewport=34%2C-457%2C660%2C624&embedId=629367810078"
  frameborder="0"
  scrolling="no"
  allowfullscreen>
</iframe>


## Histórico de versões

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 13/05/2026 | 1.0 | Criação do documento e estruturação dos tópicos iniciais, bem como seu conteúdo. | Joaquim e Nayra |
| 17/04/2026 | 2.0 | Correção da priorização conforme feedback do professor. | Yasmim e Joaquim |
| 18/04/2026 | 2.1 | Corrigindo template das tabelas, adicionando os Casos de Uso e definição do MVP. | Yasmim e Joaquim |
| 13/06/2026 | 2.2 | Adicionando regras de negócio e removendo critérios de aceitação | Yasmim |
| 13/06/2026 | 2.3 | Adicionando fluxos de exceção | Nayra |