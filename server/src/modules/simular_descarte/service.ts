import encodeQR from "@paulmillr/qr";
import { db } from "../../db";

const PEV_SIMULADO_NOME = "PEV Simulado UC08";
const TOKEN_TTL_MINUTOS = 10;

export interface ItemSimulacao {
	chave: string;
	nome: string;
	pesoUnitarioKg: number;
}

export interface CategoriaSimulacao {
	id: string;
	titulo: string;
	itens: ItemSimulacao[];
}

export interface ItemResumoGerado {
	chave: string;
	nome: string;
	quantidade: number;
	pesoUnitarioKg: number;
	pesoTotalKg: number;
}

export interface SimulacaoQrGerada {
	jti: string;
	qrSvg: string;
	expiresAt: Date;
	totalItens: number;
	totalPesoKg: number;
	itensSelecionados: ItemResumoGerado[];
}

export interface SimulacaoEmitida {
	jti: string;
	createdAt: Date;
	expiresAt: Date;
	totalItens: number;
	totalPesoKg: number;
	itensSelecionados: ItemResumoGerado[];
}

export class ErroSimulacaoDescarte extends Error {
	constructor(message: string, causa?: unknown) {
		super(message);
		this.name = "ErroSimulacaoDescarte";
		if (causa instanceof Error) this.cause = causa;
	}
}

export const CATEGORIAS_SIMULACAO: CategoriaSimulacao[] = [
	{
		id: "equipamentos-informatica",
		titulo: "Equipamentos de Informática",
		itens: [
			{ chave: "microcomputador", nome: "Microcomputador", pesoUnitarioKg: 7.8 },
			{ chave: "monitor_tubo", nome: "Monitor (Tubo)", pesoUnitarioKg: 10.5 },
			{ chave: "monitor_lcd", nome: "Monitor (LCD)", pesoUnitarioKg: 4.6 },
			{ chave: "monitor_led", nome: "Monitor (LED)", pesoUnitarioKg: 3.8 },
			{ chave: "monitor_plasma", nome: "Monitor (Plasma)", pesoUnitarioKg: 9.8 },
			{ chave: "notebook", nome: "Notebook", pesoUnitarioKg: 2.2 },
			{ chave: "servidor", nome: "Servidor", pesoUnitarioKg: 11.5 },
			{ chave: "teclado", nome: "Teclado", pesoUnitarioKg: 0.62 },
			{ chave: "mouse", nome: "Mouse", pesoUnitarioKg: 0.12 },
			{ chave: "modem", nome: "Modem", pesoUnitarioKg: 0.25 },
			{ chave: "roteador", nome: "Roteador", pesoUnitarioKg: 0.3 },
			{ chave: "impressora", nome: "Impressora", pesoUnitarioKg: 6.1 },
			{ chave: "estabilizador", nome: "Estabilizador", pesoUnitarioKg: 2.9 },
			{ chave: "tablet", nome: "Tablet", pesoUnitarioKg: 0.45 },
			{ chave: "no_break", nome: "No-break", pesoUnitarioKg: 8.7 },
		],
	},
	{
		id: "televisores",
		titulo: "Televisores",
		itens: [
			{ chave: "tv_tubo", nome: "Televisão de tubo de imagem", pesoUnitarioKg: 15 },
			{ chave: "tv_led", nome: "Televisão de LED", pesoUnitarioKg: 8 },
			{ chave: "tv_lcd", nome: "Televisão de LCD", pesoUnitarioKg: 7 },
			{ chave: "tv_plasma", nome: "Televisão de Plasma", pesoUnitarioKg: 12 },
		],
	},
	{
		id: "equipamentos-eletronicos",
		titulo: "Equipamentos eletrônicos",
		itens: [
			{ chave: "video_cassete", nome: "Vídeo cassete", pesoUnitarioKg: 3.5 },
			{ chave: "dvd_player", nome: "DVD player", pesoUnitarioKg: 1.5 },
			{ chave: "aparelho_som", nome: "Aparelho de som", pesoUnitarioKg: 4.5 },
			{ chave: "controle_remoto", nome: "Controle remoto", pesoUnitarioKg: 0.08 },
			{ chave: "forno_microondas", nome: "Forno microondas", pesoUnitarioKg: 12 },
			{ chave: "secador_cabelo", nome: "Secador de cabelo", pesoUnitarioKg: 0.6 },
			{ chave: "prancha_cabelo", nome: "Prancha de cabelo", pesoUnitarioKg: 0.3 },
		],
	},
	{
		id: "aparelhos-telefonicos",
		titulo: "Aparelhos telefônicos",
		itens: [
			{ chave: "aparelho_celular", nome: "Aparelho celular", pesoUnitarioKg: 0.2 },
			{ chave: "acessorios", nome: "Acessórios", pesoUnitarioKg: 0.05 },
			{ chave: "smartphone", nome: "Smartphone", pesoUnitarioKg: 0.19 },
			{ chave: "telefone_sem_fio", nome: "Aparelho telefônico sem fio", pesoUnitarioKg: 0.36 },
			{ chave: "telefone_com_fio", nome: "Aparelho telefônico com fio", pesoUnitarioKg: 0.7 },
			{ chave: "fax", nome: "Fax", pesoUnitarioKg: 6.2 },
			{ chave: "secretaria_eletronica", nome: "Secretária eletrônica", pesoUnitarioKg: 0.8 },
		],
	},
	{
		id: "residuos-eletronicos",
		titulo: "Resíduos eletrônicos",
		itens: [
			{ chave: "bateria_notebook", nome: "Baterias de notebooks", pesoUnitarioKg: 0.45 },
			{ chave: "bateria_no_break", nome: "Baterias de no-breaks", pesoUnitarioKg: 1.2 },
			{ chave: "chapa_raio_x", nome: "Chapas de raio X", pesoUnitarioKg: 0.15 },
			{ chave: "cabos_forca", nome: "Cabos de força", pesoUnitarioKg: 0.22 },
			{ chave: "cabos_geral", nome: "Cabos", pesoUnitarioKg: 0.18 },
			{ chave: "carregadores", nome: "Carregadores", pesoUnitarioKg: 0.14 },
			{ chave: "adaptadores", nome: "Adaptadores", pesoUnitarioKg: 0.08 },
		],
	},
];

