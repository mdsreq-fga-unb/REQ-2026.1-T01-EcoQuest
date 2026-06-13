document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const mensagem = document.getElementById('mensagem');
  const cpfLista = document.getElementById('cpf-requisitos');
  const cpfStatus = document.getElementById('cpf-status');

  const camposComLabel = {
    nome: 'Nome completo',
    cpf: 'CPF',
    telefone: 'Telefone',
    email: 'Email',
    senha: 'Senha',
    confirmarSenha: 'Confirme a senha',
  };

  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);

    if (value.length > 9) {
      value = value.replace( /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4' );
    } else if (value.length > 6) {
      value = value.replace( /^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3' );
    } else if (value.length > 3) {
      value = value.replace( /^(\d{3})(\d{1,3})$/, '$1.$2' );
    }

    e.target.value = value;

    atualizarStatusCPF();
  });

  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);

    if (value.length > 10) {
      value = value.replace( /^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3' );
    } else if (value.length > 6) {
      value = value.replace( /^(\d{2})(\d{4})(\d{1,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace( /^(\d{2})(\d{1,4})$/, '($1) $2' );
    } else if (value.length > 0) {
      value = value.replace( /^(\d{1,2})$/, '($1' );
    }

    e.target.value = value;
    e.target.classList.remove('input-error');
  });

  ['nome', 'email', 'senha', 'confirmarSenha'].forEach((id) => {
    document.getElementById(id).addEventListener('input', (e) => {
      e.target.classList.remove('input-error');
    });
  });

  document.querySelectorAll('.toggle-senha').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);

      const aberto = btn.querySelector('.icone-aberto');
      const fechado = btn.querySelector('.icone-fechado');

      const visivel = input.type === 'text';

      if (visivel) {
        input.type = 'password';
        aberto.style.display = 'none';
        fechado.style.display = '';
        btn.setAttribute('aria-label', 'Mostrar senha');
      } else {
        input.type = 'text';
        aberto.style.display = '';
        fechado.style.display = 'none';
        btn.setAttribute('aria-label', 'Ocultar senha');
      }
    });
  });

  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmarSenha');

  const listaRequisitos = document.getElementById('senha-requisitos');
  const requisitos = document.querySelectorAll('#senha-requisitos li');

  const confirmacaoSenhaStatus = document.getElementById(
    'confirmacao-senha-status'
  );

  function atualizarConfirmacaoSenha() {
    const confirmacao = confirmarSenhaInput.value;

    if (!confirmacao) {
      confirmacaoSenhaStatus.hidden = true;
      confirmarSenhaInput.removeAttribute('aria-invalid');
      return;
    }

    const senhasCoincidem = senhaInput.value === confirmacao;

    const icone =
      confirmacaoSenhaStatus.querySelector('.icone');

    const texto =
      confirmacaoSenhaStatus.querySelector('.texto');

    confirmacaoSenhaStatus.hidden = false;

    confirmacaoSenhaStatus.classList.remove(
      'cumprido',
      'pendente'
    );

    confirmacaoSenhaStatus.classList.add(
      senhasCoincidem ? 'cumprido' : 'pendente'
    );

    icone.textContent = senhasCoincidem ? '✓' : '✗';

    texto.textContent = senhasCoincidem
      ? 'As senhas coincidem'
      : 'As senhas não coincidem';

    confirmarSenhaInput.setAttribute(
      'aria-invalid',
      String(!senhasCoincidem)
    );
  }

  senhaInput.addEventListener('input', () => {
    const valor = senhaInput.value;

    listaRequisitos.hidden = !valor;

    const regras = {
      tamanho: valor.length >= 8,
      maiuscula: /[A-Z]/.test(valor),
      minuscula: /[a-z]/.test(valor),
      numero: /[0-9]/.test(valor),
      especial: /[^A-Za-z0-9]/.test(valor),
    };

    requisitos.forEach((li) => {
      const regra = li.dataset.regra;

      const icone = li.querySelector('.icone');

      const cumprido = regras[regra];

      li.classList.remove('cumprido', 'pendente');

      li.classList.add(
        cumprido ? 'cumprido' : 'pendente'
      );

      icone.textContent = cumprido ? '✓' : '✗';
    });

    atualizarConfirmacaoSenha();
  });

  confirmarSenhaInput.addEventListener(
    'input',
    atualizarConfirmacaoSenha
  );

  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function cpfValido(cpf) {
    const digits = cpf.replace(/\D/g, '');

    if (digits.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(digits)) return false;

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma +=
        parseInt(digits.charAt(i), 10) *
        (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (
      resto !== parseInt(digits.charAt(9), 10)
    ) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma +=
        parseInt(digits.charAt(i), 10) *
        (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (
      resto !== parseInt(digits.charAt(10), 10)
    ) {
      return false;
    }

    return true;
  }

  function atualizarStatusCPF() {
    const cpf = cpfInput.value;

    const numeros = cpf.replace(/\D/g, '');

    const icone =
      cpfStatus.querySelector('.icone');

    const texto =
      cpfStatus.querySelector('.texto');

    if (!numeros.length) {
      cpfLista.hidden = true;

      cpfStatus.classList.remove(
        'cumprido',
        'pendente'
      );

      cpfInput.classList.remove('input-error');

      cpfInput.removeAttribute('aria-invalid');

      return;
    }

    cpfLista.hidden = false;

    cpfStatus.classList.remove(
      'cumprido',
      'pendente'
    );

    if (numeros.length < 11) {
      cpfStatus.classList.add('pendente');

      icone.textContent = '✗';

      texto.textContent =
        'Digite os 11 números do CPF';

      cpfInput.classList.remove('input-error');

      cpfInput.removeAttribute('aria-invalid');

      return;
    }

    const valido = cpfValido(cpf);

    cpfStatus.classList.add(
      valido ? 'cumprido' : 'pendente'
    );

    icone.textContent =
      valido ? '✓' : '✗';

    texto.textContent =
      valido
        ? 'CPF válido'
        : 'CPF inválido';

    cpfInput.classList.toggle(
      'input-error',
      !valido
    );

    cpfInput.setAttribute(
      'aria-invalid',
      String(!valido)
    );

    if (valido) {
      verificarCpfNoServidor(cpf);
    }
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const verificarCpfNoServidor = debounce(async (cpfRaw) => {
    try {
      const resp = await fetch('/auth/check-cpf?cpf=' + encodeURIComponent(cpfRaw));
      const data = await resp.json();

      if (data.status === 'vazio') return;

      const icone = cpfStatus.querySelector('.icone');
      const texto = cpfStatus.querySelector('.texto');

      cpfLista.hidden = false;
      cpfStatus.classList.remove('cumprido', 'pendente');
      cpfStatus.classList.add(data.status);

      icone.textContent = data.status === 'cumprido' ? '✓' : '✗';
      texto.textContent = data.message;

      cpfInput.classList.toggle('input-error', data.status !== 'cumprido');
      cpfInput.setAttribute('aria-invalid', String(data.status !== 'cumprido'));
    } catch (err) {
      // Falha silenciosa: validação client-side já cobre o caso básico
    }
  }, 400);

  const emailInput = document.getElementById('email');
  const emailLista = document.getElementById('email-requisitos');
  const emailStatus = document.getElementById('email-status');

  const verificarEmailNoServidor = debounce(async (emailValor) => {
    try {
      const resp = await fetch('/auth/check-email?email=' + encodeURIComponent(emailValor));
      const data = await resp.json();

      const icone = emailStatus.querySelector('.icone');
      const texto = emailStatus.querySelector('.texto');

      if (data.status === 'vazio') {
        emailLista.hidden = true;
        emailStatus.classList.remove('cumprido', 'pendente');
        emailInput.classList.remove('input-error');
        emailInput.removeAttribute('aria-invalid');
        return;
      }

      emailLista.hidden = false;
      emailStatus.classList.remove('cumprido', 'pendente');
      emailStatus.classList.add(data.status);

      icone.textContent = data.status === 'cumprido' ? '✓' : '✗';
      texto.textContent = data.message;

      emailInput.classList.toggle('input-error', data.status !== 'cumprido');
      emailInput.setAttribute('aria-invalid', String(data.status !== 'cumprido'));
    } catch (err) {
      // Falha silenciosa: validação client-side já cobre o caso básico
    }
  }, 400);

  emailInput.addEventListener('input', (e) => {
    verificarEmailNoServidor(e.target.value.trim());
  });

  function senhaForte(senha) {
    const temMaiuscula = /[A-Z]/.test(senha);

    const temMinuscula = /[a-z]/.test(senha);

    const temNumero = /[0-9]/.test(senha);

    const temCaractereEspecial = /[^A-Za-z0-9]/.test(senha);

    return (
      temMaiuscula &&
      temMinuscula &&
      temNumero &&
      temCaractereEspecial
    );
  }

  function exibirMensagem(texto, tipo) {
    mensagem.innerHTML = `
      <span class="${
        tipo === 'erro'
          ? 'erro'
          : 'sucesso'
      }">
        ${texto}
      </span>
    `;
  }

  function limparErros() {
    Object.keys(camposComLabel).forEach((id) => {
      document
        .getElementById(id)
        .classList.remove('input-error');
    });

    mensagem.innerHTML = '';
  }

  function validarFormulario() {
    limparErros();

    const nome =
      document.getElementById('nome')
        .value.trim();

    const cpf =
      document.getElementById('cpf')
        .value.trim();

    const telefone =
      document.getElementById('telefone')
        .value.trim();

    const email =
      document.getElementById('email')
        .value.trim();

    const senha =
      document.getElementById('senha')
        .value;

    const confirmarSenha =
      document.getElementById(
        'confirmarSenha'
      ).value;

    const erros = [];

    if (!nome) {
      erros.push('nome');
    }

    if (
      !cpf ||
      cpf.replace(/\D/g, '').length !== 11 ||
      !cpfValido(cpf)
    ) {
      erros.push('cpf');
    }

    if (
      !telefone ||
      telefone.replace(/\D/g, '').length !== 11
    ) {
      erros.push('telefone');
    }

    if (!email || !emailValido(email)) {
      erros.push('email');
    }

    if (
      !senha ||
      senha.length < 8 ||
      !senhaForte(senha)
    ) {
      erros.push('senha');
    }

    if (
      !confirmarSenha ||
      confirmarSenha !== senha
    ) {
      erros.push('confirmarSenha');
    }

    if (erros.length > 0) {
      erros.forEach((id) => {
        document
          .getElementById(id)
          .classList.add('input-error');
      });

      let textoErro =
        'Por favor, preencha corretamente os campos: ';

      textoErro += erros
        .map((id) => camposComLabel[id])
        .join(', ');

      if (
        erros.includes('confirmarSenha') &&
        senha &&
        confirmarSenha &&
        confirmarSenha !== senha
      ) {
        textoErro =
          'As senhas não coincidem. Verifique e tente novamente.';
      } else if (
        erros.includes('senha') &&
        senha &&
        senha.length < 8
      ) {
        textoErro =
          'A senha deve ter no mínimo 8 caracteres.';
      } else if (
        erros.includes('senha') &&
        senha &&
        senha.length >= 8 &&
        !senhaForte(senha)
      ) {
        textoErro =
          'A senha deve conter letra maiúscula, letra minúscula, número e caractere especial.';
      } else if (
        erros.includes('email') &&
        email &&
        !emailValido(email)
      ) {
        textoErro =
          'Informe um email válido.';
      } else if (
        erros.includes('cpf') &&
        cpf &&
        cpf.replace(/\D/g, '').length === 11 &&
        !cpfValido(cpf)
      ) {
        textoErro =
          'CPF inválido. Verifique os números digitados.';
      }

      exibirMensagem(textoErro, 'erro');

      return false;
    }

    return true;
  }

  form.addEventListener('submit', (e) => {
    if (!validarFormulario()) {
      e.preventDefault();
    }
  });

  form.addEventListener(
    'htmx:beforeRequest',
    (e) => {
      if (!validarFormulario()) {
        e.preventDefault();
      }
    }
  );
});