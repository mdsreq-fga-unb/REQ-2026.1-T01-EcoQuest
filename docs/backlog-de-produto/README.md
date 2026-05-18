
# 10. Backlog do Produto

## 10.1. Backlog Geral

| ID | Nome | ID UC | Objetivo UC | RNFs Relacionados |
| :--- | :--- | :--- | :--- | :--- |
| RF01 | Cadastrar usuário | UC01 | Permitir a criação de uma conta no sistema| RNF01, RNF03, RNF04 | 
| RF02 | Autenticar usuário | UC02 | Permitir acesso seguro ao sistema | RNF02, RNF03, RNF05 | 
| RF03 | Recuperar senha | UC03 | Permitir redefinição da senha | RNF02, RNF03, RNF05 | 
| RF04 | Gerenciar Perfil | UC04 | Permitir edição de dados pessoais e preferências | RNF01, RNF03, RNF04 | 
| RF05 | Excluir conta | UC05 | Permitir exclusão da conta conforme LGPD | RNF03, RNF05 | 
| RF06 | Localizar PEVs | UC06 | Exibir pontos de coleta próximos | RNF01, RNF02, RNF04, RNF05 | 
| RF07 | Consultar detalhes do PEV | UC07 | Exibir informações detalhadas de um ponto de coleta | RNF01, RNF02, RNF04 | 
| RF08 | Ler Token para Descarte | UC08 | Permitir leitura de QR Code para descarte | RNF01, RNF02, RNF03, RNF06 | 
| RF09 | Consultar Extrato | UC09 | -- | RNF02, RNF03, RNF05 | 
| RF10 | Exibir Catálogo de Recompensas | UC10 | -- | RNF01, RNF02, RNF04, RNF08 | 
| RF11 | Resgatar Recompensas | UC11 |  -- | RNF02, RNF03, RNF05, RNF08 | 
| RF12 | Exibir Vitrine de Conquistas | UC12 | -- | RNF01, RNF04, RNF05 | 
| RF13 | Exibir Progresso da Sequência | UC13 | -- | RNF01, RNF02, RNF05 | 
| RF14 | Configurar Anonimato | UC14 | -- | RNF01, RNF03, RNF04 | 
| RF15 | Visualizar Ranking | UC15 | -- | RNF01, RNF02, RNF04, RNF05 | 
| RF16 | Visualizar Painel de Impacto Pessoal | UC16 | -- | RNF01, RNF02, RNF05, RNF07 | 
| RF17 | Consultar Estatísticas do Impato da Comunidade | UC17 | -- | RNF01, RNF02, RNF05, RNF07 | 

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

---

## 10.2. Priorização

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

