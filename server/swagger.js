const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Define as opções do Swagger
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API ONGControl",
      version: "1.0.0",
      description: "API",
    },
    servers: [
      {
        url: "http://localhost:5000", // Ajuste o URL para o seu servidor
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: ["./routes/pessoaRoutes.js", "./routes/eventoRoutes.js"],
};

const swaggerSpec = swaggerJsDoc(options);

// Middleware para servir a interface do Swagger UI
const serveSwaggerUI = swaggerUi.serve;
const setupSwaggerUI = swaggerUi.setup(swaggerSpec);

module.exports = {
  swaggerSpec,
  serveSwaggerUI,
  setupSwaggerUI,
};
