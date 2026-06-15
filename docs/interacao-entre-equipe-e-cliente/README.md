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
- **GitHub Projects (Kanban)**: *Work Items List*.
- **GitHub Pages**: publicação da documentação.

### Frequência de Reuniões

**Iteração possui duração semanal.**

| Cerimônia | Cadência | Objetivo | Registro |
|---|---|---|---|
| Planejamento da iteração (Iteration Planning) | Semanal (seg.) | Selecionar itens e planejar execução | Kanban + plano da iteração |
| Revisão/Avaliação (Iteration Review/Assessment) | Semanal | Validar incremento internamente | Registro de status |
| Retrospectiva | Semanal | Ajustes de processo | Ações de melhoria |
| Revisão com stakeholders | Quinzenal (síncrona) | Decisões de escopo/artefatos | Ata |
| Validação assíncrona | Semanal (e-mail) | Feedback sobre incrementos | Ata + lista de itens de trabalho |

**SLA (ciclo de validação):**

- Envio de incrementos e artefatos para revisão: terça-feira.
- Triagem e consolidação de feedback: até a segunda-feira seguinte.
- Responsável pela triagem: Analista de Requisitos.

## 7.3 Processo de Validação

- **Elicitação/descoberta:** entrevistas e regras do domínio.
- **Análise/consenso:** escopo, MoSCoW, trade-offs.
- **Especificação:** casos de uso + critérios de aceitação (AC).
- **Modelagem:** protótipos e fluxos.
- **Verificação/validação:** aceite de incrementos e confirmação de AC.

### Artefatos (work products)

| Artefato (OpenUP) | Como aparece no EcoQuest | Onde é mantido | Quando é validado |
|---|---|---|---|
| **Visão (Vision)** | Objetivo do produto, OE, CP | [Solução Proposta](/solucao-proposta/) | Revisões quinzenais |
| **Stakeholder Requests** | Feedback, decisões e solicitações | [Atas](/atas/) | Contínuo |
| **Work Items List** | Lista de Itens de Trabalho priorizada no Kanban | GitHub Projects + [Lista de Itens de Trabalho](/lista-de-itens-de-trabalho/) | Refinamento semanal e planejamento quinzenal |
| **Requisitos** | Casos de Uso + Critérios de Aceitação + DoR/DoD | [Requisitos de Software](/requisitos-de-software/) | Refinamento semanal |
| **Protótipos de IU** | Wireframes/fluxos | Ferramenta/artefatos de design | Refinamento quinzenal |
| **Change Request (CR)** | Solicitações de mudança | [Atas](/atas/) + Lista de Itens de Trabalho | Contínuo |
| **Critérios de aceite** | DoR/DoD + testes | [DoR e DoD](/dor-e-dod/) | Entrada (DoR) / saída (DoD) |
| **Plano da iteração** | Escopo e prioridades | Kanban + cronograma | Quinzenal |

Adaptação adotada pela equipe: o termo utilizado é **Lista de Itens de Trabalho** como o processo OpenUP se refere.
	
### Tratamento de mudanças de requisitos (Change Management)

Fluxo de CR:

1. Registrar na ata ([Atas](/atas/)) (CR + motivação).
2. Analisar impacto (esforço, riscos, dependências, OE/CP).
3. Decidir/priorizar (MoSCoW) e atualizar artefatos.
4. Validar com a cliente (assíncrono ou reunião quinzenal).

### Resolução de conflitos e divergências

1. Analista de Requisitos media e propõe alternativas.
2. Decisão por critérios: OE/CP, valor, riscos, prazo.
3. Impasse: cliente principal decide; registrar em ata e atualizar a lista de itens de trabalho.

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

> [08/05/2026 - Entrevista inicial e clarificação de escopo](/atas/08-05.md)
> 
> [11/05/2026 - Reunião de Alinhamento e Mudança com a equipe](/atas/11-05.md)
> 
> [13/05/2026 - Brainstorming de fluxo de simulação e recompensas](/atas/13-05.md)
> 
> [16/05/2026 - Validação Assíncrona dos Requisitos e Regras de Negócio](/atas/16-05.md)
> 
> [17/05/2026 - Validação de wireframe de simulação de descarte](/atas/17-05.md)
> 
> [04/06/2026 - Brainstorming de identidade visual](/atas/04-06-brainstorming.md)
> 
> [04/06/2026 - Validação de wireframes](/atas/04-06-validacao.md)
> 
> [12/06/2026 - Validação de identidade visual](/atas/12-06.md)
> 
> Histórico completo em [Atas](/atas/).


## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 11/04/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | João Victor | 
| 12/04/2026 | 0.2 | Atualização dos papéis da equipe com analista de requisitos. | João Victor | 
| 17/05/2026 | 1.0 | Inclusão de critérios no DoR e DoD. | Paulo Vitor | 
| 18/05/2026 | 1.1 | Adicionar registro de feedback e decisões, validação, e tratamento de mudanças. | João Victor |
| 18/05/2026 | 1.2 | Adicionar histórico de reuniões e atas. | João Victor |
| 18/05/2026 | 1.3 | Simplificação e formato mais adequado ao template. | João Victor |
| 12/06/2026 | 1.4 | Atualização dos links e centralização das evidências em /atas. | João Victor |
| 14/06/2026 | 1.5 | Ajuste de terminologia e adequação do processo documentado ao fluxo real da equipe. | João Victor |
