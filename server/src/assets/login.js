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