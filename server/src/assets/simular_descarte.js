(() => {
	function formatarPeso(pesoKg) {
		if (pesoKg >= 1) return `${pesoKg.toFixed(2).replace(".", ",")} kg`;
		return `${Math.round(pesoKg * 1000)} g`;
	}

	function categoriaDoCard(card) {
		return card.closest(".simular-categoria")?.dataset?.categoria ?? null;
	}

	function categoriaAtiva() {
		const cards = document.querySelectorAll(".simular-item[data-item]");
		for (const card of cards) {
			const input = card.querySelector('[data-role="input-qty"]');
			const qtd = Number.parseInt(input?.value ?? "0", 10) || 0;
			if (qtd > 0) return categoriaDoCard(card);
		}
		return null;
	}

	function atualizarBloqueio() {
		const ativa = categoriaAtiva();
		const secoes = document.querySelectorAll(".simular-categoria[data-categoria]");

		for (const secao of secoes) {
			const tipo = secao.dataset.categoria;
			const bloqueada = ativa !== null && tipo !== ativa;

			secao.classList.toggle("simular-categoria--bloqueada", bloqueada);

			const botoes = secao.querySelectorAll(".simular-item_btn");
			for (const btn of botoes) {
				btn.disabled = bloqueada;
			}
		}
	}

	function atualizarTotais() {
		const cards = document.querySelectorAll(".simular-item[data-item]");
		let totalItens = 0;
		let totalPesoKg = 0;

		cards.forEach((card) => {
			const input = card.querySelector('[data-role="input-qty"]');
			const qtd = Number.parseInt(input?.value ?? "0", 10) || 0;
			const pesoUnit = Number.parseFloat(card.dataset.pesoUnitario || "0") || 0;
			const pesoItem = qtd * pesoUnit;

			totalItens += qtd;
			totalPesoKg += pesoItem;

			const outputQtd = card.querySelector('[data-role="quantidade"]');
			const outputPeso = card.querySelector('[data-role="peso-item"]');

			if (outputQtd) outputQtd.textContent = String(qtd);
			if (outputPeso) outputPeso.textContent = formatarPeso(pesoItem);
		});

		const elTotalItens = document.getElementById("simular-total-itens");
		const elTotalPeso = document.getElementById("simular-total-peso");
		if (elTotalItens) elTotalItens.textContent = String(totalItens);
		if (elTotalPeso) elTotalPeso.textContent = formatarPeso(totalPesoKg);

		atualizarBloqueio();
	}

	function alterarQuantidade(card, delta) {
		const input = card.querySelector('[data-role="input-qty"]');
		if (!input) return;
		const atual = Number.parseInt(input.value || "0", 10) || 0;
		const proximo = Math.max(0, Math.min(999, atual + delta));
		input.value = String(proximo);
		atualizarTotais();
	}

	document.addEventListener("click", (ev) => {
		const button = ev.target.closest(".simular-item_btn");
		if (!button) return;
		const card = button.closest(".simular-item");
		if (!card) return;

		const action = button.dataset.action;
		if (action === "aumentar") alterarQuantidade(card, 1);
		if (action === "diminuir") alterarQuantidade(card, -1);
	});

	document.addEventListener("htmx:afterSwap", (ev) => {
		if (ev.target && ev.target.id === "simulacao-resultado") {
			atualizarTotais();
		}
	});

	document.addEventListener("DOMContentLoaded", atualizarTotais);
})();