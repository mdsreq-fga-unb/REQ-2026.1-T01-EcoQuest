
# 10. Backlog do Produto

## 10.1. Backlog Geral

| ID | Nome | ID UC | Objetivo UC | RNFs Relacionados |
| :--- | :--- | :--- | :--- | :--- |
| RF01 | Cadastrar usuário | UC01 | Permitir a criação de uma conta no sistema| -- | 
| RF02 | Autenticar usuário | UC02 | Permitir acesso seguro ao sistema | -- | 
| RF03 | Recuperar senha | UC03 | Permitir redefinição da senha | -- | 
| RF04 | Gerenciar Perfil | UC04 | Permitir edição de dados pessoais e preferências | -- | 
| RF05 | Excluir conta | UC05 | Permitir exclusão da conta conforme LGPD | -- | 
| RF06 | Localizar PEVs | UC06 | Exibir pontos de coleta próximos | -- | 
| RF07 | Consultar detalhes do PEV | UC07 | Exibir informações detalhadas de um ponto de coleta | -- | 
| RF08 | Ler Token para Descarte | UC08 | Permitir leitura de QR Code para descarte | -- | 
| RF09 | Consultar Extrato | UC09 | Exibir histórico de descartes e saldo de créditos disponível | -- | 
| RF10 | Exibir Catálogo de Recompensas | UC10 | Exibir benefícios, cupons e prêmios disponíveis para resgate | -- | 
| RF11 | Resgatar Recompensas | UC11 |  Processar o resgate de uma recompensa do catálogo | -- | 
| RF12 | Exibir Vitrine de Conquistas | UC12 | Exibir marcos e medalhas conquistados pelo usuário | -- | 
| RF13 | Exibir Progresso da Sequência | UC13 | Mostrar o status atual da sequência de descartes e proximidade de bônus | -- | 
| RF14 | Configurar Anonimato | UC14 | Permitir que o usuário oculte sua identidade no ranking social | -- | 
| RF15 | Visualizar Ranking | UC15 | Exibir ranking social com pontuação dos usuários | -- | 
| RF16 | Visualizar Painel de Impacto Pessoal | UC16 | Exibir métricas de impacto ambiental geradas pelo usuário | -- | 
| RF17 | Consultar Estatísticas do Impato da Comunidade | UC17 | Exibir o impacto ambiental acumulado por todos os usuários da plataforma | -- | 

---

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

- Pós-condições: Conta criada no sistema.

- Critérios de aceitação

    - O sistema deve permitir cadastro com e-mail, senha e dados básicos.
    - O sistema deve validar campos obrigatórios.
    - O sistema não deve permitir e-mails duplicados.
    - O sistema deve exibir mensagem de sucesso após cadastro.
    - O sistema deve armazenar os dados do usuário com segurança.


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

- Pós-condições: Usuário autenticado no sistema.

- Critérios de aceitação

    - O sistema deve permitir login com e-mail e senha válidos.
    - O sistema deve negar acesso para credenciais inválidas.
    - O sistema deve iniciar sessão autenticada após login bem-sucedido.
    - O sistema deve exibir mensagem de erro em caso de falha.
    - O sistema deve proteger a sessão do usuário.

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

- Pós-condições: Senha redefinida com sucesso.

- Critérios de aceitação

    - O sistema deve permitir solicitação de recuperação via e-mail.
    - O sistema deve enviar link seguro para redefinição.
    - O sistema deve permitir cadastro de nova senha válida.
    - O sistema deve invalidar links expirados.
    - O sistema deve informar quando o e-mail não estiver cadastrado.

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

- Pós-condições: Perfil atualizado no sistema.

- Critérios de aceitação

    - O sistema deve exibir os dados atuais do usuário.
    - O sistema deve permitir edição dos dados pessoais.
    - O sistema deve validar os dados informados.
    - O sistema deve salvar as alterações realizadas.
    - O sistema deve permitir atualização das preferências de privacidade.

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

- Pós-condições: Conta removida do sistema.

- Critérios de aceitação

    - O sistema deve solicitar confirmação antes da exclusão.
    - O sistema deve remover os dados do usuário conforme LGPD.
    - O sistema deve encerrar a sessão após exclusão.
    - O sistema deve impedir acesso à conta excluída.
    - O sistema deve informar sucesso da operação.

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

- Pós-condições: Lista ou mapa de PEVs exibido ao usuário.

- Critérios de aceitação

    - O sistema deve exibir mapa interativo dos PEVs.
    - O sistema deve utilizar geolocalização do usuário.
    - O sistema deve exibir os PEVs mais próximos.
    - O sistema deve permitir localização manual caso a permissão seja negada.
    - O sistema deve informar quando não houver PEVs disponíveis.

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

- Pós-condições: Informações do PEV apresentadas ao usuário.

- Critérios de aceitação

    - O sistema deve exibir horários de funcionamento do PEV.
    - O sistema deve informar materiais aceitos.
    - O sistema deve exibir capacidade de coleta.
    - O sistema deve exibir endereço do ponto.
    - O sistema deve informar indisponibilidade caso os dados não possam ser carregados.

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

