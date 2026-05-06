# 6. Interação entre Equipe e Cliente

Define a interação equipe–cliente no **OpenUP**: cadência de validações, artefatos validados e gestão de feedback/mudanças.

Referências:

- Cliente/stakeholders: [Cenário Atual](../cenario-atual-do-cliente-e-do-negocio/)
- Cadência de incrementos e SLA de feedback: [Cronograma e Entregas](../cronograma-e-entregas/)
- Práticas de ER alinhadas ao OpenUP: [Engenharia de Requisitos](../engenharia-de-requisitos/)
- Critérios DoR/DoD: [DoR e DoD](../dor-e-dod/)
- Organização de requisitos e backlog: [Requisitos de Software](../requisitos-de-software/) e [Backlog do Produto](../backlog-de-produto/)

## 6.1 Stakeholders e responsabilidades

| Stakeholder | Papel | Participação | Responsabilidade |
|---|---|---|---|
| **Prof. Dra. Juliana Dalbone** | Cliente principal | Revisão quinzenal + feedback semanal (e-mail) | Domínio ambiental, missões e regras de negócio; aprovar entregas |
| **Prof. Dr. George Marsicano Correa** | Cliente secundário / orientador | Revisões pontuais | Orientação acadêmica e decisões de ER |
| **Estudantes universitários** | Usuários finais | Validações pontuais (protótipos/fluxos) | Usabilidade e clareza das missões |
| **Equipe EcoQuest** | Time de desenvolvimento | Planejamento e execução por iterações | Transformar feedback em itens rastreáveis |

## 6.2 Papéis da equipe (OpenUP)

| Papel | Foco | Responsável | Participantes |
|-------|-----------|------------|---------------|
| Gerente do Projeto (Project Manager) | Planejamento, riscos e alinhamento com stakeholders | Paulo Vitor Gomes | - |
| Analista de Requisitos (Analyst) | Elicitação/especificação; AC e rastreabilidade (OE/CP) | João Farias | Todos |
| Desenvolvedor Back-end (Developer) | API, banco e regras de negócio | Joaquim Neto | Todos |
| Desenvolvedor Front-end (Developer) | Implementação de Interface, fluxos e integração | Yasmim de Souza | Todos |
| Analista de Qualidade (Tester) | Testes e suporte ao aceite | Nayra Nery | Joaquim Neto |

**Responsabilidades:** atuação em duplas e compartilhamento de tarefas.

## 6.3 Comunicação e cerimônias (iterações OpenUP)

### Ferramentas de Comunicação:

- **Google Meet**: reuniões síncronas.
- **WhatsApp**: alinhamentos rápidos (decisões vão para ata).
- **E-mail**: validação assíncrona e envio de artefatos.
- **GitHub**: versionamento e documentação.
- **GitHub Projects (Kanban)**: *Work Items List* (backlog).
- **GitHub Pages**: publicação da documentação.

### Frequência de Reuniões

**Iteração = Sprint semanal.**

| Cerimônia | Cadência | Objetivo | Registro |
|---|---|---|---|
| Planejamento da iteração (Iteration Planning) | Semanal (seg.) | Selecionar itens e planejar execução | Kanban + plano da iteração |
| Revisão/Avaliação (Iteration Review/Assessment) | Semanal | Validar incremento internamente | Registro de status |
| Retrospectiva | Semanal | Ajustes de processo | Ações de melhoria |
| Revisão com stakeholders | Quinzenal (síncrona) | Decisões de escopo/artefatos | Ata |
| Validação assíncrona | Semanal (e-mail) | Feedback sobre incrementos | Ata + backlog |

**SLA (cronograma):** envio terça; triagem/processamento segunda.

## 6.4 Participação do cliente nas atividades de Requisitos (OpenUP)

- **Elicitação/descoberta:** entrevistas e regras do domínio.
- **Análise/consenso:** escopo, MoSCoW, trade-offs.
- **Especificação:** histórias + critérios de aceitação (AC).
- **Modelagem:** protótipos e fluxos.
- **Verificação/validação:** aceite de incrementos e confirmação de AC.

## 6.5 Artefatos (work products) validados com a cliente

| Artefato (OpenUP) | Como aparece no EcoQuest | Onde é mantido | Quando é validado |
|---|---|---|---|
| **Visão (Vision)** | Objetivo do produto, OE, CP | [Solução Proposta](../solucao-proposta/) | Revisões quinzenais |
| **Stakeholder Requests** | Feedback/decisões/solicitações | [Atas](atas.md) | Contínuo |
| **Work Items List** | Backlog (Kanban) | GitHub Projects + [Backlog do Produto](../backlog-de-produto/) | Planejamento semanal |
| **Requisitos** | User stories + Critério de Aceitação | [Requisitos de Software](../requisitos-de-software/) | Refinamento semanal |
| **Protótipos de IU** | Wireframes/fluxos | Ferramenta/artefatos de design | Elaboração + ajustes |
| **Change Request (CR)** | Solicitações de mudança | [Atas](atas.md) + backlog | Contínuo |
| **Critérios de aceite** | DoR/DoD + testes | [DoR e DoD](../dor-e-dod/) | Entrada (DoR) / saída (DoD) |
| **Plano da iteração** | Escopo e prioridades | Kanban + cronograma | Semanal |

## 6.6 Registro de feedback e decisões (atas)

Registro oficial: [Atas](atas.md).

## 6.7 Tratamento de mudanças de requisitos (Change Management)

Fluxo de CR:

1. Registrar na ata ([Atas](atas.md)) (CR + motivação).
2. Analisar impacto (esforço, riscos, dependências, OE/CP).
3. Decidir/priorizar (MoSCoW) e atualizar backlog/artefatos.
4. Validar com a cliente (assíncrono ou reunião quinzenal).

## 6.8 Resolução de conflitos e divergências

1. Analista de Requisitos media e propõe alternativas.
2. Decisão por critérios: OE/CP, valor, riscos, prazo.
3. Impasse: cliente principal decide; registrar em ata e backlog.

## 6.9 DoR e DoD conectados ao OpenUP

DoR/DoD = critérios de **entrada/saída** para itens do *Work Items List*.

- **DoR:** história + AC + OE/CP + prioridade.
- **DoD:** implementado, testado/validado e rastreado.

Checklists: [DoR e DoD](../dor-e-dod/).

## 6.10 Validação interna (antes de enviar ao cliente)

- Risco/viabilidade (impacto e dependências).
- Funcional/visual (fluxo x AC).
- Testes (quando aplicável).