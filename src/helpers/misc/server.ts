import "dotenv/config";
import { API_DOCS_URL } from "../../constants/api";

export function logServerInfo(host: string, port: string | number) {
  const isProduction = process.env.NODE_ENV === "production";
  const protocol = isProduction ? "https" : "http";

  if (isProduction) {
    console.log(`🚀 Servidor rodando em ${protocol}://${host}`);
    console.log(`📘 Documentação da API: ${protocol}://${host}${API_DOCS_URL}`);
  }

  console.log(`🚀 Servidor rodando em ${protocol}://localhost:${port}`);
  console.log(
    `📘 Documentação da API: ${protocol}://localhost:${port}${API_DOCS_URL}`
  );
}
