
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


## 8.2. Requisitos não funcionais

| ID | Nome | Descrição | Classificação URPS+ | Classificação Sommerville |
| :--- | :--- | :--- | :--- | :--- |
| RNF01 | Responsividade Mobile  | A interface deve adaptar-se a telas a partir de 360px, priorizando o uso em smartphones | U (Usabilidade) | Produto (Usabilidade) |
| RNF02 | Desempenho de Resposta | O tempo de resposta para validação de tokens e resgate de cupons não deve exceder 2s no P95 | P (Desempenho) | Produto (Eficiência) |
| RNF03 | Acessibilidade Digital | A plataforma deve seguir as diretrizes WCAG 2.1 (nível AA), garantindo uso por daltônicos e leitores de tela | U (Usabilidade) | Produto (Usabilidade) |
| RNF04 | Alta Disponibilidade   | O sistema deve garantir 99.5% de uptime para evitar que o usuário fique "na mão" no momento do descarte responsável | R (Confiabilidade) | Produto (Confiabilidade) |
| RNF05 | Segurança de Dados     | Uso de TLS 1.2+ para trânsito e hashing robusto (ex: Argon2/BCrypt) para senhas | + (Segurança) | Produto (Segurança) |
| RNF06 | Integridade de Tokens  | Tokens (QR) devem ser assinados criptograficamente e possuir expiração curta para impedir replay attacks. | + (Segurança) | Produto (Segurança) |

## Histórico de versões

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 11/05/2026 | 1.0 | Criação do documento e estruturação dos tópicos iniciais, bem como seu conteúdo. | Yasmim e Paulo | 
| 14/04/2026 | 2.0 | Correção dos requisitos conforme feedback do professor. | Yasmim e João Victor | 
| 18/04/2026 | 2.1 | Corrigindo template das tabelas. | Yasmim |