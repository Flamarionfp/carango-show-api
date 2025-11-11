import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";

import * as z from "zod";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import cartRouter from "./routes/cart.routes";
import productRouter from "./routes/product.routes";
import supplierRouter from "./routes/supplier.routes";
import { exceptionHandlerMiddleware } from "./middlewares/exception-handler-middleware";
import { healthCheckController } from "./controllers/health-check";
import cors from "cors";
import morgan from "morgan";
import orderRouter from "./routes/order.routes";

z.config(z.locales.pt());

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const API_DOCS_URL = "/api-docs";

app.use(API_DOCS_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan("dev"));

app.use("/health-check", healthCheckController.handle);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.use(exceptionHandlerMiddleware.handle);

const port = process.env.PORT || 4444;
const host = process.env.API_HOST || "localhost";

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  const isProduction = process.env.NODE_ENV === "production";
  const protocol = isProduction ? "https" : "http";

  app.listen(port, () => {
    console.log(`🚀 Servidor rodando em ${protocol}://${host}:${port}`);
    console.log(
      `📘 Documentação da API: ${protocol}://${host}:${port}${API_DOCS_URL}`
    );
  });
});
