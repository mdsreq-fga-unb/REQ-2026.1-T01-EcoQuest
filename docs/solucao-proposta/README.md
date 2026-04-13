# 2. Solução Proposta

## 2.1. Objetivo geral do produto
Aumentar o engajamento dos estudantes com práticas sustentáveis e com a disciplina, promovendo atividades práticas por meio de uma plataforma web gamificada, utilizando mecânicas de jogos e um sistema de recompensas, promovendo um engajamento contínuo, integração dos estudantes através de atividades coletivas e um impacto ambiental positivo.

## 2.2. Objetivos específicos (OE's)
- **OE1:**  Incentivar a adoção de práticas sustentáveis no cotidiano;
- **OE2:** Aumentar o engajamento por meio de gamificação;
- **OE3:** Validar as atividades realizadas, evitando fraudes;
- **OE4:** Promover interação social e competição saudável.

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
- **Infraestrutura:** a definir um VPS que nos permita rodar as duas instâncias de processos (backend e banco) de forma integrada, com acesso remoto para desenvolvimento e testes.

## 2.5 Pesquisa de Mercado e Análise Competitiva

A referência interna é o Aprender3 UnB, voltado a entrega de conteúdo e atividades tradicionais, porém sem gamificação. Em plataformas externas, Habitica explora gamificação e missões para engajamento continuo, com um plano pago para funcionalidades avançadas em que professores podem criar grupos e missões personalizadas, com foco geral em produtividade e hábitos.

O EcoQuest se diferencia por ser uma solução customizada para o contexto acadêmico, com foco em práticas sustentáveis, gamificação adaptada a esse nicho e integração social entre estudantes na UnB, promovendo um engajamento mais relevante e direcionado.

## 2.6  Viabilidade da Proposta

Com uma equipe de 5 pessoas e cerca de 1 hora diária por membro atuando no projeto, o escopo completo descrito atualmente não é viavel para 3 meses. A proposta só se torna viável com redução de escopo e foco em um MVP funcional. Deve-se ser discutido com o cliente quais funcionalidades são mais fundamentais para o MVP, a diferenciação de necessidades e desejos; E discutido fases posteriores ao MVP para implementação das demais funcionalidades.

**Pontos críticos de risco**: validação de atividades, precisão na verificação de provas, processamento de mídia e manutenção de engajamento. 

Deve-se priorizar missões/desafios, pontuação básica e validação manual inicial.

## 2.7 Benefícios Esperados

### Para o cliente

- Aumento do engajamento e participação na disciplina.
- Evidências praticas de atividades sustentáveis realizadas.
- Base inicial para mensurar impacto e ajustar a metodologia.

### Para os usuarios

- Atividades praticas com retorno imediato (pontuação/progresso).
- Motivação por metas e desafios sustentaveis.
- Interação social e competição saudável no grupo.