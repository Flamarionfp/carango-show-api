import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

const defaultSpec = {
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
  paths: {},
};

let swaggerSpec: any = defaultSpec;

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  try {
    const swaggerPath = path.resolve(process.cwd(), "dist/swagger-spec.json");
    if (fs.existsSync(swaggerPath)) {
      swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
    } else {
      console.warn("Swagger spec não encontrado em", swaggerPath);
    }
  } catch (error) {
    console.error("Erro ao carregar swagger-spec.json:", error);
  }
} else {
  try {
    const options: swaggerJsdoc.Options = {
      definition: defaultSpec,
      apis: ["./src/routes/**/*.ts"],
    };

    swaggerSpec = swaggerJsdoc(options);
  } catch (error) {
    console.error("Erro ao gerar swagger spec em desenvolvimento:", error);
  }
}

export default swaggerSpec;
