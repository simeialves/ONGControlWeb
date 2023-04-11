const app = require("../../server"); // substitua pelo nome do arquivo do seu aplicativo
const request = require("supertest")(app);

describe("Testes da rota /evento", () => {
  it("Deve retornar uma lista de eventos", async () => {
    const res = await request.get("/eventos");
    expect(res.statusCode).toBe(201);
  });
});
