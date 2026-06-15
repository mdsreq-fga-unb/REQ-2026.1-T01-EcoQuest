import { beforeEach, describe, expect, mock, test } from "bun:test";

const dbMock = mock();

// Mock do módulo do banco
mock.module("../../src/db", () => ({
	db: dbMock,
}));

// Importa o service somente depois do mock
const service = await import("../../src/modules/auth/service");

const {
	emailJaCadastrado,
	cpfJaCadastrado,
	criarUsuario,
	autenticarUsuario,
	ErroPersistenciaCadastro,
	ErroAutenticacaoIndisponivel,
} = service;

describe("Auth Service", () => {
	beforeEach(() => {
		dbMock.mockReset();
	});

	describe("emailJaCadastrado", () => {
		test("retorna true quando email existe", async () => {
			dbMock.mockResolvedValue([{ id: 1 }]);

			expect(await emailJaCadastrado("teste@email.com")).toBe(true);
		});

		test("retorna false quando email não existe", async () => {
			dbMock.mockResolvedValue([]);

			expect(await emailJaCadastrado("teste@email.com")).toBe(false);
		});

		test("lança erro de persistência", async () => {
			dbMock.mockRejectedValue(new Error("falha"));

			await expect(
				emailJaCadastrado("teste@email.com"),
			).rejects.toBeInstanceOf(ErroPersistenciaCadastro);
		});
	});

	describe("cpfJaCadastrado", () => {
		test("retorna true quando CPF existe", async () => {
			dbMock.mockResolvedValue([{ id: 1 }]);

			expect(await cpfJaCadastrado("123")).toBe(true);
		});

		test("retorna false quando CPF não existe", async () => {
			dbMock.mockResolvedValue([]);

			expect(await cpfJaCadastrado("123")).toBe(false);
		});

		test("lança erro de persistência", async () => {
			dbMock.mockRejectedValue(new Error("falha"));

			await expect(
				cpfJaCadastrado("123"),
			).rejects.toBeInstanceOf(ErroPersistenciaCadastro);
		});
	});

	describe("criarUsuario", () => {
		test("cria usuário com sucesso", async () => {
			const hashMock = mock().mockResolvedValue("hash");

			Bun.password.hash = hashMock as any;

			dbMock.mockResolvedValue([
				{
					id: 1,
					nome: "João",
					email: "joao@email.com",
					cpf: "123",
					telefone: "61999999999",
					pointsBalance: 0,
					pointsTotalEarned: 0,
				},
			]);

			const usuario = await criarUsuario({
				nome: "João",
				email: "joao@email.com",
				cpf: "123",
				telefone: "61999999999",
				senha: "123456",
			});

			expect(usuario).toEqual({
				id: 1,
				nome: "João",
				email: "joao@email.com",
				cpf: "123",
				telefone: "61999999999",
				pointsBalance: 0,
				pointsTotalEarned: 0,
			});

			expect(hashMock).toHaveBeenCalledTimes(1);

			expect(hashMock).toHaveBeenCalledWith(
				"123456",
				{
					algorithm: "bcrypt",
					cost: 12,
				},
			);
		});

		test("lança erro quando insert falha", async () => {
			Bun.password.hash = mock().mockResolvedValue("hash") as any;

			dbMock.mockRejectedValue(new Error("falha"));

			await expect(
				criarUsuario({
					nome: "João",
					email: "joao@email.com",
					cpf: "123",
					telefone: "61999999999",
					senha: "123456",
				}),
			).rejects.toBeInstanceOf(ErroPersistenciaCadastro);
		});
	});

	describe("autenticarUsuario", () => {
		test("autentica usuário corretamente", async () => {
			dbMock.mockResolvedValue([
				{
					id: 1,
					nome: "João",
					email: "joao@email.com",
					cpf: "123",
					telefone: "61999999999",
					passwordHash: "hash",
					pointsBalance: 0,
					pointsTotalEarned: 0,
				},
			]);

			const verifyMock = mock().mockResolvedValue(true);

			Bun.password.verify = verifyMock as any;

			const resultado = await autenticarUsuario(
				"joao@email.com",
				"123456",
			);

			expect(resultado.status).toBe("ok");

			expect(verifyMock).toHaveBeenCalledTimes(1);

			expect(verifyMock).toHaveBeenCalledWith(
				"123456",
				"hash",
			);

			if (resultado.status === "ok") {
				expect(resultado.usuario).toEqual({
					id: 1,
					nome: "João",
					email: "joao@email.com",
					cpf: "123",
					telefone: "61999999999",
					pointsBalance: 0,
					pointsTotalEarned: 0,
				});
			}
		});

		test("retorna usuario_nao_encontrado", async () => {
			dbMock.mockResolvedValue([]);

			const resultado = await autenticarUsuario(
				"teste@email.com",
				"123456",
			);

			expect(resultado).toEqual({
				status: "usuario_nao_encontrado",
			});
		});

		test("retorna senha_invalida", async () => {
			dbMock.mockResolvedValue([
				{
					id: 1,
					nome: "João",
					email: "joao@email.com",
					cpf: "123",
					telefone: "61999999999",
					passwordHash: "hash",
					pointsBalance: 0,
					pointsTotalEarned: 0,
				},
			]);

			const verifyMock = mock().mockResolvedValue(false);

			Bun.password.verify = verifyMock as any;

			const resultado = await autenticarUsuario(
				"joao@email.com",
				"senhaErrada",
			);

			expect(resultado).toEqual({
				status: "senha_invalida",
			});

			expect(verifyMock).toHaveBeenCalledTimes(1);

			expect(verifyMock).toHaveBeenCalledWith(
				"senhaErrada",
				"hash",
			);
		});

		test("lança erro quando banco falha", async () => {
			dbMock.mockRejectedValue(new Error("falha"));

			await expect(
				autenticarUsuario("teste@email.com", "123456"),
			).rejects.toBeInstanceOf(
				ErroAutenticacaoIndisponivel,
			);
		});
	});
});