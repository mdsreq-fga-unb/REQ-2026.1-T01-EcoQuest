
# 8. Requisitos de Software

## 8.1. Requisitos funcionais

| ID | Nome | Descrição | CP mãe | OE |
| :--- | :--- | :--- | :--- | :--- |
| **RF01** | Cadastrar usuário | Permitir a criação de conta com nome, CPF, telefone, e-mail e senha. | **CP5** - Gerenciamento e autenticação de usuários | **OE5** - Gerenciar o descarte responsável |
| **RF02** | Autenticar usuário | Validar credenciais (e-mail e senha) e gerenciar a sessão segura do usuário no sistema. | **CP5** - Gerenciamento e autenticação de usuários | **OE5** - Gerenciar o descarte responsável |
| **RF03** | Recuperar senha | Permitir que o usuário redefina sua senha via link seguro enviado ao e-mail cadastrado. | **CP5** - Gerenciamento e autenticação de usuários | **OE5** - Gerenciar o descarte responsável |
| **RF04** | Gerenciar perfil | Permitir edição de dados pessoais e preferências de privacidade/anonimato. | **CP5** - Gerenciamento e autenticação de usuários | **OE5** - Gerenciar o descarte responsável |
| **RF05** | Excluir conta | Garantir o direito ao esquecimento, removendo dados do usuário conforme a LGPD. | **CP8** - Proteção e privacidade de dados | **OE5** - Gerenciar o descarte responsável |
| **RF06** | Localizar PEVs | Exibir mapa interativo com geolocalização dos pontos de coleta mais próximos. | **CP4** - Logística e localização de PEVs | **OE3** - Facilitar o processo de descarte responsável |
| **RF07** | Consultar detalhes do PEV | Exibir informações do ponto físico, como horários, materiais aceitos e capacidade de coleta. | **CP4** - Logística e localização de PEVs | **OE3** - Facilitar o processo de descarte responsável |
| **RF08** | Ler token para descarte | Permitir que o usuário utilize a câmera para ler o QR Code gerado pelo PEV. | **CP3** - Gestão e validação de descarte responsável | **OE4** - Prevenção de fraudes na validação de descarte físico responsável |
| **RF09** | Consultar extrato | Exibir histórico detalhado de descartes responsáveis e saldo de créditos disponível. | **CP3** - Gestão e validação de descarte responsável | **OE5** - Gerenciar o descarte responsável |
| **RF10** | Exibir catálogo de recompensas | Exibir catálogo de benefícios, cupons e prêmios disponíveis por ONGs e parceiros. | **CP2** - Sistema de pontuação e recompensas | **OE2** - Incentivar a adoção de práticas de descarte responsável |
| **RF11** | Resgatar recompensas | Processar o débito de pontos e gerar código/cupom de benefício para uso externo. | **CP2** - Sistema de pontuação e recompensas | **OE2** - Incentivar a adoção de práticas de descarte responsável |
| **RF12** | Exibir vitrine de conquistas | Permitir a visualização de todos os marcos e medalhas conquistados pelo usuário. | **CP1** - Sistema de ranking e gamificação | **OE1** - Aumentar o engajamento com relação a práticas sustentáveis através da gamificação |
| **RF13** | Exibir progresso da sequência | Mostrar visualmente o status atual da sequência e a proximidade de bônus. | **CP1** - Sistema de ranking e gamificação | **OE1** - Aumentar o engajamento com relação a práticas sustentáveis através da gamificação |
| **RF14** | Configurar anonimato | Permitir que o usuário oculte sua posição ou utilize pseudônimo no ranking social. | **CP8** - Proteção e privacidade de dados | **OE5** - Gerenciar o descarte responsável |
| **RF15** | Visualizar ranking | Exibir ranking social com os pontos obtidos pelos usuários da plataforma. | **CP1** - Sistema de ranking e gamificação | **OE1** - Aumentar o engajamento com relação a práticas sustentáveis através da gamificação |
| **RF16** | Visualizar painel de impacto pessoal | Mostrar métricas de impacto ambiental, como CO₂ evitado e resíduos reciclados. | **CP6** - Dados de impacto | **OE1** - Aumentar o engajamento com relação a práticas sustentáveis através da gamificação |
| **RF17** | Consultar estatísticas de impacto da comunidade | Exibir painel público com o impacto ambiental acumulado pelos usuários da plataforma. | **CP6** - Dados de impacto | **OE2** - Incentivar a adoção de práticas de descarte responsável |

## 8.2. Requisitos não funcionais

| ID | Nome | Descrição | Classificação URPS+ | Classificação Sommerville |
| :--- | :--- | :--- | :--- | :--- |
| **RNF01** | Responsividade Mobile | A interface deve adaptar-se a telas a partir de 360px, priorizando o uso em smartphones | U (Usabilidade) | Produto (Usabilidade) |
| **RNF02** | Desempenho de Resposta | O tempo de resposta para validação de tokens e resgate de cupons não deve exceder 2s no P95 | P (Desempenho) | Produto (Eficiência) |
| **RNF03** | Acessibilidade Digital | A plataforma deve seguir as diretrizes WCAG 2.1 (nível AA), garantindo uso por daltônicos e leitores de tela | U (Usabilidade) | Produto (Usabilidade) |
| **RNF04** | Alta Disponibilidade | O sistema deve garantir 99.5% de uptime para evitar que o usuário fique "na mão" no momento do descarte responsável | R (Confiabilidade) | Produto (Confiabilidade) |
| **RNF05** | Segurança de Dados | Uso de TLS 1.2+ para trânsito e hashing robusto (ex: Argon2/BCrypt) para senhas | + (Segurança) | Produto (Segurança) |
| **RNF06** | Integridade de Tokens | Tokens (QR) devem ser assinados criptograficamente e possuir expiração curta para impedir replay attacks | + (Segurança) | Produto (Segurança) |

## Histórico de versões

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 11/05/2026 | 1.0 | Criação do documento e estruturação dos tópicos iniciais, bem como seu conteúdo. | Yasmim e Paulo | 
| 14/04/2026 | 2.0 | Correção dos requisitos conforme feedback do professor. | Yasmim e João Victor | 
| 18/04/2026 | 2.1 | Corrigindo template das tabelas. | Yasmim |