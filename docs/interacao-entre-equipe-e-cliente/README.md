# 7. Interação entre Equipe e Cliente

## 7.1 Papéis da equipe (OpenUP)

| Papel | Foco | Responsável | Participantes |
|-------|-----------|------------|---------------|
| Gerente do Projeto (Project Manager) | Planejamento, riscos e alinhamento com stakeholders | Paulo Vitor Gomes | - |
| Analista de Requisitos (Analyst) | Elicitação/especificação; AC e rastreabilidade (OE/CP) | João Farias | Todos |
| Desenvolvedor Back-end (Developer) | API, banco e regras de negócio | Joaquim Neto | Todos |
| Desenvolvedor Front-end (Developer) | Implementação de Interface, fluxos e integração | Yasmim de Souza | Todos |
| Analista de Qualidade (Tester) | Testes e suporte ao aceite | Nayra Nery | Joaquim Neto |

**Responsabilidades:** atuação em duplas e compartilhamento de tarefas.

## 7.2 Comunicação e cerimônias (iterações OpenUP)

A cliente principal é a Prof. Dra. Juliana Dalbone, que atua como orientadora e stakeholder chave, fornecendo feedback contínuo e validando os artefatos produzidos.

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

## 7.3 Processo de Validação

- **Elicitação/descoberta:** entrevistas e regras do domínio.
- **Análise/consenso:** escopo, MoSCoW, trade-offs.
- **Especificação:** histórias + critérios de aceitação (AC).
- **Modelagem:** protótipos e fluxos.
- **Verificação/validação:** aceite de incrementos e confirmação de AC.

### Artefatos (work products)

| Artefato (OpenUP) | Como aparece no EcoQuest | Onde é mantido | Quando é validado |
|---|---|---|---|
| **Visão (Vision)** | Objetivo do produto, OE, CP | [Solução Proposta](/solucao-proposta/) | Revisões quinzenais |
| **Stakeholder Requests** | Feedback/decisões/solicitações | [Atas](#atas) | Contínuo |
| **Work Items List** | Backlog (Kanban) | GitHub Projects + [Backlog do Produto](/backlog-de-produto/) | Planejamento quinzenal |
| **Requisitos** | User stories + Critério de Aceitação | [Requisitos de Software](/requisitos-de-software/) | Refinamento semanal |
| **Protótipos de IU** | Wireframes/fluxos | Ferramenta/artefatos de design | Refinamento quinzenal |
| **Change Request (CR)** | Solicitações de mudança | [Atas](#atas) + backlog | Contínuo |
| **Critérios de aceite** | DoR/DoD + testes | [DoR e DoD](/dor-e-dod/) | Entrada (DoR) / saída (DoD) |
| **Plano da iteração** | Escopo e prioridades | Kanban + cronograma | Quinzenal |
	
### Tratamento de mudanças de requisitos (Change Management)

Fluxo de CR:

1. Registrar na ata ([Atas](#atas)) (CR + motivação).
2. Analisar impacto (esforço, riscos, dependências, OE/CP).
3. Decidir/priorizar (MoSCoW) e atualizar backlog/artefatos.
4. Validar com a cliente (assíncrono ou reunião quinzenal).

### Resolução de conflitos e divergências

1. Analista de Requisitos media e propõe alternativas.
2. Decisão por critérios: OE/CP, valor, riscos, prazo.
3. Impasse: cliente principal decide; registrar em ata e backlog.

### Atas

Esta seção centraliza as **atas**, **decisões** e **Change Requests (CR)** levantados nas interações com a cliente e stakeholders.

#### Template de ata

**Data:** AAAA-MM-DD  
**Tipo:** (Revisão com stakeholders / Validação assíncrona)  
**Participantes:** (nomes)  
**Artefatos avaliados:** (links)  

**Feedback (Stakeholder Requests):**
- (ponto 1)

**Decisões:**
- (decisão 1)

**Change Requests (CR):**
- (CR-1) — descrição — impacto — prioridade (MoSCoW)

**Ações:**
- (ação) — responsável — prazo

---

#### Histórico de atas

> [08/05/2026 - Reunião de Alinhamento e clarificação de escopo com a cliente](/interacao-entre-equipe-e-cliente/atas/08-05.md)
> 
> [11/05/2026 - Reunião de Alinhamento e Mudança com a equipe](/interacao-entre-equipe-e-cliente/atas/11-05.md)
> 
> [16/05/2026 - Validação Assíncrona dos Requisitos e Regras de Negócio](/interacao-entre-equipe-e-cliente/atas/16-05.md)
> 
> Adicione novas atas acima desta linha.


## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 11/04/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | João Victor | 
| 12/04/2026 | 0.2 | Atualização dos papéis da equipe com analista de requisitos. | João Victor | 
| 17/05/2026 | 1.0 | Inclusão de critérios no DoR e DoD. | Paulo Vitor | 
| 18/05/2026 | 1.1 | Adicionar registro de feedback e decisões, validação, e tratamento de mudanças. | João Victor |
| 18/05/2026 | 1.2 | Adicionar histórico de reuniões e atas. | João Victor |
| 18/05/2026 | 1.3 | Simplificação e formato mais adequado ao template. | João Victor |