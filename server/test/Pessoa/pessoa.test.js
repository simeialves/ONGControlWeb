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

describe("Testes da rota /pessoas", () => {
  it("Deve retornar uma lista de pessoas", async () => {
    //const headers = await GerarHeaders();
    //const res = await request.get("/pessoas").set(headers);
    const res = await request.get("/pessoas");
    expect(res.statusCode).toBe(201);
  });
});
