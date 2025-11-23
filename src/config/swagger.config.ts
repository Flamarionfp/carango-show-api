import swaggerJsdoc from "swagger-jsdoc";

const isProduction = process.env.NODE_ENV === "production";

const apis = isProduction
  ? ["./dist/src/routes/*.js", "./dist/src/routes/schemas.js"]
  : ["./src/routes/*.ts", "./src/routes/schemas.ts"];

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carango Show API",
      version: "1.0.0",
      description: "API para o sistema de e-commerce Carango Show.",
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "api-key",
          description: "Chave de API para acesso a endpoints públicos.",
        },
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT para autenticação de usuários.",
        },
      },
    },
  },
  apis,
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
