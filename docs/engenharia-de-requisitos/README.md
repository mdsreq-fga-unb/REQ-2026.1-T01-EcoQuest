## 4.1 Atividades e Técnicas de ER

### Elicitação e Descoberta

- **Entrevistas com cliente:** utilizadas para compreender o problema do baixo engajamento em práticas sustentáveis, levantar necessidades do sistema e identificar expectativas em relação à solução proposta.
- **Brainstorming:** utilizado pela equipe para discutir ideias de funcionalidades e estratégias de gamificação adequadas ao contexto do EcoQuest.
- **Análise de domínio:** utilizada para compreender melhor o contexto acadêmico e ambiental do projeto, garantindo que os requisitos estejam alinhados ao propósito da solução.

### Análise e Consenso

- **Discussões em equipe:** utilizadas para alinhar o entendimento sobre os requisitos levantados e avaliar sua viabilidade no contexto do projeto.
- **Priorização MoSCoW:** utilizada para classificar os requisitos conforme sua importância para o MVP, distinguindo funcionalidades essenciais das desejáveis.
- **Análise de custo-benefício:** utilizada para apoiar decisões sobre o escopo da solução, considerando esforço, valor entregue e limitações do projeto.

### Declaração de Requisitos

- **User Stories:** utilizadas para registrar os requisitos de forma clara, objetiva e orientada ao valor entregue ao usuário.
- **Casos de Uso de alto nível:** utilizados para complementar a descrição das funcionalidades principais do sistema e representar as interações mais relevantes.
- **Critérios de aceitação:** utilizados para detalhar as condições que cada requisito deve atender para ser considerado válido e pronto para desenvolvimento.

Para manter consistência entre ER e desenvolvimento, o projeto utiliza **DoR/DoD** como critérios de prontidão e conclusão dos requisitos, conectando cada história aos objetivos (OE) e às características do produto (CP). As checklists estão em [DoR e DoD](../dor-e-dod/).

### Representação de Requisitos

- **Protótipos:** utilizados para representar visualmente as principais funcionalidades do sistema antes da implementação.
- **Wireframes:** utilizados para estruturar as telas e os fluxos de navegação do EcoQuest.
- **Diagramas UML:** utilizados para complementar a representação dos requisitos e facilitar a comunicação entre os membros da equipe.

## Verificação e Validação de Requisitos

A Verificação e Validação de Requisitos do EcoQuest foi organizada em quatro repartições conceituais: verificação do requisito declarado, validação do requisito com stakeholders, verificação da implementação e organização e atualização dos requisitos. Essa separação evita confundir técnicas de Engenharia de Requisitos com técnicas de gestão do trabalho ou com testes realizados depois da implementação.

## 1. Verificação de Requisito Declarado

Esta parte verifica se os requisitos e artefatos documentados estão claros, completos, consistentes, rastreáveis e verificáveis antes da implementação. As técnicas usadas nesta etapa são checklist, revisão e inspeção dos requisitos declarados.

### Checklist de Verificação de Requisito Declarado

1. O requisito está escrito de forma clara, sem ambiguidade ou termos genéricos demais?  
Cumpriu: Parcialmente.  
Justificativa curta: Os requisitos funcionais RF01 a RF17 estão nomeados e descritos, mas alguns ainda usam descrições amplas e pouco detalhadas.

2. O requisito está completo o suficiente para ser compreendido pela equipe?  
Cumpriu: Parcialmente.  
Justificativa curta: RF01 a RF08 possuem casos de uso mais completos, mas RF09 a RF17 aparecem apenas de forma resumida.

3. O requisito está consistente com os demais requisitos já documentados?  
Cumpriu: Parcialmente.  
Justificativa curta: Há alinhamento geral com o tema do EcoQuest, mas existem diferenças entre partes da documentação sobre missões, recompensas, descarte e validação.

4. O requisito está alinhado aos objetivos específicos do projeto?  
Cumpriu: Sim.  
Justificativa curta: Os requisitos funcionais estão associados a objetivos como engajamento, descarte responsável, validação de descarte e comprovação de impacto.

