import "dotenv/config";
import { API_DOCS_URL } from "../../constants/api";

export function logServerInfo(port: string | number, liveHost?: string) {
  const isProduction = process.env.NODE_ENV === "production";
  const protocol = isProduction ? "https" : "http";

  if (isProduction && liveHost) {
    console.log(`🚀 Servidor rodando em ${protocol}://${liveHost}`);
    console.log(
      `📘 Documentação da API: ${protocol}://${liveHost}${API_DOCS_URL}`
    );

    return;
  }

  console.log(`🚀 Servidor rodando em ${protocol}://localhost:${port}`);
  console.log(
    `📘 Documentação da API: ${protocol}://localhost:${port}${API_DOCS_URL}`
  );
}
