describe("User CRUD Operations", () => {
  before(() => {
    cy.visit("http://localhost:3006");
  });
  describe("Logar no Sistema", () => {
    it("Validar se o sistema está autenticando corretamente", () => {
      cy.get("#nome").type("simeiparreiras@gmail.com");
      cy.get("#senha").type("447");
      cy.get(".css-1huxgrb > .chakra-button").click();
      cy.get(":nth-child(2) > .nav-item > #basic-nav-dropdown").click();
      cy.get('[href="/pessoas"]').click();
      cy.get(".css-mfdy5q > .chakra-button").click();
      cy.get("#nome").type("AASIMEI ALVES PARREIRAS");
      cy.get(".css-vjyt8w").click();
      cy.contains("AASIMEI ALVES PARREIRAS");
    });
  });
  describe("Editar uma pessoa", () => {
    it("Editar uma pessoa", () => {
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(1)").click();
      cy.get("#nome").clear().type("AASIMEI ALVES PARREIRAS");
    });
  });
  //   describe("Criar um novo usuário", () => {
  //     it("Validar a criação de um novo usuário no banco de dados (este cenário deve considerar o preenchimento do formulário de cadastro e depois clicar no botão 'Save')", () => {
  //       cy.get(".RaCreateButton-root").click();
  //       cy.get("#name").type("Stéfane Laurenço Parreiras");
  //       cy.get("#email").type("stefanelourenco@gmail.com");
  //       cy.get("#password").type("654321");
  //       cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
  //       cy.get("#password").type("{enter}");

  //       cy.contains("Element created");
  //       cy.contains("Stéfane Laurenço Parreiras");
  //       cy.contains("stefanelourenco@gmail.com");
  //       cy.contains("654321");
  //     });

  //     it("Validar a criação de um novo usuário no banco de dados (este cenário deve considerar o preenchimento do formulário de cadastro e depois apertar 'Enter' para enviar os dados))", () => {
  //       cy.get(".RaCreateButton-root").click();
  //       cy.get("#name").type("Stéfane Laurenço Parreiras");
  //       cy.get("#email").type("stefanelourenco@gmail.com");
  //       cy.get("#password").type("654321");
  //       cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
  //       cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

  //       cy.contains("Element created");
  //       cy.contains("Stéfane Laurenço Parreiras");
  //       cy.contains("stefanelourenco@gmail.com");
  //       cy.contains("654321");
  //     });
  //   });
  //   describe("Editar um usuário", () => {
  //     it("Validar a edição de um usuário existente no banco de dados", () => {
  //       cy.task("db:create:user", {
  //         name: "Bille Jow",
  //         email: "billiejow@gmail.com",
  //         password: "petisco",
  //       });

  //       cy.visit("http://localhost:3000");

  //       cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

  //       cy.get("#name").clear().type("Bille Joe");
  //       cy.get("#email").clear().type("billejoe@gmail.com");
  //       cy.get("#password").clear().type("petisco123");

  //       cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

  //       cy.contains("Element updated");

  //       cy.contains("Bille Joe");
  //     });

  //     it("Cancelar a edição de um usuário depois de preencher o formulário e clicar no botão 'Save'", () => {
  //       cy.task("db:create:user", {
  //         name: "Bille Jow",
  //         email: "billiejow@gmail.com",
  //         password: "petisco",
  //       });

  //       cy.visit("http://localhost:3000");

  //       cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

  //       cy.get("#name").clear().type("Bille Joe");
  //       cy.get("#email").clear().type("billejoe@gmail.com");
  //       cy.get("#password").clear().type("petisco123");

  //       cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

  //       cy.contains("Element updated");

  //       cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();

  //       cy.contains("Bille Jow");
  //     });
  //   });
  //   describe("Remover um usuário", () => {
  //     it("Validar a remoção de um usuário no banco de dados", () => {
  //       cy.task("db:create:user", {
  //         name: "Stéfane Parreiras",
  //         email: "stefaneparreiras@gmail.com",
  //         password: "123456",
  //       });

  //       cy.contains("Stéfane Parreiras");
  //       cy.contains("stefaneparreiras@gmail.com");
  //       cy.contains("123456");

  //       cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

  //       cy.get(".MuiButton-text").click();

  //       cy.contains("Element deleted");
  //       cy.contains("No User yet.");
  //     });

  //     it("Cancelar a remoção de um usuário depois de clicar no botão 'Delete'", () => {
  //       cy.task("db:create:user", {
  //         name: "Stéfane Parreiras",
  //         email: "stefaneparreiras@gmail.com",
  //         password: "123456",
  //       });

  //       cy.contains("Stéfane Parreiras");
  //       cy.contains("stefaneparreiras@gmail.com");
  //       cy.contains("123456");

  //       cy.get(".MuiTableBody-root > :nth-child(1) > .column-id").click();

  //       cy.get(".MuiButton-text").click();

  //       cy.contains("Element deleted");

  //       cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();

  //       cy.contains("Stéfane Parreiras");
  //     });
  //   });
});
