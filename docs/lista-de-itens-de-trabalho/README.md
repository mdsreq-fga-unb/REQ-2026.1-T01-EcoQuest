# 10. Lista de Itens de Trabalho

## 10.1. Regras de negócio

| ID  | Nome da Regra de Negócio | Descrição |
| :--- | :--- | :--- |
| **RN1** | Gestão das Pontuações e Recompensas | A quantidade de pontos atribuída a cada tipo ou volume de resíduo poderá ser configurada pelos administradores do sistema |
| **RN2** | Validação do Descarte | Um descarte somente será considerado válido após a leitura e validação do token emitido pelo PEV. |
| **RN3** | Pontuação por Descarte | O sistema deve converter o volume e/ou tipo de resíduo descartado em pontos creditados na conta do usuário, conforme tabela de pontuação vigente |
| **RN4** | Insígnias de Conquista | O sistema deve conceder insígnias automaticamente quando o usuário atingir critérios de engajamento previamente definidos |
| **RN5** | Elegibilidade para Resgate | O usuário somente poderá resgatar recompensas quando possuir saldo de pontos igual ou superior ao valor exigido para o benefício selecionado |
| **RN6** | Unicidade do Token | Cada token emitido para validação de descarte poderá ser utilizado apenas uma única vez |
| **RN7** | Progresso das Conquistas | O sistema deve calcular e exibir o percentual de progresso do usuário em relação aos critérios necessários para obtenção de cada insígnia disponível |
| **RN8** | Unicidade de E-mail | Cada e-mail poderá estar associado a apenas uma única conta ativa no sistema |
| **RN9** | Política de Senha | A senha do usuário deve possuir no mínimo 8 caracteres e conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial |
| **RN10** | Validade do Token | Todo token emitido possui um prazo de validade de 10 minutos |
| **RN11** | Status do PEV | Cada PEV deve possuir um status (ativo ou inativo). Apenas PEVs com status ativo podem ser exibidos na busca, no mapa ou utilizados para leitura de token de descarte |
| **RN12** | Raio de Busca de Proximidade | A busca de PEVs deve considerar um raio de 10km a partir da localização do usuário, retornando apenas pontos de coleta dentro do raio definido pelo sistema |
| **RN13** | Status da Recompensa | Cada recompensa do catálogo deve possuir um status (ativa, esgotada ou expirada). Apenas recompensas com status ativo e estoque disponível podem ser exibidas como disponíveis para resgate |
| **RN14** | Anonimato no Ranking | Quando o usuário configurar a preferência de anonimato, seu identificador real não deve ser exibido no ranking social, sendo substituído por pseudônimo ou ocultação de posição, conforme a opção escolhida |
| **RN15** | Limite de Tentativas de Login | O sistema deve bloquear temporariamente as tentativas de login após 5 tentativas consecutivas com credenciais inválidas |
| **RN16** | Materiais Aceitos por PEV | Cada PEV deve possuir uma lista de materiais aceitos. Um descarte somente poderá ser registrado se o material informado constar entre os tipos aceitos pelo PEV |
| **RN17** | Controle de Estoque de Recompensas | O resgate de uma recompensa somente pode ser concluído se houver unidade disponível em estoque. A unidade é reservada no momento da geração do cupom e liberada caso o resgate não seja concluído com sucesso |
| **RN18** | Consentimento de Termos de Uso e Privacidade | O cadastro de um usuário somente pode ser concluído mediante aceite explícito dos termos de uso e da política de privacidade, em conformidade com a LGPD |

## 10.2. Lista de Itens de Trabalho

