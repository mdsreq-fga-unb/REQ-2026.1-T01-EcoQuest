
# 10. Lista de Itens de Trabalho

## 10.1. Lista de Itens de Trabalho

| ID | Nome | ID UC | Objetivo UC | RNFs Relacionados |
| :--- | :--- | :--- | :--- | :--- |
| **RF01** | Cadastrar usuário | **UC01** | Permitir a criação de uma conta no sistema | **RNF01** — Responsividade Mobile<br>**RNF03** — Acessibilidade Digital<br>**RNF05** — Segurança de Dados |
| **RF02** | Autenticar usuário | **UC02** | Permitir acesso seguro ao sistema | **RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens |
| **RF03** | Recuperar senha | **UC03** | Permitir redefinição da senha | **RNF02** — Desempenho de Resposta<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens |
| **RF04** | Gerenciar Perfil | **UC04** | Permitir edição de dados pessoais e preferências | **RNF01** — Responsividade Mobile<br>**RNF03** — Acessibilidade Digital<br>**RNF05** — Segurança de Dados |
| **RF05** | Excluir conta | **UC05** | Permitir exclusão da conta conforme LGPD | **RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados |
| **RF06** | Localizar PEVs | **UC06** | Exibir pontos de coleta próximos | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade |
| **RF07** | Consultar detalhes do PEV | **UC07** | Exibir informações detalhadas de um ponto de coleta | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital |
| **RF08** | Ler Token para Descarte | **UC08** | Permitir leitura de QR Code para descarte | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens |
| **RF09** | Consultar Extrato | **UC09** | Exibir histórico de descartes e saldo de créditos disponível | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados |
| **RF10** | Exibir Catálogo de Recompensas | **UC10** | Exibir benefícios, cupons e prêmios disponíveis para resgate | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade |
| **RF11** | Resgatar Recompensas | **UC11** | Processar o resgate de uma recompensa do catálogo | **RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade<br>**RNF05** — Segurança de Dados<br>**RNF06** — Integridade de Tokens |
| **RF12** | Exibir Vitrine de Conquistas | **UC12** | Exibir marcos e medalhas conquistados pelo usuário | **RNF01** — Responsividade Mobile<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade |
| **RF13** | Exibir Progresso da Sequência | **UC13** | Mostrar o status atual da sequência de descartes e proximidade de bônus | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF04** — Alta Disponibilidade |
| **RF14** | Configurar Anonimato | **UC14** | Permitir que o usuário oculte sua identidade no ranking social | **RNF03** — Acessibilidade Digital<br>**RNF05** — Segurança de Dados |
| **RF15** | Visualizar Ranking | **UC15** | Exibir ranking social com pontuação dos usuários | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade |
| **RF16** | Visualizar Painel de Impacto Pessoal | **UC16** | Exibir métricas de impacto ambiental geradas pelo usuário | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade |
| **RF17** | Consultar Estatísticas do Impacto da Comunidade | **UC17** | Exibir o impacto ambiental acumulado por todos os usuários da plataforma | **RNF01** — Responsividade Mobile<br>**RNF02** — Desempenho de Resposta<br>**RNF03** — Acessibilidade Digital<br>**RNF04** — Alta Disponibilidade |

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


## 10.2 Priorização

A priorização da lista de itens de trabalho foi realizada com base no modelo MoSCoW (Must Have, Should Have, Could Have e Won’t Have). Esse modelo orienta o desenvolvimento conforme os objetivos do projeto, garantindo que as funcionalidades mais relevantes sejam priorizadas durante o planejamento das entregas.

A priorização dos Casos de Uso (UC) foi definida considerando sua relevância para o funcionamento da solução, impacto no usuário e esforço técnico necessário para implementação. Para isso, foi adotado um modelo baseado em Valor Funcional (VF) e Complexidade Técnica (CT).

Cada Caso de Uso foi avaliado em dois eixos principais: Valor Funcional e Complexidade Técnica.

### Critérios de Valor Funcional (VF)

Os critérios abaixo foram utilizados para analisar a importância do Caso de Uso para o produto e para os objetivos do projeto:

- C1 (+1) O Caso de Uso é essencial para o funcionamento principal da plataforma?
- C2 (+1) O Caso de Uso impacta diretamente a experiência ou engajamento do usuário?
- C3 (+1) O Caso de Uso contribui para os objetivos estratégicos do produto?
- C4 (+1) O Caso de Uso reduz problemas identificados na análise de negócio?

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

