(function () {
  'use strict';

  var btnMenu    = document.getElementById('btn-menu-mobile');
  var btnFechar  = document.getElementById('btn-fechar-menu');
  var menu     = document.getElementById('menu-mobile');
  var overlay    = document.getElementById('menu-overlay');

  if (!btnMenu || !menu || !overlay) return;

  function abrirmenu() {
    menu.classList.add('aberto');
    overlay.classList.add('aberto');
    menu.setAttribute('aria-hidden', 'false');
    btnMenu.setAttribute('aria-expanded', 'true');
    var primeiroLink = menu.querySelector('a, button');
    if (primeiroLink) primeiroLink.focus();
  }

  function fecharMenu() {
    menu.classList.remove('aberto');
    overlay.classList.remove('aberto');
    menu.setAttribute('aria-hidden', 'true');
    btnMenu.setAttribute('aria-expanded', 'false');
    btnMenu.focus();
  }

  btnMenu.addEventListener('click', abrirMenu);

  if (btnFechar) {
    btnFechar.addEventListener('click', fecharMenu);
  }

  overlay.addEventListener('click', fecharMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) {
      fecharMenu();
    }
  });
})();