| ID | Nome | ID UC | Objetivo UC | RNFs Relacionados | RNs Relacionadas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RF01** | Cadastrar usuário | [**UC01**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc01) | Permitir a criação de uma conta no sistema | **RNF01** - Responsividade Mobile<br>**RNF03** - Acessibilidade Digital<br>**RNF05** - Segurança de Dados | **RN8** - Unicidade de E-mail<br>**RN9** - Política de Senha<br>**RN18** - Consentimento de Termos de Uso e Privacidade |
| **RF02** | Autenticar usuário | [**UC02**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc02) | Permitir acesso seguro ao sistema | **RNF02** - Desempenho de Resposta<br>**RNF04** - Alta Disponibilidade<br>**RNF05** - Segurança de Dados<br>**RNF06** - Integridade de Tokens | **RN15** - Limite de Tentativas de Login |
| **RF03** | Recuperar senha | [**UC03**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc03) | Permitir redefinição da senha | **RNF02** - Desempenho de Resposta<br>**RNF05** - Segurança de Dados<br>**RNF06** - Integridade de Tokens | **RN9** - Política de Senha<br>**RN10** - Validade do Token |
| **RF04** | Gerenciar Perfil | [**UC04**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc04) | Permitir edição de dados pessoais e preferências | **RNF01** - Responsividade Mobile<br>**RNF03** - Acessibilidade Digital<br>**RNF05** - Segurança de Dados | -- |
| **RF05** | Excluir conta | [**UC05**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc05) | Permitir exclusão da conta conforme LGPD | **RNF04** - Alta Disponibilidade<br>**RNF05** - Segurança de Dados | -- |
| **RF06** | Localizar PEVs | [**UC06**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc06) | Exibir pontos de coleta próximos | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade | **RN11** - Status do PEV<br>**RN12** - Raio de Busca de Proximidade |
| **RF07** | Consultar detalhes do PEV | [**UC07**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc07) | Exibir informações detalhadas de um ponto de coleta | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital | **RN11** - Status do PEV<br>**RN16** - Materiais Aceitos por PEV |
| **RF08** | Ler Token para Descarte | [**UC08**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc08) | Permitir leitura de QR Code para descarte | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF04** - Alta Disponibilidade<br>**RNF05** - Segurança de Dados<br>**RNF06** - Integridade de Tokens | **RN2** - Validação do Descarte<br>**RN3** - Pontuação por descarte<br>**RN4** - Insígnias de conquistas<br>**RN6** - Unicidade do Token<br>**RN10** - Validade do Token<br>**RN11** - Status do PEV<br>**RN16** - Materiais Aceitos por PEV |
| **RF09** | Consultar Extrato | [**UC09**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc09) | Exibir histórico de descartes e saldo de créditos disponível | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade<br>**RNF05** - Segurança de Dados | **RN3** - Pontuação por descarte |
| **RF10** | Exibir Catálogo de Recompensas | [**UC10**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc10) | Exibir benefícios, cupons e prêmios disponíveis para resgate | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade | **RN1** - Gestão das pontuções e recompensas<br>**RN5** - Elegibilidade para Resgate<br>**RN13** - Status da Recompensa |
| **RF11** | Resgatar Recompensas | [**UC11**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc11) | Processar o resgate de uma recompensa do catálogo | **RNF02** - Desempenho de Resposta<br>**RNF04** - Alta Disponibilidade<br>**RNF05** - Segurança de Dados<br>**RNF06** - Integridade de Tokens | **RN1** - Gestão das Pontuações e Recompensas<br>**RN5** - Elegibilidade para Resgate<br>**RN13** - Status da Recompensa<br>**RN17** - Controle de Estoque de Recompensas |
| **RF12** | Exibir Vitrine de Conquistas | [**UC12**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc12) | Exibir marcos e medalhas conquistados pelo usuário | **RNF01** - Responsividade Mobile<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade | **RN4** - Insígnias de conquistas<br>**RN7** - Progresso das Conquistas |
| **RF13** | Exibir Progresso das Insígnias | [**UC13**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc13) | Mostrar o status atual do progresso da conquista das insignias e proximidade de bônus | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF04** - Alta Disponibilidade | **RN7** - Progresso das Conquistas |
| **RF14** | Configurar Anonimato | [**UC14**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc14) | Permitir que o usuário oculte sua identidade no ranking social | **RNF03** - Acessibilidade Digital<br>**RNF05** - Segurança de Dados | **RN14** - Anonimato no Ranking |
| **RF15** | Visualizar Ranking | [**UC15**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc15) | Exibir ranking social com pontuação dos usuários | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade | **RN3** - Pontuação por descarte<br>**RN14** - Anonimato no Ranking |
| **RF16** | Visualizar Painel de Impacto Pessoal | [**UC16**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc16) | Exibir métricas de impacto ambiental geradas pelo usuário | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade | **RN3** - Pontuação por descarte |
| **RF17** | Consultar Estatísticas do Impacto da Comunidade | [**UC17**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc17) | Exibir o impacto ambiental acumulado por todos os usuários da plataforma | **RNF01** - Responsividade Mobile<br>**RNF02** - Desempenho de Resposta<br>**RNF03** - Acessibilidade Digital<br>**RNF04** - Alta Disponibilidade | -- |

