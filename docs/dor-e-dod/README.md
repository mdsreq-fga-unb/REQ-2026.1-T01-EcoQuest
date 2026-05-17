
# DoR e DoD

Checklists de **Definition of Ready (DoR)** e **Definition of Done (DoD)** para itens do backlog (*Work Items List*).

Cada requisito deve indicar **OE** e **CP** (ver [Solução Proposta](../solucao-proposta/)).

## DoR (Ready)

- Dimensão de Clareza: 
> - O ator, qualquer entidade externa ao sistema que interage com ele para atingir um objetivo, está nomeado, seu papel está descrito e seu objetivo de negócio está explícito no item ? Todos devem ter plena clareza daquilo que deverá ser desenvolvido. 
> - O IP foi calculado e o quadrante definido ?
> - Os critérios de aceite, lista de itens de negócio que apresentam as formas de usar as funcionalidades implementadas na US, existem e estão ligados ao objetivo ?
>  - A classificação MoSCoW da US em si está definida e registrada no backlog ?
> - Regras de negócios devidamente verificadas dentro do contexto ? Critério de completude do contexto de negócio.
> - Sabemos o que 'aprovado' significa e quem aprova ?
-Dimensão de Viabilidade: 
> - As dependências técnicas foram mapeadas ?
> - Os impedimentos conhecidos foram removidos ou possuem plano de mitigação documentado ? 
-Dimensão de Estimabilidade: 
> - Os critérios de aceite são específicos o suficiente para que a equipe estime o esforço com precisão ? 
> - O INVEST(*Independent, Negotiable, Valuable, Estimable, Small, Testable*) passou sem ressalvas de nenhum membro da equipe ? 
> - Conseguimos estimar o tempo total incluindo o ciclo de validação com a cliente ?
-Dimensão de Escopo: 
> - O escopo cabe em uma iteração ? 
> - Entendimento compartilhado de cada parte e de como aquilo contribui para um todo. Para que possamos verificar o nível de entendimento e responder a pergunta "Para cada item que queremos mover para o fluxo ativo essa semana: cada um aqui consegue me dizer exatamente o que vai construir, como vai testar, e em quanto tempo, sem fazer nenhuma pergunta ? Se não, o que especificamente está faltando ? 
> - Caso seja não seja possível responder como equipe o item volta para refinamento, se for a nível individual será aberta uma issue para estudo/verificação.
> - As dependências entre itens foram mapeadas e os itens dependentes estão concluídos ou há acordo explícito sobre como proceder ?

## DoD (Done)

 Dimensão de Completude Funcional (RF): 
 → Todos os fluxos principais e alternativos do Caso de Uso foram implementados? 
 Dimensão de Qualidade Técnica (RNF): → Requisitos de desempenho, segurança e usabilidade foram verificados dentro os parâmetros mensuráveis dos mesmos ? 
 Dimensão de Validação: → Testes unitários escritos e passando? → Revisão de código realizada por outro membro? → Critérios de aceitação validados com o usuário/cliente, validação assíncrona de núcleos de funcionalidades menores e prototipos e validação síncrona de regras de negócio e conjuntos funcionais que englobem mais de 3 US.  
 Dimensão de Documentação: → A documentação técnica relevante foi atualizada? → Rastreabiliade completa atualizada, (backlog - história - OE/CP - AC) 
 Dimensão de Integração: → O código está integrado na branch principal sem conflitos? → O build de integração passou? 


## Uso no processo

flowchart TD
    %% Estilização de Cores (Paleta Ecológica aplicada ao diagrama)
    classDef objetivo fill:#2E7D32,stroke:#1b5e20,stroke-width:2px,color:#fff;
    classDef gate fill:#F9FBE7,stroke:#81C784,stroke-width:2px,color:#263238;
    classDef execucao fill:#81C784,stroke:#2E7D32,stroke-width:2px,color:#263238;

    %% Nós e Fluxos
    A([🎯 OKR Semanal Definido]) ::: objetivo --> B{Item passa pelo DoR?} ::: gate
    
    B -- Não --> B_Refine[Refinamento de Backlog] -.-> B
    B -- Sim --> C[📌 Commitment Point no Kanban] ::: execucao
    
    C --> D[Desenvolvimento com WIP Controlado] ::: execucao
    
    D --> E{Item passa pelo DoD?} ::: gate
    
    E -- Não --> E_Fix[Correção / Débito Técnico] -.-> E
    E -- Sim --> F[✅ Done válido] ::: execucao
    
    F --> G([🔄 Revisão Semanal do OKR / Key Result Atualizado]) ::: objetivo

## Exemplo mínimo (User Story)

**ID:** US-XX  
**História:** Como estudante, quero concluir uma missão diária e ganhar XP para acompanhar meu progresso.  
**OE/CP:** OE2; CP1 + CP2  
**MoSCoW:** Must  

**AC:**
- Concluir missão com evidência válida registra conclusão e soma XP.
- Painel de progresso exibe XP e nível atualizados.

**Validação com cliente:** assíncrona (e-mail); consolidar decisão em ata.