5. O requisito está associado a uma característica do produto?  
Cumpriu: Parcialmente.  
Justificativa curta: A documentação relaciona requisitos a características do produto, mas essa ligação ainda não aparece de forma completa em todos os artefatos.

6. O requisito possui critério de aceitação claro e verificável?  
Cumpriu: Parcialmente.  
Justificativa curta: Os casos de uso UC01 a UC08 possuem critérios de aceitação, mas nem todos estão no formato Dado/Quando/Então e RF09 a RF17 não estão detalhados.

7. O requisito possui prioridade definida ou justificativa para sua inclusão no backlog?  
Cumpriu: Sim.  
Justificativa curta: O backlog apresenta priorização MoSCoW, valor de negócio, complexidade e matriz de esforço.

8. O requisito possui origem identificável, como entrevista, reunião, análise de domínio, feedback ou decisão da equipe?  
Cumpriu: Parcialmente.  
Justificativa curta: A documentação cita entrevistas, análise de domínio, reuniões e atas, mas a origem não está ligada individualmente a cada requisito.

9. O requisito contribui para o descarte responsável de resíduos eletroeletrônicos, engajamento, validação do descarte, recompensas ou acompanhamento de impacto?  
Cumpriu: Sim.  
Justificativa curta: O conjunto de requisitos trata de PEVs, descarte, token, recompensas, ranking e painel de impacto.

10. A especificação deixa explícito o que o sistema deve fazer e quais restrições de operação/desenvolvimento devem ser respeitadas?  
Cumpriu: Parcialmente.  
Justificativa curta: As funcionalidades estão descritas, mas as restrições operacionais e técnicas ainda precisam ser detalhadas em requisitos não funcionais verificáveis.

11. Os requisitos não funcionais principais, como usabilidade, segurança, disponibilidade, tempo de resposta e capacidade, foram definidos de forma verificável?  
Cumpriu: Sim.  
Justificativa curta: A seção de requisitos não funcionais define responsividade, desempenho, segurança, acessibilidade, disponibilidade, integridade antifraude e manutenibilidade com critérios verificáveis.

12. Foram considerados requisitos de acessibilidade, privacidade e proteção de dados dos usuários?  
Cumpriu: Parcialmente.  
Justificativa curta: A documentação menciona LGPD, anonimato e privacidade, mas acessibilidade e proteção de dados ainda não foram especificadas de forma verificável.

13. A rastreabilidade entre objetivos, características, requisitos, critérios de aceitação, testes e entregas está registrada de forma consistente?  
Cumpriu: Parcialmente.  
Justificativa curta: Existe ligação entre OE, CP e requisitos, mas a rastreabilidade ainda não chega de forma consistente a testes e entregas.

14. O Product Backlog contém funcionalidades desejadas do produto e é atualizado conforme o grupo aprende mais sobre o produto e seus usuários?  
Cumpriu: Parcialmente.  
Justificativa curta: O backlog existe e prevê refinamento semanal, mas há itens ainda incompletos e sem detalhamento suficiente.

15. Cada história de usuário está relacionada a uma funcionalidade do MVP, como descarte, pontuação, ranking, recompensa, PEV, ONG ou impacto ambiental?  
Cumpriu: Parcialmente.  
Justificativa curta: As funcionalidades do backlog estão relacionadas ao MVP, mas aparecem mais como requisitos e casos de uso do que como histórias de usuário formalizadas.

16. Os requisitos classificados como Must são realmente indispensáveis para que a solução seja considerada um sucesso?  
Cumpriu: Parcialmente.  
Justificativa curta: Alguns Must são essenciais, como cadastro, autenticação e validação de descarte, mas outros podem estar amplos demais para o MVP.

17. Existe um número adequado de requisitos Must, evitando que quase todos recebam essa classificação?  
Cumpriu: Parcialmente.  
Justificativa curta: Nem todos os requisitos são Must, mas a quantidade de itens obrigatórios ainda parece alta para o escopo e o prazo do MVP.