## 10.3. Priorização

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
| [**UC01**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc01) | Cadastrar usuário                               | 3  | 7    | 1  | 6                       | Should Have | Quadrante 3       | X   |
| [**UC02**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc02) | Autenticar usuário                              | 3  | 7    | 1  | 6                       | Should Have | Quadrante 3       | X   |
| [**UC03**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc03) | Recuperar senha                                 | 2  | 4    | 2  | 2                       | Could Have  | Quadrante 3       | --  |
| [**UC04**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc04) | Gerenciar Perfil                                | 2  | 4    | 1  | 3                       | Could Have  | Quadrante 3       | --  |
| [**UC05**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc05) | Excluir conta                                   | 2  | 4    | 1  | 3                       | Could Have  | Quadrante 3       | --  |
| [**UC06**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc06) | Localizar PEVs                                  | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| [**UC07**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc07) | Consultar detalhes do PEV                       | 2  | 4    | 2  | 2                       | Could Have  | Quadrante 3       | --  |
| [**UC08**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc08) | Ler Token para Descarte                         | 4  | 10   | 4  | 6                       | Must Have   | Quadrante 2       | X   |
| [**UC09**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc09) | Consultar Extrato                               | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| [**UC10**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc10) | Exibir Catálogo de Recompensas                  | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| [**UC11**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc11) | Resgatar Recompensas                            | 4  | 10   | 4  | 6                       | Must Have   | Quadrante 2       | X   |
| [**UC12**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc12) | Exibir Vitrine de Conquistas                    | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| [**UC13**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc13) | Exibir Progresso da Sequência                   | 2  | 4    | 3  | 1                       | Could Have  | Quadrante 4       | --  |
| [**UC14**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc14) | Configurar Anonimato                            | 2  | 4    | 2  | 2                       | Could Have  | Quadrante 3       | --  |
| [**UC15**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc15) | Visualizar Ranking                              | 4  | 10   | 3  | 7                       | Must Have   | Quadrante 2       | X   |
| [**UC16**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc16) | Visualizar Painel de Impacto Pessoal            | 2  | 4    | 3  | 1                       | Could Have  | Quadrante 4       | --  |
| [**UC17**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc17) | Consultar Estatísticas do Impacto da Comunidade | 2  | 4    | 3  | 1                       | Could Have  | Quadrante 4       | --  |


### Justificativa de valor atribuido

|    ID    |                      Nome                       | C1 | C2 | C3 | C4 | VF |
|----------|-------------------------------------------------|----|----|----|----|----|
| [**UC01**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc01) | Cadastrar usuário                               | V  | -- | V  | V  | 3  |
| [**UC02**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc02) | Autenticar usuário                              | V  | -- | V  | V  | 3  |
| [**UC03**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc03) | Recuperar senha                                 | V  | -- | V  | -- | 2  |
| [**UC04**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc04) | Gerenciar Perfil                                | -- | V  | -- | V  | 2  |
| [**UC05**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc05) | Excluir conta                                   | -- | -- | V  | V  | 2  |
| [**UC06**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc06) | Localizar PEVs                                  | V  | V  | V  | V  | 4  |
| [**UC07**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc07) | Consultar detalhes do PEV                       | -- | V  | V  | -- | 2  |
| [**UC08**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc08) | Ler Token para Descarte                         | V  | V  | V  | V  | 4  |
| [**UC09**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc09) | Consultar Extrato                               | V  | V  | V  | V  | 4  |
| [**UC10**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc10) | Exibir Catálogo de Recompensas                  | V  | V  | V  | V  | 4  |
| [**UC11**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc11) | Resgatar Recompensas                            | V  | V  | V  | V  | 4  |
| [**UC12**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc12) | Exibir Vitrine de Conquistas                    | V  | V  | V  | V  | 4  |
| [**UC13**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc13) | Exibir Progresso da Sequência                   | -- | V  | V  | -- | 2  |
| [**UC14**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc14) | Configurar Anonimato                            | -- | V  | -- | V  | 2  |
| [**UC15**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc15) | Visualizar Ranking                              | V  | V  | V  | V  | 4  |
| [**UC16**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc16) | Visualizar Painel de Impacto Pessoal            | -- | V  | V  | -- | 2  |
| [**UC17**](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-EcoQuest/#/lista-de-itens-de-trabalho/uc17) | Consultar Estatísticas do Impacto da Comunidade | -- | V  | V  | -- | 2  |


## 10.4. Matriz de esforço

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
| 13/05/2026 |   1.0  | Criação do documento e estruturação dos tópicos iniciais, bem como seu conteúdo. | Joaquim e Nayra  |
| 17/04/2026 |   2.0  | Correção da priorização conforme feedback do professor.                          | Yasmim e Joaquim |
| 18/04/2026 |   2.1  | Corrigindo template das tabelas, adicionando os Casos de Uso e definição do MVP. | Yasmim e Joaquim |
| 13/06/2026 |   2.2  | Adicionando regras de negócio e removendo critérios de aceitação                 | Yasmim           |
| 13/06/2026 |   2.3  | Adicionando fluxos de exceção                                                    | Nayra            |
| 15/06/2026 |   3.0  | Revisão e correção da priorização.                                               | Joaquim          |
| 20/06/2026 |   3.1  | Melhora na rastreabilidade dos casos de uso                                      | Yasmim         |
| 27/06/2026 |   3.1  | Adicionando rastreabilidade visual vertical conforme feedback do professor.         | Yasmim         |
| 28/06/2026 |   3.2  | Adicionando RN8 a RN17 (e-mail, senha, token, PEV, proximidade, recompensa, anonimato, tentativas de login, materiais, disponibilidade recompensa) e atualizando rastreabilidade | Yasmim |