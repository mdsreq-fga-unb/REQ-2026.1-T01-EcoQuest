---
name: "Novo Caso de Uso (UC)"
about: "Template padrão para especificação e desenvolvimento de um Caso de Uso seguindo o OpenUP e nosso fluxo Kanban."
title: "UCXX - [Nome do Caso de Uso no Infinitivo]"
labels: ''
assignees: ''
---

## 🎯 1. Definição do Caso de Uso

**Ator Principal:** [Quem interage primariamente com o sistema?]
**Objetivo de Negócio:** [O que o ator deseja alcançar com esta funcionalidade?]
**Índice de Prioridade (IP):** [Ex: 2.5]
**MoSCoW:** [Must / Should / Could / Won't]

### 1.1 Pré-condições
*   [Estado em que o sistema precisa estar para que este caso de uso inicie. Ex: O usuário deve estar autenticado e com saldo positivo.]

---

## 🛤️ 2. Fluxos de Execução

### Fluxo Principal (Happy Path)
1. O Ator faz...
2. O Sistema responde com...
3. ...

### Fluxos Alternativos e Exceções
*   **2.A [Nome da Exceção - Ex: Token Expirado]**: Se no passo X acontecer Y, o sistema deve...
*   **2.B [Nome da Exceção]**: ...

---

## 📏 3. Regras de Negócio e RNFs Atrelados
*   [ ] **Rastreabilidade (OE/CP):** [Inserir link ou ID da Característica de Produto originária]
*   [ ] **Desempenho/Segurança:** [Ex: O carregamento não pode demorar mais que 2 segundos]

---

## 🚦 4. Definition of Ready (DoR) - Filtro Upstream
*Para que este UC seja movido para "Ready for Dev", TODOS os itens abaixo devem estar marcados no refinamento.*

**Dimensão de Clareza**
- [ ] Ator, objetivo de negócio e critérios de aceite descritos e inequivocamente compreendidos por todos.
- [ ] IP calculado e classificação MoSCoW registrada no template.

**Dimensão de Viabilidade**
- [ ] Matriz de dependências técnicas resolvida (nenhuma API ou banco de dados externo bloqueando).
- [ ] Impedimentos de infraestrutura (acessos, ambientes) resolvidos.

**Dimensão de Estimabilidade**
- [ ] Os fluxos e regras possuem profundidade suficiente para estimar o esforço e a complexidade.
- [ ] O UC passou no crivo INVEST (especialmente "Small" - não é grande demais para a iteração).
- [ ] Tempo total estimado com a dupla técnica. **Esforço Final (ES):** [Inserir Pontuação]

**Dimensão de Escopo**
- [ ] O escopo cabe em uma única iteração/sprint de trabalho.
- [ ] Equipe validou o Entendimento Compartilhado (Nenhum membro tem dúvidas técnicas sobre como implementar e testar).

---

## 🚀 5. Definition of Done (DoD) - Filtro Downstream
*Os responsáveis devem preencher o Nível 1 antes de solicitar o Merge/Review. O Nível 2 será preenchido pelo PO/Coach.*

### DoD Nível 1: Done Técnico (Pronto para Homologação)
**Completude Funcional**
- [ ] Fluxo principal, alternativos e de exceção foram 100% implementados no código.
- [ ] Cenários de falha possuem tratamento de erro com feedback amigável (sem quebras bruscas).

**Qualidade Técnica (RNFs) e Validação**
- [ ] Parâmetros mensuráveis dos RNFs atrelados a este UC foram testados.
- [ ] Pipeline de CI/CD aprovado sem alertas críticos do linter.
- [ ] Testes unitários escritos (estrutura AAA e Mocks adequados).
- [ ] Cobertura de testes unitários atingiu o mínimo de **70%**.
- [ ] Code Review aprovado por um par.

**Integração e Documentação**
- [ ] Documentação técnica (arquitetura, diagramas UML, dicionário de dados) atualizada no GitHub Pages do projeto.
- [ ] Rastreabilidade atualizada na ferramenta.
- [ ] Código integrado na branch principal sem conflitos e pipeline de build validado.
- [ ] Deploy executado com sucesso no ambiente de Homologação/Staging.

### DoD Nível 2: Done de Negócio (Finalizado)
- [ ] UC validado pela cliente no ambiente de Homologação (Síncrono para núcleos principais, Assíncrono para secundários).
- [ ] A métrica correspondente a esta entrega alimentou o KR (Key Result) do ciclo de OKRs atual.