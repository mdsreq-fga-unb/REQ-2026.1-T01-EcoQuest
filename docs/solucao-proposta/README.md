# 2. Solução Proposta

## 2.1. Objetivo geral do produto

Promover o engajamento da população no descarte responsável de resíduos eletroeletrônicos por meio de uma plataforma integrada de economia circular, conectando cidadãos, pontos de coleta, parceiros comerciais e ONGs de reciclagem com mecanismos de gamificação, recompensas e validação segura de descartes, a fim de facilitar o descarte correto, ampliar a participação dos usuários e reduzir os impactos ambientais causados pelo descarte inadequado de resíduos eletrônicos.

## 2.2. Objetivos específicos (OE's)

- **OE1**: Aumentar o engajamento com relação à práticas sustentáveis através da gamificação.
- **OE2**: Incentivar a adoção de práticas de descarte responsável.
- **OE3**: Facilitar o processo de descarte responsável.
- **OE4**: Prevenção de fraudes na validação de descarte físico responsável.
- **OE5**: Gerenciar o descarte responsável.

## 2.3. Características do Produto
| ID | Característica do Produto (CP) | Descrição Resumida | ID | Valor de Negócio | Contribuição principal | Contribuição secundária | 
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | 
| CP1 | Sistema de ranking e gamificação | A solução deverá conter rankings, streaks e elementos de gamificação para incentivar participação contínua e competição saudável entre usuários | VN1 | Melhoria do engajamento contínuo e fortalecimento da participação dos usuários | OE1 | OE2 |
| CP2 | Sistema de pontuação e recompensas | A solução deverá conter um sistema de pontuação baseado em descartes responsáveis realizados, permitindo acúmulo de pontos e troca por cupons e recompensas | VN2 | Incentivo contínuo às práticas sustentáveis por meio de recompensas e reconhecimento dos usuários | OE2 | OE1 |
| CP3 | Gestão e validação de descarte responsável | A solução deverá conter mecanismos de validação de entregas utilizando QR Code, token único e integração com APIs | VN3 | Garantia da autenticidade dos descartes e redução de fraudes no processo de validação | OE4 | OE5 |
| CP4 | Logística e Localização de PEVs | A solução deverá permitir identificar pontos de coleta próximos ao usuário com localização e materiais aceitos | VN4 | Facilitação do descarte correto e aumento da acessibilidade aos pontos de coleta | OE3 | OE2 |
| CP5 | Gerenciamento e Autenticação de Usuários        | A solução deverá conter mecanismos de cadastro, login, redefinição de senha e gerenciamento de perfis, permitindo acesso seguro e controle das contas dos usuários | VN5 | Segurança no acesso à plataforma e melhor gerenciamento das informações dos usuários | OE5 | OE4 |
| CP6 | Dados de impacto | A solução deverá conter informações do impacto ambiental do descarte responsável dos usuários e coletas dos PEVs | VN6 | Conscientização ambiental por meio da visualização de dados e resultados sustentáveis | OE1 | OE2 |
| CP7 | Integridade e Usabilidade                       | A solução deverá oferecer compatibilidade com dispositivos móveis e navegação otimizada em diferentes tamanhos de tela | VN7 | Melhoria da experiência do usuário e ampliação da acessibilidade da solução | OE1 | OE3 |
| CP8 | Proteção e privacidade de dados                 | A solução deverá proteger informações pessoais dos usuários utilizando criptografia e controle de privacidade | VN8 | Garantia de privacidade, proteção de dados e conformidade com requisitos de segurança | OE5 | OE4 |

## 2.4 Tecnologias a Serem Utilizadas

- **Backend:** Bun + Elysia (API e renderizacao server-side), porque permite desenvolvimento seguro com Typescript e PostgreSQL integrados nativamente com alta performance, simplicidade, agilidade, ideal para MVPs e fácil manutenção, além de ser uma stack moderna e leve, alinhada com as necessidades do projeto.
- **Frontend:** HTML renderizado no backend com HTMX, CSS e JavaScript para interatividade, pois é uma solução leve, de fácil manutenção e muito rápida para desenvolvimento de MVPs, sem complexidade de frameworks modernos, permitindo foco total na lógica de negócios e experiência do usuário.
- **Banco de dados:** PostgreSQL (Docker), pois oferece robustez, escalabilidade e facilidade de integração com o backend
- **Infraestrutura:** Contabo, por ser uma opção de hospedagem acessível, confiável e com boa performance, ideal para projetos acadêmicos e MVPs, oferecendo recursos suficientes para o desenvolvimento e testes iniciais do projeto.

