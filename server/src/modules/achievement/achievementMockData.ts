import type { Conquista } from "./service";

export const ACHIEVEMENT_MOCK_DATA: Conquista[] = [
	{
		id: "mock-primeiro-descarte",
		nome: "Primeiro Descarte",
		criterio:
			"Realize seu primeiro descarte responsável em um Ponto de Entrega Voluntária.",
		progresso: 100,
		estado: "obtida",
		premios: [
			{
				nome: "Marco inicial",
				descricao:
					"Reconhecimento pela primeira contribuição registrada no EcoQuest.",
			},
			{
				nome: "Bônus simbólico",
				descricao:
					"Recompensa demonstrativa associada ao início da jornada sustentável.",
			},
		],
	},
	{
		id: "mock-guardiao-eletronicos",
		nome: "Guardião dos Eletrônicos",
		criterio:
			"Continue realizando descartes responsáveis de resíduos eletrônicos para avançar nesta conquista.",
		progresso: 60,
		estado: "bloqueada",
		premios: [
			{
				nome: "Insígnia de guardião",
				descricao:
					"Reconhecimento demonstrativo por manter uma sequência de descartes responsáveis.",
			},
			{
				nome: "Destaque sustentável",
				descricao:
					"Benefício demonstrativo para representar o avanço na jornada do EcoQuest.",
			},
			{
				nome: "Bônus de engajamento",
				descricao:
					"Recompensa demonstrativa vinculada à conclusão desta conquista.",
			},
		],
	},
];
