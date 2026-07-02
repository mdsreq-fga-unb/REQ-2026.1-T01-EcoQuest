(function () {
	function rolar(id, direcao) {
		var trilha = document.getElementById(id);
		if (!trilha) return;
		var card = trilha.querySelector('.catalogo-card');
		var passo = card ? card.getBoundingClientRect().width + 14 : trilha.clientWidth * 0.8;
		trilha.scrollBy({ left: passo * direcao, behavior: 'smooth' });
	}

	function avaliarCarrossel(trilha) {
		var secao = trilha.closest('.catalogo-categoria');
		if (!secao) return;

		var cards = trilha.querySelectorAll('.catalogo-card');
		if (!cards.length) return;

		var gap = parseFloat(getComputedStyle(trilha).gap) || 0;
		var larguraNecessaria = 0;
		cards.forEach(function (card, i) {
			larguraNecessaria += card.getBoundingClientRect().width;
			if (i > 0) larguraNecessaria += gap;
		});

		var precisaCarrossel = larguraNecessaria > trilha.clientWidth + 1;

		trilha.classList.toggle('is-carrossel', precisaCarrossel);
		secao.classList.toggle('tem-carrossel', precisaCarrossel);
	}

	function avaliarTodos() {
		document.querySelectorAll('.catalogo-trilha').forEach(function (trilha) {
			trilha.classList.remove('is-carrossel');
			avaliarCarrossel(trilha);
		});
	}

	avaliarTodos();

	var debounce;
	window.addEventListener('resize', function () {
		clearTimeout(debounce);
		debounce = setTimeout(avaliarTodos, 150);
	});

	document.querySelectorAll('[data-carrossel-prev]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			rolar(btn.getAttribute('data-carrossel-prev'), -1);
		});
	});

	document.querySelectorAll('[data-carrossel-next]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			rolar(btn.getAttribute('data-carrossel-next'), 1);
		});
	});
})();