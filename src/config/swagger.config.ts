import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const apis = isProduction
  ? [path.resolve(process.cwd(), "dist/src/routes/**/*.js")]
  : ["./src/routes/**/*.ts"];

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
