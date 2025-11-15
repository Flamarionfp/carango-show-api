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
import { API_DOCS_URL } from "./constants/api";
import { logServerInfo } from "./helpers/misc/server";

z.config(z.locales.pt());

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

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
const host = process.env.API_HOST || "0.0.0.0";

app.listen(Number(port), host, () => {
  console.log("🔧 Starting API...");
  console.log("NODE_ENV =", process.env.NODE_ENV);
  console.log("DATABASE_URL =", process.env.DATABASE_URL);
  console.log("PORT =", process.env.PORT);

  logServerInfo(host, port);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