18. O cenário descreve uma narrativa concreta, com contexto suficiente para compreender a situação de uso do EcoQuest?  
Cumpriu: Parcialmente.  
Justificativa curta: O cenário atual descreve o problema e o contexto do descarte, mas não apresenta uma narrativa concreta completa de uso.

19. O cenário identifica claramente o ator principal e o objetivo principal da interação?  
Cumpriu: Parcialmente.  
Justificativa curta: Os casos de uso identificam o usuário como ator, mas o cenário geral não explicita uma interação principal completa.

20. O cenário inclui ambiente/contexto, atores, objetivos, planejamento, ações, eventos e avaliação?  
Cumpriu: Parcialmente.  
Justificativa curta: Há contexto, atores e objetivos, mas planejamento, eventos e avaliação aparecem de forma incompleta.

21. O conjunto de cenários contempla funções principais, variações de uso, exceções e situações raras que possam gerar problemas?  
Cumpriu: Parcialmente.  
Justificativa curta: UC01 a UC08 incluem fluxos alternativos, mas o conjunto completo de RF09 a RF17 ainda não possui variações, exceções e situações raras.

22. As personas representam grupos principais de usuários, sem excesso de personas irrelevantes ou genéricas?  
Cumpriu: Não.  
Justificativa curta: Não foram encontradas personas formalizadas; há apenas segmentação de público.

23. Foi definido se cada persona é primária, secundária, stakeholder ou antipersona, para orientar a priorização do design?  
Cumpriu: Não.  
Justificativa curta: Como as personas não foram formalizadas, também não houve classificação por tipo.

24. Os objetivos das personas foram diferenciados em pessoais, práticos e corporativos, evitando decisões baseadas apenas em tarefas momentâneas?  
Cumpriu: Não.  
Justificativa curta: A documentação não diferencia objetivos de personas nessas categorias.

25. O perfil de usuário identifica claramente os objetivos, características e necessidades do público atendido pelo EcoQuest?  
Cumpriu: Parcialmente.  
Justificativa curta: A segmentação identifica jovens adultos e idosos com letramento digital, mas ainda falta um perfil de usuário mais completo.

26. Os itens do Product Backlog foram especificados como histórias de usuário centradas no cliente?  
Cumpriu: Parcialmente.  
Justificativa curta: Os itens estão estruturados como requisitos funcionais e casos de uso, não como histórias de usuário centradas no cliente.

27. Cada história de usuário possui critérios de aceitação centrados no cliente e usados como base para decompor tarefas no Sprint Backlog?  
Cumpriu: Parcialmente.  
Justificativa curta: Existem critérios de aceitação para UC01 a UC08, mas eles ainda não cobrem todo o backlog nem demonstram decomposição completa para o Sprint Backlog.

## 2. Validação de Requisito com Stakeholder

Esta parte valida se os requisitos representam necessidades reais da cliente, dos usuários e dos demais stakeholders do EcoQuest. As técnicas usadas nesta etapa são feedback, protótipos, cenários, critérios de aceitação e aceite dos stakeholders.

### Checklist de Validação com Stakeholders

28. O stakeholder compreende o requisito da mesma forma que a equipe?  
Cumpriu: Parcialmente.  
Justificativa curta: A documentação prevê reuniões, feedback e validação, mas não registra a compreensão compartilhada requisito por requisito.

29. O requisito resolve uma dor ou necessidade real do contexto do EcoQuest?  
Cumpriu: Sim.  
Justificativa curta: Os requisitos respondem à dor de descarte inadequado, baixa participação, falta de feedback e dificuldade de localizar pontos de coleta.

30. O requisito está adequado ao público-alvo do projeto?  
Cumpriu: Parcialmente.  
Justificativa curta: A proposta considera jovens adultos e usuários com diferentes níveis de familiaridade digital, mas faltam personas e validação mais detalhada.

31. O fluxo proposto é compreensível para usuários com diferentes níveis de familiaridade tecnológica?  
Cumpriu: Parcialmente.  
Justificativa curta: Alguns fluxos são simples, como cadastro e login, mas ainda falta validação documentada com usuários de perfis diferentes.

