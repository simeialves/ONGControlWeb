const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
        url: "http://localhost:5000",
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: [
    "./routes/pessoaRoutes.js",
    "./routes/eventoRoutes.js",
    "./docs/projeto-docs.js",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

const serveSwaggerUI = swaggerUi.serve;
const setupSwaggerUI = swaggerUi.setup(swaggerSpec);

module.exports = {
  swaggerSpec,
  serveSwaggerUI,
  setupSwaggerUI,
};