- Pós-condições: Descarte registrado no sistema.

- Critérios de aceitação

    - O sistema deve permitir leitura do QR Code pela câmera.
    - O sistema deve validar o token recebido.
    - O sistema deve registrar a operação de descarte.
    - O sistema deve rejeitar QR Codes inválidos.
    - O sistema deve bloquear tokens expirados.
    - O sistema deve confirmar descarte realizado com sucesso.

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

- Pós-condições: Extrato exibido ao usuário.

- Critérios de aceitação

    - O sistema deve exibir histórico detalhado de descartes realizados.
    - O sistema deve exibir saldo de créditos disponível.
    - O sistema deve ordenar o histórico por data.
    - O sistema deve informar quando não houver registros.

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

- Pós-condições: Catálogo exibido ao usuário.

- Critérios de aceitação

    - O sistema deve exibir todos os itens disponíveis para resgate.
    - O sistema deve indicar o custo em pontos de cada recompensa.
    - O sistema deve indicar recompensas indisponíveis por saldo insuficiente.
    - O sistema deve informar indisponibilidade caso o catálogo não possa ser carregado.

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

- Pós-condições: Pontos debitados e cupom gerado para o usuário.

- Critérios de aceitação

    - O sistema deve exibir custo em pontos antes da confirmação.
    - O sistema deve debitar os pontos após confirmação.
    - O sistema deve gerar código ou cupom válido para uso externo.
    - O sistema deve bloquear resgate com saldo insuficiente.
    - O sistema deve informar quando a recompensa estiver esgotada.
    - O sistema deve confirmar o resgate com sucesso.

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

- Pós-condições: Vitrine de conquistas exibida ao usuário.

- Critérios de aceitação

    - O sistema deve exibir todas as conquistas desbloqueadas pelo usuário.
    - O sistema deve exibir conquistas ainda não obtidas.
    - O sistema deve diferenciar visualmente conquistas obtidas das bloqueadas.
    - O sistema deve exibir descrição de cada conquista.

### UC13 — Exibir Progresso da Sequência

- Atores: Usuário

- Objetivo: Mostrar o status atual da sequência de descartes e proximidade de bônus.

- Pré-condições: Usuário autenticado.

- Fluxo Principal

1. Usuário acessa o painel de sequência.
2. Sistema recupera o histórico de sequência do usuário.
3. Sistema calcula o progresso atual.
4. Sistema exibe visualmente o status da sequência e o próximo bônus.
5. Usuário visualiza seu progresso.

- Fluxos Alternativos

    - 2A — Sequência zerada

        - 2A.1 Sistema identifica ausência de sequência ativa.
        - 2A.2 Sistema exibe status inicial com incentivo para começar.

- Pós-condições: Progresso da sequência exibido ao usuário.

- Critérios de aceitação

    - O sistema deve exibir o número atual de descartes na sequência.
    - O sistema deve indicar quantos descartes faltam para o próximo bônus.
    - O sistema deve exibir o bônus que será desbloqueado.
    - O sistema deve reiniciar a sequência caso o usuário perca a regularidade.
    - O sistema deve notificar visualmente quando a sequência estiver próxima de quebrar.

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

- Pós-condições: Preferência de anonimato salva e aplicada no ranking.

- Critérios de aceitação

    - O sistema deve permitir ocultar a posição do usuário no ranking.
    - O sistema deve permitir uso de pseudônimo no lugar do nome real.
    - O sistema deve validar unicidade do pseudônimo.
    - O sistema deve aplicar a configuração imediatamente no ranking.
    - O sistema deve permitir reverter a configuração a qualquer momento.

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

- Pós-condições: Ranking exibido ao usuário.

- Critérios de aceitação

    - O sistema deve exibir ranking ordenado por pontuação.
    - O sistema deve destacar a posição do usuário logado.
    - O sistema deve respeitar as configurações de anonimato de cada usuário.
    - O sistema deve exibir nome ou pseudônimo conforme preferência do usuário.
    - O sistema deve informar indisponibilidade caso os dados não possam ser carregados.

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

- Pós-condições: Métricas de impacto exibidas ao usuário.

- Critérios de aceitação

    - O sistema deve exibir kg de CO2 evitado pelo usuário.
    - O sistema deve exibir volume de resíduos desviados do descarte irregular.
    - O sistema deve atualizar as métricas após cada novo descarte.
    - O sistema deve exibir painel inicial quando não houver descartes registrados.

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

- Pós-condições: Painel de impacto da comunidade exibido ao usuário.

- Critérios de aceitação

    - O sistema deve exibir contador global de resíduos descartados corretamente.
    - O sistema deve exibir total de CO2 evitado pela comunidade.
    - O sistema deve atualizar os dados periodicamente.
    - O sistema deve ser acessível sem necessidade de autenticação.
    - O sistema deve informar indisponibilidade caso os dados não possam ser carregados.

---
## 10.2. Priorização

