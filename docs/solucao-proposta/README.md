# 2. Solução Proposta

## 2.1. Objetivo geral do produto

Reduzir a alta fricção e introduzir feedback no processo de descarte responsável ao oferecer recompensa e informações de descarte aos usuários.

## 2.2. Objetivos específicos (OE's)

- **OE1**: Incentivar o engajamento à prática de ação sustentável através de gamificação.
- **OE2**: Facilitar o processo de descarte responsável, fornecendo mapeamento intuitivo e identificação de materiais que podem ser descartados.
- **OE3**: Prevenção de fraudes na validação de descarte responsável físicos.
- **OE4**: Comprovar o impacto de descarte responsável.

## 2.3. Características do Produto
| ID | Característica do Produto (CP) | Descrição Resumida | ID | Valor de Negócio | Contribuição principal | Contribuição secundária | 
|----|----------|-------------|----|----------|-------------|--------------| 
| CP1 | Sistema de Missões (Quests) | A solução deverá conter um sistema de missões sustentáveis, organizadas em diárias ou semanais, com objetivos definidos, de modo a incentivar a adoção contínua de práticas sustentáveis e promover o engajamento recorrente dos usuários | VN1 | Melhoria do engajamento contínuo e fortalecimento da participação dos usuários | OE1 | OE2 |
| CP2 | Sistema de progressão | A solução deverá conter um sistema de pontuação baseado em experiência (XP) e níveis, estruturado por métricas de desempenho, de modo a acompanhar a evolução dos usuários e estimular sua progressão na plataforma. | VN2 | Aumento da retenção e redução da evasão de usuários | OE2 | OE4 |
| CP3 | Conquistas (Insígnias) | A solução deverá conter um sistema de recompensas simbólicas atreladas ao cumprimento de metas, de modo a reconhecer o desempenho dos usuários e incentivar a continuidade de suas ações | VN3 | Aumento da motivação e estímulo à continuidade das atividades | OE2 | OE1 |
| CP4 | Streaks | A solução deverá conter um contador de dias consecutivos de participação, de modo a monitorar a consistência dos usuários e incentivar a manutenção de hábitos contínuos | VN4 | Aumento da fidelização e fortalecimento do vínculo com a plataforma | OE2 | OE1 |
| CP5 | Ranking Social | A solução deverá conter um sistema de ranking para competição entre estudantes, baseado em critérios de desempenho, de modo a promover a interação, o engajamento e a motivação por meio da competitividade | VN5 | Aumento do engajamento social, da interação e da integração no ambiente acadêmico | OE4 | OE2 |
| CP6 | Validação do cumprimento das atividades | A solução deverá conter um sistema de validação das atividades realizadas, por meio do envio de fotos ou vídeos capturados em tempo real, de modo a garantir a autenticidade das ações dos usuários e reduzir a ocorrência de fraudes ou plágio | VN6 | Redução de fraudes e aumento da confiabilidade nas interações e resultados da plataforma | OE3 | -- |
| CP7 | Sistema de recompensas | A solução deverá conter um sistema de premiação para os usuários com melhores pontuações nos rankings, de modo a reconhecer os que se destacaram e incentivar a participação ativa na plataforma | VN7 | Aumento da percepção de valor, reconhecimento das conquistas e valorização das missões concluídas | OE4 | OE2 |

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