## 2.5 Pesquisa de Mercado e Análise Competitiva

Há plataformas que abordam a temática de sustentabilidade, mas poucas focam especificamente na gestão de resíduos eletrônicos com um modelo de gamificação e recompensa. As soluções existentes geralmente se enquadram em duas categorias principais:
- Sistemas de Gestão de Resíduos (Benchmarks): Existem soluções como o Recicle Bem ou aplicativos de prefeituras, mas geralmente carecem de um mecanismo de recompensa imediata e de uma interface focada na experiência do cidadão, limitando-se a diretórios estáticos;
- Plataformas de Incentivo (Marketplace): Programas de fidelidade tradicionais raramente se integram a causas ambientais de forma direta e validada, criando um vácuo de confiança sobre o real destino do resíduo.

O EcoQuest se diferencia por:
- Ponte Físico-Digital: Validação via tokens únicos que impedem a fraude, algo ausente em sistemas baseados apenas em autodeclaração;
- Foco em Logística Reversa Local: Integração direta com ONGs do DF (ex: Programando o Futuro), criando um ecossistema de valor real para a comunidade local;
- Escalabilidade Modular: Arquitetura pronta para evoluir de um sistema de pontos para um marketplace completo de benefícios sustentáveis.

## 2.6  Viabilidade da Proposta

O projeto demonstra viabilidade técnica e financeira através de uma execução em fases:

- Fase 1 (MVP): Foco no desenvolvimento dentro do ecossistema acadêmico, particulamente focando no sistema de usuário. Utilizando infraestrutura de baixo custo e tecnologias de código aberto, a validação interna do modelo ocorre com investimento financeiro mínimo.
- Transição para Extensão: O projeto foi desenhado para transcender os muros da universidade, consolidando-se como um Projeto de Extensão. Isso permite a captação de recursos institucionais e o estabelecimento de parcerias estratégicas com a sociedade civil e ONGs, com desenvolvimento e implementação em hardware em PEVs e pontos de coleta.

Custos Estimados (Mensais):
- Hospedagem (VPS): ~€5.00 (Contabo);
- Domínio (.com.br / .org): ~R$ 40,00/ano;
- Manutenção: custo operacional de desenvolvimento (equipe acadêmica).

## 2.7 Benefícios Esperados

###### Para a Cliente (Prof. Dra. Juliana)

- Impacto Social: Fortalecimento do papel da universidade na solução de problemas ambientais reais através de um projeto de extensão.

###### Para as ONGs

- Aumento de Captação: Incremento no fluxo de resíduos eletrônicos e materiais doados de forma qualificada;
- Automação e Visibilidade: Redução do trabalho manual de registro de descartes responsáveis e maior exposição da ONG para um público engajado.

###### Para a Rede de Parceiros

- Responsabilidade Socioambiental (ESG): Para parceiros comerciais, a oportunidade de atrair clientes conscientes através do sistema de recompensas;
- Visibilidade de Marca: Participação em um projeto inovador e de impacto social, com potencial para gerar mídia positiva e engajamento comunitário.

###### Para os Usuários (Cidadãos)

- Reciprocidade Tangível: Retorno direto pelo esforço despendido, seja através de pontos, benefícios ou reconhecimento social;
- Fricção Reduzida: Facilidade em encontrar locais de descarte e entender o processo;
- Transparência: Visualização clara do impacto ambiental individual, transformando uma "obrigação" em uma ação de impacto positivo visível.

## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 11/04/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | Yasmim | 
| 11/04/2026 | 1.0 | Adicionar características de produto. | Yasmim | 
| 11/04/2026 | 2.1 | Atualizar pesquisa de mercado, tecnologias, beneficios e desafios. | João Victor |
| 17/05/2026 | 2.2 | Atualizar todos os tópicos com mudança de escopo do projeto de acordo com [1.2. Introdução ao negócio e contexto](../cenario-atual-do-cliente-e-do-negocio/README.md#12-introdução-ao-negócio-e-contexto). | João Victor |
| 18/05/2026 | 2.3 | Atualizar Objetivo Geral do Produto, Objetivos Específicos e Características de Produto | Yasmim |