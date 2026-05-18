## Conceitos de Referência do Processo

Esta seção define os dois conceitos que aparecem como artefatos e
métricas ao longo de todas as dimensões do DoR e do DoD. Compreender
esses conceitos é pré-requisito para aplicar corretamente qualquer
critério descrito neste documento.

---

### O que são Critérios de Aceitação (ACs)

Critérios de Aceitação são condições verificáveis e inequívocas que
definem quando um caso de uso foi implementado corretamente. Eles
funcionam como o contrato entre quem especifica o requisito e quem
o implementa: antes do desenvolvimento, estabelecem o que será
construído; após o desenvolvimento, estabelecem o que será testado.

**Formato padrão adotado:**

> *Dado* [um contexto inicial],
> *Quando* [uma ação é executada],
> *Então* [um resultado esperado e verificável ocorre].

**Cadeia de rastreabilidade obrigatória:**
```mermaid
flowchart TD
    A(["🎯 Objetivo Específico do Produto (OE)"]) --> B(["📦 Característica de Produto (CP)"])
    B --> C(["📋 Caso de Uso (UC)"])
    C --> D(["🗂️ Backlog"])
    D --> E(["✅ Critérios de Aceitação (AC)"])

    classDef objetivo fill:#2E7D32,stroke:#1b5e20,stroke-width:2px,color:#fff
    classDef execucao fill:#81C784,stroke:#2E7D32,stroke-width:2px,color:#263238
    classDef gate fill:#F9FBE7,stroke:#81C784,stroke-width:2px,color:#263238

    class A objetivo
    class B,C,D execucao
    class E gate
```

Um AC sem rastreabilidade ao OE e CP correspondentes não é
um critério válido neste processo: ele desconecta a execução
técnica do propósito estratégico do produto.

**Referência:** Eclipse Foundation. OpenUP (Open Unified Process) — Eclipse Process Framework (EPF)

---

### O que são OKRs e como se conectam ao processo

OKR é um framework de definição e acompanhamento de metas composto
por dois elementos:

- **Objective (O):** Define *para onde* a equipe quer ir.
  É qualitativo, inspirador e com prazo definido.
- **Key Result (KR):** Define *como* a equipe saberá que chegou.
  É quantitativo, mensurável e falsificável — ou seja, ao final
  do ciclo, é possível dizer com certeza se foi atingido ou não.

**Referência:** Doerr, J. *Measure What Matters*. 


**Como os OKRs se conectam ao DoR e ao DoD neste processo:**

```mermaid
flowchart TD
    classDef objetivo  fill:#2E7D32,stroke:#1b5e20,stroke-width:2px,color:#fff
    classDef gate      fill:#F9FBE7,stroke:#81C784,stroke-width:2px,color:#263238
    classDef execucao  fill:#81C784,stroke:#2E7D32,stroke-width:2px,color:#263238
    classDef bloqueado fill:#FFEBEE,stroke:#EF5350,stroke-width:2px,color:#263238
    classDef debito    fill:#fff3cd,stroke:#856404,stroke-width:2px,color:#000

    A(["🎯 OKR Semanal Definido"])
    B{"📋 Item passa\npelo DoR?"}
    B_Fail["❌ Bloqueado\nRetorna ao Refinamento"]
    C["📌 Commitment Point\nno Kanban"]
    D["⚙️ Desenvolvimento\ncom WIP Controlado"]
    E{"🛠️ DoD Nível 1\nDone Técnico?"}
    E_Fail["❌ Bloqueado\nRetorna ao Desenvolvimento"]
    F{"💼 DoD Nível 2\nValidado pela cliente?"}
    REJ{"Tipo de\nrejeição?"}
    F_Cons["❌ Erro de Construção\nRetorna ao Desenvolvimento"]
    F_Debt["📋 Ajuste de Valor\nNovo ticket — Débito Técnico\nUC fechado"]
    G["📈 Done válido\nalimenta o Key Result"]
    H(["🔄 Revisão Semanal do OKR"])

    A   --> B
    B   -->|"Passa no DoR"| C
    B   -->|"Falha no DoR"| B_Fail
    B_Fail -.->|"Após refinamento"| A

    C   --> D
    D   --> E
    E   -->|"Aprovado"| F
    E   -->|"Falha técnica"| E_Fail
    E_Fail -.->|"Após correção"| D

    F   -->|"Validado"| G
    F   -->|"Rejeitado"| REJ
    REJ -->|"Erro de construção"| F_Cons
    REJ -->|"Ajuste de valor"| F_Debt
    F_Cons -.->|"Após correção"| D

    G   --> H
    H   -.->|"Novo ciclo"| A

    class A,H objetivo
    class B,E,F,REJ gate
    class C,D,G execucao
    class B_Fail,E_Fail,F_Cons bloqueado
    class F_Debt debito
```

**Regra de contagem:** Um item só é contabilizado no progresso
de um Key Result se tiver cruzado o DoD Nível 2 — validação
pela cliente. Itens que passaram apenas pelo DoD Nível 1
(Done Técnico) estão em homologação e **não alimentam o KR**.
Essa regra garante que as métricas de OKR reflitam valor
entregue, não esforço despendido.


## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 17/05/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | Paulo Vitor | 
| 18/05/2026 | 1.0 | Adição de fluxos de trabalho e refinamento da estrutura do documento.| Paulo Vitor |