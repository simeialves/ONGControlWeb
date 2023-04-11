const app = require("../../server");
const request = require("supertest")(app);

describe("Testes da rota /pessoas", () => {
  it("Deve retornar uma lista de pessoas", async () => {
    const axios = require("axios");
    const url = "http://localhost:5000/auth/loginAuth";
    const data = {
      email: "simeiparreiras@gmail.com",
      password: "447",
    };

    const token = await axios
      .post(url, data)
      .then((response) => {
        return response.data.access_token;
      })
      .catch((error) => {
        console.error(error);
      });

    const headers = {
      "x-access-token": token,
    };

    const res = await request.get("/pessoas").set(headers);

    expect(res.statusCode).toBe(201);
  });
});
