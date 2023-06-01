const { GerarHeaders } = require("../../includes/Uteis");
const app = require("../../server");
const request = require("supertest")(app);

let server;

beforeEach((done) => {
  server = app.listen(done);
});

afterEach((done) => {
  server.close(done);
});

describe("Testes da rota /evento", () => {
  it("Deve retornar uma lista de eventos", async () => {
    const headers = await GerarHeaders();
    const res = await request.get("/eventos").set(headers);
    expect(res.statusCode).toBe(201);
  });
});
