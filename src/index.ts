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
import reportRouter from "./routes/report.routes";

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
app.use("/report", reportRouter);

app.use(exceptionHandlerMiddleware.handle);

const port = Number(process.env.PORT || 4444);

app.listen(port, "0.0.0.0", () => {
  logServerInfo(port, process.env.API_HOST);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
