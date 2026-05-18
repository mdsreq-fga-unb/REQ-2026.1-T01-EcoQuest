## Conceitos de Referência do Processo

Esta seção define os dois conceitos que aparecem como artefatos e
métricas ao longo de todas as dimensões do DoR e do DoD. Compreender
esses conceitos é pré-requisito para aplicar corretamente qualquer
critério descrito neste documento.

---

### O que são Critérios de Aceitação (ACs)

Critérios de Aceitação são condições verificáveis e inequívocas que
definem quando uma User Story foi implementada corretamente. Eles
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
    %% 1. Estrutura de Nós e Conexões
    A(["🎯 Objetivo Específico do Produto (OE)"]) --> B(["📦 Característica de Produto (CP)"])
    B --> C(["📝 User Story (US)"])
    C --> D(["✅ Critérios de Aceitação (AC)"])

    %% 2. Aplicação de Classes
    class A objetivo
    class B,C execucao
    class D gate

    %% 3. Definição de Estilos
    classDef objetivo fill:#2E7D32,stroke:#1b5e20,stroke-width:2px,color:#fff
    classDef gate fill:#F9FBE7,stroke:#81C784,stroke-width:2px,color:#263238
    classDef execucao fill:#81C784,stroke:#2E7D32,stroke-width:2px,color:#263238
```

Um AC sem rastreabilidade ao OE e CP correspondentes não é
um critério válido neste processo: ele desconecta a execução
técnica do propósito estratégico do produto.

**Referência:** Cohn, M. *User Stories Applied*. Addison-Wesley,
2004.

---

### O que são OKRs e como se conectam ao processo

OKR é um framework de definição e acompanhamento de metas composto
por dois elementos:

- **Objective (O):** Define *para onde* a equipe quer ir.
  É qualitativo, inspirador e com prazo definido.
- **Key Result (KR):** Define *como* a equipe saberá que chegou.
  É quantitativo, mensurável e falsificável — ou seja, ao final
  do ciclo, é possível dizer com certeza se foi atingido ou não.

**Referência:** Doerr, J. *Measure What Matters*. Portfolio/Penguin,
2018.

**Como os OKRs se conectam ao DoR e ao DoD neste processo:**

```mermaid
flowchart TD
    %% 1. Definição de Estilos
    classDef objetivo fill:#2E7D32,stroke:#1b5e20,stroke-width:2px,color:#fff
    classDef gate fill:#F9FBE7,stroke:#81C784,stroke-width:2px,color:#263238
    classDef execucao fill:#81C784,stroke:#2E7D32,stroke-width:2px,color:#263238
    classDef bloqueado fill:#FFEBEE,stroke:#EF5350,stroke-width:2px,color:#263238

    %% 2. Estrutura de Nós e Conexões 
    A(["🎯 OKR Semanal definido"]) --> B{"📋 Item passa pelo DoR?"}
    
    %% Fluxo DoR
    B -->|"Passa no DoR"| C["📌 Commitment Point no Kanban"]
    B -->|"Falha no DoR"| B_Fail["❌ Bloqueado — Retorna ao Refinamento"]
    %% Feedback para o início do ciclo (nó auxiliar para melhor visualização)
    B_Fail -.->|Refinamento| A_Loop(( )):::execucao
    A_Loop -.-> A
    
    C --> D["⚙️ Desenvolvimento com WIP controlado"]
    
    D --> E{"🛠️ Item passa pelo DoD Nível 1?"}
    
    %% Fluxo DoD Técnico
    E -->|"Done Técnico aprovado"| F{"💼 Item validado pela cliente?"}
    E -->|"Falha técnica"| E_Fail["❌ Bloqueado — Retorna ao Desenvolvimento"]
    %% Feedback para desenvolvimento
    E_Fail -.-> D
    
    %% Fluxo DoD Negócio
    F -->|"Validado pela cliente"| G["📈 Done válido alimenta o Key Result"]
    F -->|"Rejeitado pela cliente"| F_Fail["❌ Bloqueado — Retorna à Homologação"]
    %% Feedback para DoD Técnico
    F_Fail -.-> E
    
    G --> H(["🔄 Revisão semanal do OKR"])
    %% Feedback para o início de um novo ciclo
    H -.->|Novo ciclo| A

    %% 3. Aplicação de Classes
    class A,H objetivo
    class B,E,F gate
    class C,D,G,A_Loop execucao
    class B_Fail,E_Fail,F_Fail bloqueado

```

**Regra de contagem:** Um item só é contabilizado no progresso
de um Key Result se tiver cruzado o DoD Nível 2 — validação
pela cliente. Itens que passaram apenas pelo DoD Nível 1
(Done Técnico) estão em homologação e **não alimentam o KR**.
Essa regra garante que as métricas de OKR reflitam valor
entregue, não esforço despendido.


## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) | Revisor(a) |
| :---: | :---: | :--- | :--- | :--- |
| 17/05/2026 | 0.1 | Criação do documento e estruturação dos tópicos iniciais. | Paulo Vitor | 
| 18//05/2026 | 1.0 | Adição de fluxos de trabalho e refinamento da estrutura do documento.| Paulo Vitor |