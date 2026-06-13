import { Html } from '@elysia/html'
import { Layout } from '../../components/Layout';


export function LoginView() {
  return (
    <Layout title="Login">
      <h1>Login</h1>
      <form>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label for="senha">Senha:</label>
          <input type="password" id="senha" name="senha" required />
          <br />
          <button type="submit">Entrar</button>
        </form>
    </Layout>
  );
}