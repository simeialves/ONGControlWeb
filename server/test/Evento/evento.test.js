const { GerarHeaders } = require("../../includes/Uteis");
const app = require("../../server");
const request = require("supertest")(app);

describe("Testes da rota /evento", () => {
  it("Deve retornar uma lista de eventos", async () => {
    const headers = await GerarHeaders();
    const res = await request.get("/eventos").set(headers);
    expect(res.statusCode).toBe(201);
  });
});
