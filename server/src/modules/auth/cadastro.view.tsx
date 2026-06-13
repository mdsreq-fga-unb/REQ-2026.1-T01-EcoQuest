import { Html } from '@elysia/html'
import { Layout } from '../../components/Layout'

export function CadastroView() {
  return (
    <Layout title="Cadastro - EcoQuest">
      <link rel="stylesheet" href="/assets/cadastro.css" />

      <header class="header">
        <img src="../assets/img/logo.png" alt="EcoQuest" class="logo" />
      </header>

      <main class="container">
        <h1 class="title">Criar conta</h1>

        <div class="card">
          <form
            id="form-cadastro"
            hx-post="/auth/cadastro"
            hx-target="#mensagem"
            hx-swap="innerHTML"
          >
            <div class="form-grid">
              <div class="field">
                <label for="nome">Nome completo</label>
                <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" />
              </div>

              <div class="field">
                <label for="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" inputmode="numeric" maxlength="14" />
              </div>

              <div class="field">
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone" placeholder="(00) 00000-0000" inputmode="numeric" maxlength="15" />
              </div>

              <div class="field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" />
              </div>

              <div class="field">
                <label for="senha">Senha</label>
                <div class="input-senha-wrapper">
                  <input type="password" id="senha" name="senha" placeholder="Mínimo 8 caracteres" />
                  <button type="button" class="toggle-senha" data-target="senha" aria-label="Mostrar senha">
                    <svg class="icone-olho icone-fechado" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <svg class="icone-olho icone-aberto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>
                </div>
                <ul class="senha-requisitos" id="senha-requisitos" hidden>
                  <li data-regra="tamanho"><span class="icone">✗</span> Mínimo de 8 caracteres</li>
                  <li data-regra="maiuscula"><span class="icone">✗</span> Letra maiúscula</li>
                  <li data-regra="minuscula"><span class="icone">✗</span> Letra minúscula</li>
                  <li data-regra="numero"><span class="icone">✗</span> Número</li>
                  <li data-regra="especial"><span class="icone">✗</span> Caractere especial</li>
                </ul>
              </div>

              <div class="field">
                <label for="confirmarSenha">Confirme a senha</label>
                <div class="input-senha-wrapper">
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Repita a senha"
                    aria-describedby="confirmacao-senha-status"
                  />
                  <button type="button" class="toggle-senha" data-target="confirmarSenha" aria-label="Mostrar senha">
                    <svg class="icone-olho icone-fechado" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <svg class="icone-olho icone-aberto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>
                </div>
                <ul class="senha-requisitos confirmacao-senha" aria-live="polite">
                  <li id="confirmacao-senha-status" hidden>
                    <span class="icone" aria-hidden="true">✗</span>
                    <span class="texto">As senhas não coincidem</span>
                  </li>
                </ul>
              </div>
            </div>

            <p class="cadastro-link">
              Já possui uma conta? <a href="/auth/login">Entre aqui</a>
            </p>

            <div id="mensagem" class="mensagem"></div>

            <div class="button-wrapper">
              <button type="submit" class="btn-submit">Criar conta</button>
            </div>
          </form>
        </div>
      </main>

      <script src="/assets/cadastro.js"></script>
    </Layout>
  )
}