32. O requisito contribui para o engajamento no descarte correto de resíduos eletroeletrônicos?  
Cumpriu: Sim.  
Justificativa curta: O produto propõe recompensas, ranking, impacto ambiental e localização de PEVs para incentivar o descarte correto.

33. O requisito faz sentido para a relação entre doadores, pontos de coleta, ONGs, parceiros e sistema?  
Cumpriu: Sim.  
Justificativa curta: A solução conecta doadores, PEVs, ONGs e parceiros por meio de validação de descarte, recompensas e dados de impacto.

34. O stakeholder concorda com a prioridade atribuída ao requisito?  
Cumpriu: Parcialmente.  
Justificativa curta: A documentação prevê validação e priorização com stakeholders, mas não apresenta evidência detalhada de concordância para cada prioridade.

35. Os critérios de aceitação representam condições adequadas para aceitar a funcionalidade?  
Cumpriu: Parcialmente.  
Justificativa curta: Os critérios existentes ajudam no aceite de UC01 a UC08, mas ainda faltam critérios para RF09 a RF17 e maior padronização.

36. O protótipo, cenário ou história de usuário ajudou o stakeholder a entender e validar o requisito?  
Cumpriu: Parcialmente.  
Justificativa curta: A documentação cita protótipos, wireframes e modelos, mas não evidencia claramente como cada um foi usado na validação.

37. O feedback recebido foi registrado e relacionado aos requisitos afetados?  
Cumpriu: Parcialmente.  
Justificativa curta: Existem atas e processo de change request, mas a ligação entre feedback e requisitos afetados ainda é incompleta.

38. A validação dos requisitos confirma se eles atendem às necessidades do cliente/stakeholder, e não apenas se estão escritos corretamente?  
Cumpriu: Parcialmente.  
Justificativa curta: O processo prevê validação com cliente e stakeholders, mas faltam registros de aceite e validação por requisito.

39. Foram usados protótipos, modelos ou representações para permitir feedback dos stakeholders antes da implementação?  
Cumpriu: Parcialmente.  
Justificativa curta: Há Rich Picture, Ishikawa, mapa de stakeholders e menção a protótipos, porém os protótipos e feedbacks associados não estão suficientemente documentados.

40. O requisito representa uma necessidade real de usuário ou stakeholder, servindo de base para design e avaliação do sistema?  
Cumpriu: Sim.  
Justificativa curta: O conjunto de requisitos deriva de necessidades de usuários, cliente institucional, ONGs, PEVs e parceiros envolvidos no descarte responsável.

## 3. Verificação da Implementação

Os testes funcionais e os testes de aceitação são usados posteriormente, após ou durante a construção do sistema, para verificar se a implementação atende aos requisitos especificados. Os testes funcionais verificam se as funcionalidades implementadas executam corretamente os comportamentos previstos, como cadastro, autenticação, leitura de token, consulta de PEVs, recompensas e ranking. Os testes de aceitação verificam se a entrega atende aos critérios definidos anteriormente e se pode ser aceita pela cliente ou pelos stakeholders. Essas práticas são importantes para a qualidade do produto, mas pertencem à verificação da implementação. Elas não substituem as técnicas principais de Engenharia de Requisitos, como checklist, revisão, inspeção, feedback, protótipos, cenários, critérios de aceitação e aceite dos requisitos.

## 4. Organização e Atualização dos Requisitos

Kanban, backlog e versionamento servem para organizar e acompanhar os requisitos, mas não para verificar ou validar requisitos. O Kanban organiza visualmente o fluxo dos requisitos e pode mostrar status, responsável, prioridade e andamento, mas não verifica clareza, completude ou consistência. O backlog organiza funcionalidades, histórias e critérios de aceitação, permitindo que a equipe acompanhe o escopo e refine os itens ao longo do projeto. O versionamento registra mudanças e mantém histórico das alterações realizadas na documentação. Para manter coerência entre os artefatos, a rastreabilidade deve ligar OE -> CP -> requisito -> critério de aceitação -> teste -> entrega.

## 5. Conclusão da Aplicação da Checklist

