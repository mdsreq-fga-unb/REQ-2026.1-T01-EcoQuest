# 11. Lições Aprendidas

## Unidade 1 


**No âmbito do Processo:** A equipe aprendeu que a ambição inicial do projeto pode ser o maior risco para o prazo. A ideia original de validar ações sustentáveis por fotos/vídeos provou-se inviável para 12 semanas.
**Ação de Melhoria:** Manter a prática de fatiar o escopo e aplicar a técnica de priorização (MoSCoW) de forma rigorosa em todas as próximas iterações, garantindo que a equipe foque apenas no núcleo do MVP.

**No âmbito da Colaboração com o Cliente:** Compreendemos que depender exclusivamente de reuniões síncronas gera gargalos e desgasta a agenda da cliente.
**Ação de Melhoria:** Consolidar o Acordo de Nível de Serviço de feedback assíncrono estabelecido.

**No âmbito Pessoal (Equipe):** Houve um aprendizado profundo sobre a diferença entre escrever documentos para cumprir tabela acadêmica versus escrever documentação que guie a construção real de um produto.
**Ação de Melhoria:** A equipe adotou uma postura de papéis bem definidos, evitando que todos façam a mesma coisa ao mesmo tempo, otimizando assim o esforço.

**Dificuldades Enfrentadas e Resoluções:**

**Dificuldade 1:** Sobrecarga e Cadência de Trabalho. No início, a equipe sentiu dificuldade em sincronizar as demandas da disciplina com a necessidade de validação do produto com os stakeholders. Aumentando o risco de retrabalho.
**Como foi superada:** A dificuldade foi superada pela reestruturação do ciclo de vida da equipe. Adotou-se o framework OpenUP com um fluxo semanal fixo: reunião de planejamento nas segundas-feiras às 20h para processar ajustes e redistribuir demandas, garantindo que todos os 5 membros estejam alinhados antes de iniciar a semana.

## Unidade 2

**No âmbito do Processo:** A equipe aprendeu que definir critérios sem embasamento teórico explícito gera critérios vagos e inverificáveis. A primeira versão do DoR/Priorização misturava instrumentos de naturezas distintas, a falta de definição do que significava cada coisa dentro da contexto da priorização, tornando a cerimônia ambígua na prática.
**Ação de Melhoria:** Adotar o princípio de atomização de critérios: cada pergunta deve verificar exatamente um artefato ou condição, com resposta inequívoca de sim ou não, antes de ser incorporada ao processo.

**No âmbito da Rastreabilidade:** A equipe identificou que a cadeia `OE → CP → UC → Lista de Itens de Trabalho → AC` só funciona como mecanismo de rastreabilidade se todos os artefatos intermediários existirem e estiverem preenchidos. A ausência de parâmetros mensuráveis nos RNFs, por exemplo, tornava o critério de Qualidade Técnica do DoD estruturalmente inverificável, independentemente de como estava redigido.
**Ação de Melhoria:** Tratar a Especificação Suplementar com parâmetros mensuráveis como pré-requisito documental mandatório antes de qualquer iteração que envolva funcionalidades com RNFs associados.

**No âmbito da Decisão Documental:** A equipe iniciou a Unidade 2 verificando principalmente as lacunas de rastreabilidade, completude e definição dentro das documentações prévias se baseando nas issues e nas falhas ou inconsistências apontadas pela cliente.
**Ação de Melhoria:** Registrar formalmente as decisões de processo no histórico de versão dos documentos afetados, incluindo a justificativa, para que revisões futuras possam ser rastreadas e a coerência do processo seja auditável.

**No âmbito da Colaboração com o Cliente:** A equipe passou por uma mudança grande de escopo devido a um problema de comunicação e falta de entendimento, além de dificuldade de contato devido ao volume elevado de demandas da cliente.
**Ação de Melhoria:** Procuramos entender melhor qual a idéia da cliente por trás da aplicação e focar em um MVP validado pela mesma, além disso buscamos formas de melhorar a frequência de contato nos adptando as necessidades da cliente visando facilitar a construção conjunta e o entendimento compartilhado.

**Dificuldades Enfrentadas e Resoluções:**

**Dificuldade 2:** Redundância Estrutural entre Critérios. Ao longo das revisões iterativas, a equipe percebeu que vários critérios verificavam o mesmo artefato por caminhos diferentes. Redundância em critérios não adiciona segurança; adiciona ruído à cerimônia e aumenta o risco de verificação superficial.
**Como foi superada:** Através de avaliações iterativas guiadas pela pergunta "esses dois critérios podem estar em estados diferentes no nosso processo?", a equipe fundiu critérios redundantes e separou critérios que pareciam redundantes mas verificavam condições genuinamente distintas.

## Unidade 3

**No âmbito da Verificação e Validação (V&V):** A equipe constatou que a execução rigorosa e sistemática das atividades de V&V elevou diretamente a qualidade técnica das entregas, reduzindo drasticamente o risco de retrabalho e refinando o valor real do produto final.
**Ação de Melhoria:** Incorporar as rotinas de V&V como etapa obrigatória e contínua no fluxo de trabalho de cada iteração, garantindo que nenhum artefato ou código mude de estado sem passar por uma validação formal.

**No âmbito da Gestão de Tempo e Produtividade:** A pressão exercida por demandas e atividades concorrentes ao desenvolvimento do projeto forçou a equipe a amadurecer na gestão do tempo, exigindo uma postura muito mais cirúrgica e realista em relação à priorização de tarefas.
**Ação de Melhoria:**  Utilizar estimativas de esforço mais conservadoras e aplicar técnicas de time-boxing para blindar as janelas de desenvolvimento, mitigando o impacto de gargalos externos na cadência da equipe.

**No âmbito da Transparência e Cultura de Evidências:** Compreendemos que a geração de evidências sólidas não é um mero cumprimento de tabela; elas servem como um guia visual e técnico para o próprio desenvolvimento da equipe, além de tornarem o progresso do projeto totalmente inteligível e autoexplicativo para stakeholders externos que não participam do dia a dia.
**Ação de Melhoria:** Padronizar e centralizar o registro de evidências e validações no repositório do projeto, assegurando que o histórico de evolução seja facilmente auditável por qualquer pessoa.

**No âmbito do Benchmarking e Escopo:** A análise e a observação do progresso do trabalho desenvolvido pela outra equipe serviram como um valioso espelho crítico. Essa perspectiva externa nos impulsionou a repensar a nossa própria matriz de priorização e a realizar uma revisão necessária e mais realista no MVP.
**Ação de Melhoria:** Estabelecer momentos formais de avaliação cruzada e troca de experiências com equipes paralelas ao longo do ciclo de vida, utilizando esse feedback indireto para calibrar continuamente a linha de corte do nosso escopo.


## Histórico de Versão

| Data | Versão | Descrição da Alteração | Autor(a) |
|-------|-------|------|------|
| 12/04/2026 | 0.1 | Criação do documento referente a Unidade 1. | Paulo Vitor | 
| 15/05/2026 | 0.2 | Adição de documento referente a Unidade 2. | Paulo Vitor |
| 15/06/2026 | 0.3 | Adição de documento referente a Unidade 3. | Paulo Vitor |
