
# DoR e DoD

Este documento define **Definition of Ready (DoR)** e **Definition of Done (DoD)** do EcoQuest como critérios práticos de qualidade e governança na Engenharia de Requisitos (ER).

Os itens abaixo conectam cada requisito às **OE (Objetivos Específicos)** e às **CP (Características do Produto)**, conforme a solução proposta em [Solução Proposta](../solucao-proposta/).

## Definition of Ready (DoR)

Uma história/requisito está **Ready** quando:

1. **História clara:** escrita em formato de *user story* (ou equivalente) com objetivo explícito.
2. **Critérios de aceitação (AC):** claros, verificáveis e testáveis (sem ambiguidades).
3. **Rastreabilidade:** vínculo explícito com **OE** e **CP** (o “porquê” e o “o quê” no nível do produto).
4. **Prioridade definida:** MoSCoW e ordem no backlog acordadas.
5. **Regras de negócio definidas:** especialmente para missões e gamificação (pontuação, limites, validação, anti-fraude).
6. **Dependências mapeadas:** técnicas (API, banco, integrações) e de UX (telas, fluxos).
7. **Forma de validação acordada:** quem valida (cliente/stakeholders) e se será síncrona ou assíncrona.

## Definition of Done (DoD)

Uma história/requisito está **Done** quando:

1. **Implementação concluída:** funcionalidade entregue conforme o escopo combinado.
2. **Testes realizados:** unitários e/ou integração quando aplicável; validação manual do fluxo.
3. **Qualidade mínima:** revisão interna e correções aplicadas (bugs relevantes ao fluxo).
4. **Validação:** confirmação de que os critérios de aceitação foram atendidos; validação com a cliente quando o item for de regra de negócio/mecânica central.
5. **Rastreabilidade atualizada:** link entre item do backlog ↔ história ↔ OE/CP ↔ critérios de aceitação; documentação atualizada quando necessário.
6. **Pronto para demonstração/uso:** disponível em ambiente de homologação/execução acordado para a Sprint.

## Como DoR/DoD entram no fluxo de ER

- **Refinamento (Grooming):** aplicar DoR antes de puxar o item para desenvolvimento.
- **Revisão da Sprint:** aplicar DoD para decidir se o item pode ser considerado entregue.
- **Interação com cliente:** usar DoR/DoD como linguagem comum para reduzir retrabalho e registrar aceite.

## Exemplo mínimo de requisito (User Story)

**ID:** US-XX  
**História:** Como estudante, quero concluir uma missão diária e receber XP para acompanhar meu progresso.  
**OE:** OE2 (gamificação)  
**CP:** CP1 (Missões) + CP2 (Progressão)  
**Prioridade (MoSCoW):** Must  

**Critérios de aceitação:**
- Dado que o usuário aceitou uma missão diária, quando ele marcar como concluída com evidência válida, então o sistema registra a conclusão e soma XP.
- Dado que a missão foi concluída, quando o usuário abrir o painel de progresso, então o novo total de XP e o nível são exibidos.

**Validação com cliente:** assíncrona (e-mail) + revisão síncrona na reunião quinzenal, se houver pendência.