A aplicação da checklist mostra que o EcoQuest possui uma base consistente de problema, solução, objetivos, características do produto, requisitos funcionais, requisitos não funcionais, backlog e priorização. No entanto, ainda existem lacunas importantes a corrigir: RF09 a RF17 precisam ser detalhados com fluxos, exceções e critérios de aceitação; as personas ainda não foram formalizadas; a rastreabilidade precisa avançar até testes e entregas; os critérios de aceitação precisam ser padronizados e completados; a validação com stakeholders precisa ser documentada requisito por requisito; os requisitos Must devem ser revisados para evitar excesso ou amplitude no MVP; e o feedback dos stakeholders deve aparecer de forma mais evidente nas atas e nos artefatos afetados.

## 4.2 Engenharia de Requisitos e o OpenUP

A Engenharia de Requisitos (ER) do projeto foi estruturada em alinhamento com o processo **OpenUP**  e com a abordagem híbrida definida. Dessa forma, as atividades de ER são realizadas de forma iterativa e incremental, com maior foco exploratório nas fases iniciais e maior formalização e controle nas fases posteriores.

Considerando o contexto do projeto, uma plataforma gamificada voltada ao engajamento em práticas sustentáveis, as atividades de ER também priorizam a validação contínua com stakeholders e a mitigação de riscos, especialmente relacionados à validação de atividades e ao engajamento dos usuários.

A tabela a seguir apresenta o mapeamento entre as fases do OpenUP, as atividades de ER, práticas, técnicas e os resultados esperados.

| Fases do Processo | Atividades ER | Prática | Técnica | Resultado Esperado |
|------------------|--------------|--------|--------|-------------------|
| **Concepção** | Elicitação e Descoberta | Levantamento inicial de requisitos | Entrevistas com cliente, Brainstorming | Identificação do problema (baixo engajamento) e definição dos requisitos iniciais |
|  | Análise e Consenso | Alinhamento com stakeholders | Discussões em equipe, Priorização MoSCoW | Definição das funcionalidades essenciais para o MVP |
|  | Declaração de Requisitos | Formalização inicial | User Stories, Casos de Uso de alto nível | Registro inicial das funcionalidades (missões, pontuação, validação) |
|  | Organização e Atualização | Estruturação inicial | Criação do backlog | Backlog inicial priorizado e alinhado com os objetivos do projeto |
| **Elaboração** | Elicitação e Descoberta | Refinamento dos requisitos | Entrevistas detalhadas, Análise de domínio | Requisitos mais claros e alinhados ao contexto acadêmico e ambiental |
|  | Análise e Consenso | Avaliação de viabilidade | Análise de custo-benefício, Discussões técnicas | Definição do escopo viável (MVP) |
|  | Representação de Requisitos | Modelagem da solução | Protótipos, Wireframes, Diagramas UML | Visualização das funcionalidades (quests, ranking, progresso) |
|  | Declaração de Requisitos | Detalhamento | Critérios de aceitação, Especificação de requisitos | Requisitos prontos para desenvolvimento |
| **Construção** | Representação de Requisitos | Apoio à implementação | Protótipos evolutivos | Melhor entendimento das funcionalidades pela equipe |
|  | Verificação da implementação | Conferência do incremento | Testes funcionais e testes de aceitação | Garantia de que a implementação atende aos requisitos especificados |
|  | Organização e Atualização | Controle de mudanças | Atualização do backlog, versionamento | Ajustes contínuos com base no feedback |
|  | Análise e Consenso | Ajustes incrementais | Reuniões de acompanhamento | Correção de problemas e melhoria do sistema |
| **Transição** | Validação com stakeholder | Aceite final | Feedback e aceite do cliente | Confirmação de que o sistema atende aos objetivos |
|  | Organização e Atualização | Ajustes finais | Correções baseadas em feedback | Sistema refinado e pronto para uso |
|  | Declaração de Requisitos | Consolidação | Documentação final | Requisitos formalizados e rastreáveis |
|  | Representação de Requisitos | Documentação final | Diagramas atualizados | Visão final consistente do sistema |
