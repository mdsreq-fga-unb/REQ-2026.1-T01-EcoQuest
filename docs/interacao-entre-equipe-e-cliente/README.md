# 6. Interação entre Equipe e Cliente

Define a interação equipe–cliente no **OpenUP**: cadência de validações, artefatos validados e gestão de feedback/mudanças.

Referências:

- Cliente/stakeholders: [Cenário Atual](/cenario-atual-do-cliente-e-do-negocio/)
- Cadência de incrementos e SLA de feedback: [Cronograma e Entregas](/cronograma-e-entregas/)
- Práticas de ER alinhadas ao OpenUP: [Engenharia de Requisitos](/engenharia-de-requisitos/)
- Critérios DoR/DoD: [DoR e DoD](/dor-e-dod/)
- Organização de requisitos e backlog: [Requisitos de Software](/requisitos-de-software/) e [Backlog do Produto](/backlog-de-produto/)

## 6.1 Stakeholders e responsabilidades

| Stakeholder | Papel | Participação | Responsabilidade |
|---|---|---|---|
| **Prof. Dra. Juliana Dalbone** | Cliente principal | Revisão quinzenal + feedback semanal (e-mail) | Domínio ambiental,regras de negócio; aprovar entregas |
| **Prof. Dr. George Marsicano Correa** | Cliente secundário / orientador | Revisões pontuais | Orientação acadêmica e decisões de ER |
| **Cidadãos (Doadores)** | Usuários finais | Validações pontuais (protótipos/fluxos) | Fornecer feedback sobre a fricção logística, clareza do mapeamento de PEVs e atratividade das recompensas |
| **ONGs (ex: Programando o Futuro)** | Operadores logísticos | Definição de fluxos operacionais e triagem | Feedback sobre integração, segurança e usabilidade para facilitar a triagem e recebimento de doações |
| **Rede de Parceiros** | Provedores de incentivo | Definição de regras de resgate | Definir critérios para recompensas, validar a atratividade e viabilidade das parcerias |
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
| **Visão (Vision)** | Objetivo do produto, OE, CP | [Solução Proposta](/solucao-proposta/) | Revisões quinzenais |
| **Stakeholder Requests** | Feedback/decisões/solicitações | [Atas](/interacao-entre-equipe-e-cliente/atas/) | Contínuo |
| **Work Items List** | Backlog (Kanban) | GitHub Projects + [Backlog do Produto](/backlog-de-produto/) | Planejamento quinzenal |
| **Requisitos** | User stories + Critério de Aceitação | [Requisitos de Software](/requisitos-de-software/) | Refinamento semanal |
| **Protótipos de IU** | Wireframes/fluxos | Ferramenta/artefatos de design | Refinamento quinzenal |
| **Change Request (CR)** | Solicitações de mudança | [Atas](/interacao-entre-equipe-e-cliente/atas/) + backlog | Contínuo |
| **Critérios de aceite** | DoR/DoD + testes | [DoR e DoD](/interacao-entre-equipe-e-cliente/dor-e-dod/) | Entrada (DoR) / saída (DoD) |
| **Plano da iteração** | Escopo e prioridades | Kanban + cronograma | Quinzenal |

## 6.6 Registro de feedback e decisões

Registro oficial: [Atas](/interacao-entre-equipe-e-cliente/atas/).
	
## 6.7 Tratamento de mudanças de requisitos (Change Management)

Fluxo de CR:

1. Registrar na ata ([Atas](/interacao-entre-equipe-e-cliente/atas/)) (CR + motivação).
2. Analisar impacto (esforço, riscos, dependências, OE/CP).
3. Decidir/priorizar (MoSCoW) e atualizar backlog/artefatos.
4. Validar com a cliente (assíncrono ou reunião quinzenal).

## 6.8 Resolução de conflitos e divergências

1. Analista de Requisitos media e propõe alternativas.
2. Decisão por critérios: OE/CP, valor, riscos, prazo.
3. Impasse: cliente principal decide; registrar em ata e backlog.

## 6.9 DoR e DoD conectados ao OpenUP

DoR/DoD = critérios de **entrada/saída** para itens do *Work Items List*.

- **DoR:** história clara, critérios de aceitação, vínculo com OE/CP, prioridade definida;
- **DoD:** requisito implementado, testado, validado e rastreado.

Checklists: [DoR e DoD](/dor-e-dod/).

## 6.10 Validação interna (antes de enviar ao cliente)

- Risco/viabilidade (impacto e dependências).
- Funcional/visual (fluxo x AC).
- Testes (quando aplicável).

## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 11/04/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | João Victor | 
| 12/04/2026 | 0.2 | Atualização dos papéis da equipe com analista de requisitos. | João Victor | 
| 17/05/2026 | 1.0 | Inclusão de critérios no DoR e DoD. | Paulo Vitor | 
| 18/05/2026 | 1.1 | Adicionar registro de feedback e decisões, validação, e tratamento de mudanças. | João Victor