| ID       | Nome                                            | VF | Peso | CT | Valor Final (Peso - CT) | MoSCoW      | Matriz de Esforço | MVP |
| -------- | ----------------------------------------------- | -- | ---- | -- | ----------------------- | ----------- | ----------------- | --- |
| **UC01** | Cadastrar usuário                               | 3  | 7    | 1  | 6                       | Should Have | Quadrante 3       | X   |
| **UC02** | Autenticar usuário                              | 3  | 7    | 1  | 6                       | Should Have | Quadrante 3       | X   |
| **UC03** | Recuperar senha                                 | 2  | 4    | 2  | 2                       | Could Have  | Quadrante 3       | --  |
| **UC04** | Gerenciar Perfil                                | 2  | 4    | 1  | 3                       | Could Have  | Quadrante 3       | --  |
| **UC05** | Excluir conta                                   | 2  | 4    | 1  | 3                       | Could Have  | Quadrante 3       | --  |
| **UC06** | Localizar PEVs                                  | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| **UC07** | Consultar detalhes do PEV                       | 2  | 4    | 2  | 2                       | Could Have  | Quadrante 3       | --  |
| **UC08** | Ler Token para Descarte                         | 4  | 10   | 4  | 6                       | Must Have   | Quadrante 2       | X   |
| **UC09** | Consultar Extrato                               | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| **UC10** | Exibir Catálogo de Recompensas                  | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| **UC11** | Resgatar Recompensas                            | 4  | 10   | 4  | 6                       | Must Have   | Quadrante 2       | X   |
| **UC12** | Exibir Vitrine de Conquistas                    | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| **UC13** | Exibir Progresso da Sequência                   | 2  | 4    | 3  | 1                       | Could Have  | Quadrante 4       | --  |
| **UC14** | Configurar Anonimato                            | 2  | 4    | 2  | 2                       | Could Have  | Quadrante 3       | --  |
| **UC15** | Visualizar Ranking                              | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| **UC16** | Visualizar Painel de Impacto Pessoal            | 2  | 4    | 3  | 1                       | Could Have  | Quadrante 4       | --  |
| **UC17** | Consultar Estatísticas do Impacto da Comunidade | 2  | 4    | 3  | 1                       | Could Have  | Quadrante 4       | --  |


### Justificativa de valor atribuido

|    ID    |                      Nome                       | C1 | C2 | C3 | C4 | VF |
|----------|-------------------------------------------------|----|----|----|----|----|
| **UC01** | Cadastrar usuário                               | V  | -- | V  | V  | 3  |
| **UC02** | Autenticar usuário                              | V  | -- | V  | V  | 3  |
| **UC03** | Recuperar senha                                 | V  | -- | V  | -- | 2  |
| **UC04** | Gerenciar Perfil                                | -- | V  | -- | V  | 2  |
| **UC05** | Excluir conta                                   | -- | -- | V  | V  | 2  |
| **UC06** | Localizar PEVs                                  | V  | V  | V  | V  | 4  |
| **UC07** | Consultar detalhes do PEV                       | -- | V  | V  | -- | 2  |
| **UC08** | Ler Token para Descarte                         | V  | V  | V  | V  | 4  |
| **UC09** | Consultar Extrato                               | V  | V  | V  | V  | 4  |
| **UC10** | Exibir Catálogo de Recompensas                  | V  | V  | V  | V  | 4  |
| **UC11** | Resgatar Recompensas                            | V  | V  | V  | V  | 4  |
| **UC12** | Exibir Vitrine de Conquistas                    | V  | V  | V  | V  | 4  |
| **UC13** | Exibir Progresso da Sequência                   | -- | V  | V  | -- | 2  |
| **UC14** | Configurar Anonimato                            | -- | V  | -- | V  | 2  |
| **UC15** | Visualizar Ranking                              | V  | V  | V  | V  | 4  |
| **UC16** | Visualizar Painel de Impacto Pessoal            | -- | V  | V  | -- | 2  |
| **UC17** | Consultar Estatísticas do Impacto da Comunidade | -- | V  | V  | -- | 2  |


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

|    Data    | Versão |                               Descrição da Alteração                             |     Autor(a)     |
|------------|--------|----------------------------------------------------------------------------------|------------------|
| 13/05/2026 |   1.0  | Criação do documento e estruturação dos tópicos iniciais, bem como seu conteúdo. | Joaquim e Nayla  |
| 17/04/2026 |   2.0  | Correção da priorização conforme feedback do professor.                          | Yasmim e Joaquim |
| 18/04/2026 |   2.1  | Corrigindo template das tabelas, adicionando os Casos de Uso e definição do MVP. | Yasmim e Joaquim |
| 15/06/2026 |   3.0  | Revisão e correção da priorização.                                               | Joaquim          |
