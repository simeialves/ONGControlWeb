const request = require("supertest");
const app = require("../../routes/pessoaRoutes"); // substitua pelo nome do arquivo do seu aplicativo

describe("Testes da rota /pessoas", () => {
  it("Deve retornar uma lista de pessoas", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(201);
  });
});
