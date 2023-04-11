describe("Testando conexão com o banco de dados", () => {
  test("Conectando ao banco de dados", async () => {
    const [rows] = await global.connection.execute("SELECT 1 + 1 as solution");
    expect(rows[0].solution).toBe(2);
  });

  test("Verificando usuarios banco de dados", async () => {
    const result = await global.connection.execute("select * from usuario");
    expect(result[0].length).toBe(4);
  });
});