const ITENS_POR_CHAVE = new Map(
	CATEGORIAS_SIMULACAO.flatMap((categoria) =>
		categoria.itens.map((item) => [item.chave, item] as const),
	),
);

const SIMULACOES_EMITIDAS = new Map<string, SimulacaoEmitida>();

export function obterSimulacaoEmitidaPorJti(jti: string): SimulacaoEmitida | null {
	return SIMULACOES_EMITIDAS.get(jti) ?? null;
}

function parseQuantidade(raw: string | undefined): number {
	if (!raw) return 0;
	const parsed = Number.parseInt(raw, 10);
	if (!Number.isFinite(parsed) || parsed < 0) return 0;
	return Math.min(parsed, 999);
}

async function garantirPevSimuladoId(): Promise<number> {
	const existente = await db`
		SELECT id
		FROM pev
		WHERE name = ${PEV_SIMULADO_NOME}
		ORDER BY id ASC
		LIMIT 1
	`;

	if (existente.length > 0) {
		const primeiro = existente[0];
		if (!primeiro) {
			throw new ErroSimulacaoDescarte("Falha ao resolver PEV simulado.");
		}
		return Number(primeiro.id);
	}

	const criado = await db`
		INSERT INTO pev (name)
		VALUES (${PEV_SIMULADO_NOME})
		RETURNING id
	`;

	const primeiroCriado = criado[0];
	if (!primeiroCriado) {
		throw new ErroSimulacaoDescarte("Falha ao criar PEV simulado.");
	}

	return Number(primeiroCriado.id);
}

function gerarQrSvg(jti: string): string {
	const svg = encodeQR(jti, "svg", {
		ecc: "quartile",
		scale: 5,
		border: 2,
		encoding: "byte",
	});
	return typeof svg === "string" ? svg : String(svg);
}

export async function gerarSimulacaoQr(
	body: Record<string, string | undefined>,
): Promise<SimulacaoQrGerada> {
	try {
		const itensSelecionados: ItemResumoGerado[] = [];

		for (const [chave, item] of ITENS_POR_CHAVE.entries()) {
			const quantidade = parseQuantidade(body[`qty_${chave}`]);
			if (quantidade <= 0) continue;
			const pesoTotalKg = Number((quantidade * item.pesoUnitarioKg).toFixed(3));
			itensSelecionados.push({
				chave,
				nome: item.nome,
				quantidade,
				pesoUnitarioKg: item.pesoUnitarioKg,
				pesoTotalKg,
			});
		}

		if (itensSelecionados.length === 0) {
			throw new ErroSimulacaoDescarte(
				"Selecione pelo menos um item para gerar o QR Code.",
			);
		}

		const totalItens = itensSelecionados.reduce(
			(acc, item) => acc + item.quantidade,
			0,
		);
		const totalPesoKg = Number(
			itensSelecionados
				.reduce((acc, item) => acc + item.pesoTotalKg, 0)
				.toFixed(3),
		);

		const jti = crypto.randomUUID();
		const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTOS * 60_000);
		const idPev = await garantirPevSimuladoId();

		await db`
			INSERT INTO disposal_token (jti, id_pev, expires_at)
			VALUES (${jti}::uuid, ${idPev}, ${expiresAt})
		`;

		SIMULACOES_EMITIDAS.set(jti, {
			jti,
			createdAt: new Date(),
			expiresAt,
			totalItens,
			totalPesoKg,
			itensSelecionados,
		});

		return {
			jti,
			qrSvg: gerarQrSvg(jti),
			expiresAt,
			totalItens,
			totalPesoKg,
			itensSelecionados,
		};
	} catch (err) {
		if (err instanceof ErroSimulacaoDescarte) throw err;
		throw new ErroSimulacaoDescarte(
			"Não foi possível gerar o QR Code de simulação. Tente novamente.",
			err,
		);
	}
}