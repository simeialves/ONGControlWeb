const { GerarHeaders } = require("../../includes/Uteis");
const app = require("../../server");
const request = require("supertest")(app);

describe("Testes da rota /pessoas", () => {
  it("Deve retornar uma lista de pessoas", async () => {
    const headers = await GerarHeaders();
    const res = await request.get("/pessoas").set(headers);
    expect(res.statusCode).toBe(201);
  });
});
