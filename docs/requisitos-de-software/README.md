
# 8. Requisitos de Software

## 8.1. Requisitos funcionais

| ID | Nome | Descrição | CP mãe | OE |
| :--- | :--- | :--- | :--- | :--- |
| RF01 | Cadastrar usuário | Permitir a criação de conta com nome, CPF, telefone, e-mail e senha. | Gerenciamento e autenticação de usuários | Comprovar o impacto de descarte |
| RF02 | Autenticar usuário | Validar credenciais (email e senha) e gerenciar a sessão segura do usuário no sistema | Gerenciamento e autenticação de usuários | Comprovar o impacto de descarte |
| RF03 | Recuperar senha | Permitir que o usuário redefina sua senha via link seguro enviado ao e-mail cadastrado | Gerenciamento e autenticação de usuários | Comprovar o impacto de descarte |
| RF04 | Gerenciar Perfil | Permitir edição de dados pessoais e preferências de privacidade/anonimato | Gerenciamento e autenticação de usuários | Comprovar o impacto de descarte |
| RF05 | Excluir conta | Garantir o direito ao esquecimento, removendo dados do usuário conforme a LGPD | Gerenciamento e autenticação de usuários | Comprovar o impacto de descarte |
| RF06 | Localizar PEVs | Exibir mapa interativo com geolocalização dos pontos de coleta mais próximos | Logística e localização de PEVs | Facilitar o processo de descarte responsável |
| RF07 | Consultar detalhes do PEV | Exibir informações do ponto físico: horários, materiais aceitos e capacidade de coleta | Logística e localização de PEVs | Facilitar o processo de descarte responsável |
| RF08 | Ler Token para Descarte | Permitir que o usuário utilize a câmera para ler o QR Code gerado pelo PEV | Gestão e validação de descarte responsável | Prevenção de fraudes na validação de descarte responsável |
| RF09 | Consultar Extrato | Exibir histórico detalhado de descarte responsáveis e saldo de créditos disponível | Gestão e validação de descarte responsável | Prevenção de fraudes na validação de descarte responsável |
| RF10 | Exibir Catálogo de Recompensas | Exibir catálogo de benefícios, cupons e prêmios disponíveis por ONGs e parceiros | Sistema de pontuação e recompensa | Aumentar o engajamento com relação à práticas sustentáveis através da gamificação |
| RF11 | Resgatar Recompensas | Processar o débito de pontos e gerar o código/cupom de benefício para uso externo | Sistema de pontuação e recompensa | Aumentar o engajamento com relação à práticas sustentáveis através da gamificação |
| RF12 | Exibir Vitrine de Conquistas | Permitir a visualização de todos os marcos e medalhas conquistados pelo usuário | Sistema de ranking e gamificação | Aumentar o engajamento com relação à práticas sustentáveis através da gamificação |
| RF13 | Exibir Progresso da Sequência | Mostrar visualmente o status atual da sequência e a proximidade de bônus | Sistema de ranking e gamificação | Aumentar o engajamento com relação à práticas sustentáveis através da gamificação |
| RF14 | Configurar Anonimato | Permitir que o usuário oculte sua posição ou use pseudônimo no ranking social | Sistema de ranking e gamificação | Aumentar o engajamento com relação à práticas sustentáveis através da gamificação |
| RF15 | Visualizar Ranking | Exibir um ranking social, onde deve ser possível visualizar os pontos obtidos por cada usuário | Sistema de ranking e gamificação | Aumentar o engajamento com relação à práticas sustentáveis através da gamificação |
| RF16 | Visualizar Painel de Impacto Pessoal | Mostrar métricas de impacto ambiental (ex: kg de CO2 evitado ou resíduos desviados) | Dados de impacto | Comprovar o impacto de descarte |
| RF17 | Consultar Estatísticas do Impato da Comunidade | Exibir um contador global ou painel público com o impacto ambiental acumulado por todos os usuários da plataforma | Dados de impacto | Comprovar o impacto de descarte |


<iframe
  width="100%"
  height="600"
  src="https://miro.com/app/live-embed/uXjVHSUl9qY=/?focusWidget=3458764672164512812&embedMode=view_only_without_ui&embedId=606878797406"
  frameborder="0"
  scrolling="no"
  allowfullscreen>
</iframe>


## 8.2. Requisitos não funcionais

| ID | Nome | Descrição | Classificação URPS+ | Classificação Sommerville |
| :--- | :--- | :--- | :--- | :--- |

<iframe
  width="100%"
  height="600"
  src="https://miro.com/app/board/uXjVHSb7VK4=/?share_link_id=231315817041"
  frameborder="0"
  scrolling="no"
  allowfullscreen>
</iframe>

## 8.3. Tratamento de mudanças

Mudanças de requisito devem ser:

1. Registradas em ata (feedback/decisão);
2. Triadas e priorizadas internamente (MoSCoW + impacto);
3. Refletidas no backlog e nos artefatos associados (história, AC, protótipos, regras de negócio).