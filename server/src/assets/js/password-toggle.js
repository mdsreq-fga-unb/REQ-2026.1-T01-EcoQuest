/* ═══════════════════════════════════════════
   password-toggle.js — Alternar visibilidade de senha
   ═══════════════════════════════════════════ */

document.addEventListener('click', (e) => {
	const btn = e.target.closest('.toggle-senha');
	if (!btn) return;

	const targetId = btn.dataset.target;
	const input = document.getElementById(targetId);
	if (!input) return;

	const aberto = btn.querySelector('.icone-aberto');
	const fechado = btn.querySelector('.icone-fechado');
	const visivel = input.type === 'text';

	if (visivel) {
		input.type = 'password';
		if (aberto) aberto.style.display = 'none';
		if (fechado) fechado.style.display = '';
		btn.setAttribute('aria-label', 'Mostrar senha');
	} else {
		input.type = 'text';
		if (aberto) aberto.style.display = '';
		if (fechado) fechado.style.display = 'none';
		btn.setAttribute('aria-label', 'Ocultar senha');
	}
});
