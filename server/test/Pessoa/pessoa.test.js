const app = require("../../routes/pessoaRoutes"); // substitua pelo nome do arquivo do seu aplicativo
const request = require("supertest")(app);

describe("Testes da rota pessoa", () => {
  test("Deve retornar uma lista de pessoas", async () => {
    const response = await request
      .get("/")
      .expect("Content-Type", /application\/json/);
    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBe(1);
  });

  //   it("Deve criar uma nova pessoa", async () => {
  //     const novaPessoa = { nome: "Maria", idade: 30 };
  //     const res = await request(app).post("/pessoa").send(novaPessoa);
  //     expect(res.statusCode).toEqual(201);
  //     expect(res.body).toHaveProperty("mensagem", "Pessoa criada com sucesso!");
  //   });

  //   it("Deve atualizar uma pessoa existente", async () => {
  //     const pessoaAtualizada = { nome: "João", idade: 25 };
  //     const res = await request(app).put("/pessoa/1").send(pessoaAtualizada);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty(
  //       "mensagem",
  //       "Pessoa atualizada com sucesso!"
  //     );
  //   });

  //   it("Deve excluir uma pessoa existente", async () => {
  //     const res = await request(app).delete("/pessoa/1");
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty("mensagem", "Pessoa excluída com sucesso!");
  //   });
});
