const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");
const path = require("path");

const options = {
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
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const distDir = path.resolve(process.cwd(), "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const swaggerPath = path.resolve(distDir, "swagger-spec.json");
fs.writeFileSync(swaggerPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`✓ Swagger spec gerado em: ${swaggerPath}`);
