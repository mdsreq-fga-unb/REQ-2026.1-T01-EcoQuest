
# Requisitos de Software

Esta seção define como os requisitos do EcoQuest são representados, validados e rastreados ao longo do projeto.

## 1. Forma de representação

Os requisitos são descritos principalmente como **User Stories**, complementadas por:

- **Critérios de aceitação (AC)** para tornar cada requisito verificável;
- **Protótipos/wireframes** quando o requisito envolve fluxo ou interface;
- **Regras de negócio** quando o requisito envolve missões, validação e gamificação.

## 2. Campos mínimos de um requisito

Cada requisito/história deve conter, no mínimo:

- **ID** (ex.: US-XX)
- **Descrição** (formato “Como... quero... para...”, ou equivalente)
- **OE (Objetivo Específico)** e **CP (Característica do Produto)** associados (ver [Solução Proposta](../solucao-proposta/))
- **Prioridade (MoSCoW)**
- **Critérios de aceitação (AC)**
- **Forma de validação** (cliente/stakeholder; síncrona/assíncrona)

## 3. Validação e qualidade (DoR/DoD)

Para reduzir retrabalho e garantir consistência entre engenharia de requisitos e desenvolvimento:

- O item só segue para desenvolvimento quando estiver **Ready** (DoR).
- O item só é considerado entregue quando estiver **Done** (DoD).

As checklists estão em [DoR e DoD](../dor-e-dod/).

## 4. Rastreabilidade

A rastreabilidade é mantida de forma simples e prática:

- **Requisito - OE/CP:** cada história explicita a contribuição ao objetivo e à característica do produto.
- **Requisito - Backlog:** cada história existe como item no backlog (Kanban) e recebe prioridade.
- **Requisito - Feedback do cliente:** decisões e mudanças são registradas em [Atas](../interacao-entre-equipe-e-cliente/atas.md).

## 5. Tratamento de mudanças

Mudanças de requisito devem ser:

1. Registradas em ata (feedback/decisão);
2. Triadas e priorizadas internamente (MoSCoW + impacto);
3. Refletidas no backlog e nos artefatos associados (história, AC, protótipos, regras de negócio).

