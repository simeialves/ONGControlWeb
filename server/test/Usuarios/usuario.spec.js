describe("Testando conexão com o banco de dados", () => {
  test("Conectando ao banco de dados", async () => {
    const [rows] = await global.connection.execute("SELECT 1 + 1 AS solution");
    expect(rows[0].solution).toBe(2);
  });
});
