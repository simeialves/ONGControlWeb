const app = require("../../server"); // substitua pelo nome do arquivo do seu aplicativo
const request = require("supertest")(app);

describe("Testes da rota /pessoas", () => {
  it("Deve retornar uma lista de pessoas", async () => {
    const res = await request.get("/pessoas");
    expect(res.statusCode).toBe(201);
  });
});
