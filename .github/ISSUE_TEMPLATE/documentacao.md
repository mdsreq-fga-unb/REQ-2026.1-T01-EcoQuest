---
name: "Criação ou Atualização Documental"
about: "Template padrão para a criação de novos artefatos de processo, diagramas ou atualização da documentação técnica e de negócio."
title: "DOC - [Nome do Artefato ou Seção a ser documentada]"
labels: ''
assignees: ''
---

## 📑 1. Contexto e Objetivo Documental

**Qual é o objetivo desta documentação?**
[Ex: Refletir a nova arquitetura de banco de dados, criar o manual de usuário para o PEV, documentar a ata de reunião com a cliente.]

**Público-Alvo:** [Ex: Equipe de Desenvolvimento, Professor/Avaliador, Cliente final]

**Tipo de Alteração:**
- [ ] Criação de um Documento Inédito
- [ ] Atualização de um Documento Existente
- [ ] Correção/Refatoração (Erros de gramática, links quebrados)

---

## 🔗 2. Rastreabilidade e Impacto
*Preencha caso esta documentação seja resultado da entrega de código.*

* **Issue/Caso de Uso Gerador:** [Ex: Relacionado à finalização da #UC06]
* **Artefatos Impactados:** [Ex: Diagrama de Entidade Relacionamento (DER), Glossário]

---

## 🚦 3. Definition of Ready (DoR) - Pronto para Escrever
*Filtro Upstream: O redator só deve iniciar o trabalho se os itens abaixo forem verdadeiros.*

**Dimensão de Insumos e Clareza**
- [ ] Todas as decisões técnicas, diagramas base ou reuniões que embasam este documento já foram concluídas ou realizadas.
- [ ] O local de destino desta documentação está claro para a equipe (ex: repositório central, GitHub Pages).
- [ ] Existe um template ou padrão visual pré-definido a ser seguido para este tipo de artefato.

**Dimensão de Escopo**
- [ ] O esforço para a redação/criação deste artefato foi estimado pela equipe e alocado na iteração atual.

---

## 🚀 4. Definition of Done (DoD) - Pronto para Publicar
*Filtro Downstream: O PR/Merge desta documentação só será aprovado se os critérios abaixo forem atendidos.*

**Dimensão de Qualidade e Formatação**
- [ ] O texto passou por revisão ortográfica e gramatical.
- [ ] A formatação Markdown (tabelas, negritos, cabeçalhos) está renderizando perfeitamente.
- [ ] Todos os links internos e externos mencionados no documento foram clicados e não estão quebrados.
- [ ] Se houver imagens ou diagramas, eles possuem boa resolução e legendas explicativas.

**Dimensão de Governança e Rastreabilidade**
- [ ] A tabela de **Histórico de Versão** no documento foi atualizada corretamente (Data, Versão, Descrição, Autor e Revisor).
- [ ] A documentação passou por *Review*  para garantir que o conteúdo reflete a verdade técnica/de negócio.

**Dimensão de Integração**
- [ ] O artefato foi integrado com sucesso na branch principal.
- [ ] A publicação no repositório de destino foi gerada sem erros de *build*.