A priorização do backlog foi realizada com base no modelo MoSCoW (Must Have, Should Have, Could Have e Won't Have), que auxilia na identificação e categorização das funcionalidades como essenciais, desejáveis ou opcionais. Esse modelo orienta o desenvolvimento conforme os objetivos do projeto, garantindo que as entregas mais importantes sejam priorizadas.

Cada requisito foi avaliado segundo dois grupos de critérios: Negócio e Complexidade.

O tabela abaixo foi utilizada para determinar a importância dos requisitos para o negócio:

### Valor de Negócio (VN)

| Valor | Nível | Critério de Atribuição |
|-------|-------|------------------------|
| 5 | Alto | O requisito entrega valor direto ao negócio e é condição indispensável para o funcionamento do produto. |
| 4 | Médio/Alto | Requisito de alto impacto operacional ou estratégico, necessário para o lançamento inicial do produto. |
| 3 | Médio | Agrega valor relevante à experiência do usuário ou a fluxos secundários, mas pode ser postergado sem comprometer o MVP. |
| 2 | Médio/Baixo | Funcionalidade complementar com ganho incremental; sua ausência não afeta o uso central do sistema. |
| 1 | Baixo | Requisito de impacto mínimo no valor percebido pelo usuário. |

### Complexidade (CX)

A complexidade dos requisitos foi definida com base nos seguintes critérios de esforço técnico:

- (+1) A equipe já possui experiência prévia com a funcionalidade ou tecnologia envolvida.
- (+1) O requisito demanda baixo volume de trabalho e implementação rápida.
- (+1) A solução possui baixa complexidade técnica, sem necessidade de pesquisa ou tecnologias novas.
- (+1) O requisito está alinhado aos padrões arquiteturais e técnicos já adotados no projeto.

| Valor | Nível | Critério de Atribuição |
|-------|-------|------------------------|
| 5 | Muito Alta | Nenhum critério atendido. |
| 4 | Alta | Apenas 1 critério atendido. |
| 3 | Média | 2 critérios atendidos. |
| 2 | Baixa | 3 critérios atendidos. |
| 1 | Muito Baixa | Todos os critérios atendidos. |

| ID | Nome | MoSCoW | VN | CX | Matriz de Esforço |
| :--- | :--- | :--- | :--- | :--- | :--- | 
| RF01 | Cadastrar usuário | Must have | 5 | 1 | Quadrante 1 | 
| RF02 | Autenticar usuário | Must have | 5 | 1 | Quadrante 1 | 
| RF03 | Recuperar senha | Should have | 3 | 2 | Quadrante 3 | 
| RF04 | Gerenciar Perfil | Should have | 3 | 1 | Quadrante 3 | 
| RF05 | Excluir conta | Should have | 3 | 1 | Quadrante 3 | 
| RF06 | Localizar PEVs | Should have | 2 | 3 | Quadrante 4 |
| RF07 | Consultar detalhes do PEV | Could have | 2 | 2 | Quadrante 3 |
| RF08 | Ler Token para Descarte | Must have | 4 | 4 | Quadrante 2 | 
| RF09 | Consultar Extrato | Must have | 4 | 3 | Quadrante 2 | 
| RF10 | Exibir Catálogo de Recompensas | Must have | 5 | 3 | Quadrante 2 |
| RF11 | Resgatar Recompensas | Must have | 5 | 4 | Quadrante 2 |
| RF12 | Exibir Vitrine de Conquistas | Must have | 4 | 3 | Quadrante 2 | 
| RF13 | Exibir Progresso da Sequência | Could have | 4 | 3 | Quadrante 2 | 
| RF14 | Configurar Anonimato | Could have | 2 | 2 | Quadrante 3 | 
| RF15 | Visualizar Ranking | Must have | 5 | 3 | Quadrante 2 | 
| RF16 | Visualizar Painel de Impacto Pessoal | Could have | 2 | 3 | Quadrante 4 | 
| RF17 | Consultar Estatísticas do Impato da Comunidade | Could have | 2 | 3 | Quadrante 4 | 

---

## 10.3. Matriz de esforço

<iframe
  width="100%"
  height="600"
  src="https://miro.com/app/live-embed/uXjVHSUAvQU=/?embedMode=view_only_without_ui&moveToViewport=34%2C-457%2C660%2C624&embedId=629367810078"
  frameborder="0"
  scrolling="no"
  allowfullscreen>
</iframe>

## 10.4. Atualização e refinamento

- **Refinamento (Grooming):** semanal, com detalhamento de histórias, AC e definição de DoR.
- **Atualizações por feedback:** entradas vindas do cliente são registradas em ata e transformadas em itens acionáveis no backlog.

## 10.5. Controle de mudanças

Mudanças são tratadas de forma leve:

1. Solicitação registrada em ata ([Atas](../interacao-entre-equipe-e-cliente/atas.md));
2. Triagem interna (impacto, custo-benefício, riscos, OE/CP);
3. Priorização MoSCoW e atualização do Kanban;
4. Atualização de artefatos (histórias, AC, protótipos) mantendo rastreabilidade.

