import { Html } from '@elysia/html'
import { Layout } from '../../components/Layout-auth';

export function LoginView() {
  return (
    <Layout title="Login - EcoQuest">
      <link rel="stylesheet" href="../assets/login.css" />

      <main class="container">
        <section class="login-content" aria-labelledby="login-title">
          <img
            src="../assets/img/logo-ecoquest.png"
            alt="EcoQuest"
            class="login-logo"
          />

          <h1 id="login-title" class="sr-only">
            Entrar no EcoQuest
          </h1>

          <div class="card">
            <form
              id="form-login"
              hx-post="/auth/login"
              hx-target="#mensagem-login"
              hx-swap="innerHTML"
            >
              <div class="field">
                <label for="email">Email</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seuemail@exemplo.com"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="field">
                <label for="senha">Senha</label>

                <div class="input-senha-wrapper">
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    autocomplete="current-password"
                    required
                  />

                  <button type="button" class="toggle-senha" data-target="senha" aria-label="Mostrar senha">

                    <svg class="icone-olho icone-fechado" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                      <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <svg class="icone-olho icone-aberto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </button>

                </div>
              </div>

              <p class="login-link">
                Não possui uma conta?{" "}
                <a href="/auth/cadastro">
                  Crie aqui
                </a>
              </p>

              <div
                id="mensagem-login"
                class="mensagem"
                aria-live="polite"
              ></div>

              <div class="button-wrapper">
                <button
                  type="submit"
                  class="btn-submit"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <script src="/assets/login.js"></script>
    </Layout>
  );
}