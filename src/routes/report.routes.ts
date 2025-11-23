import { Router } from "express";
import { makeGetTotalSalesAmountController } from "../controllers/reports/get-total-sales-amount-controller";
import { makeGetTopSellingProductByMonthController } from "../controllers/reports/get-top-selling-product-by-month-controller";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";

const reportRouter = Router();

/**
 * @swagger
 * /report:
 *   tags:
 *     name: Reports
 */

/**
 * @swagger
 * /report/total-sales:
 *   get:
 *     tags: [Reports]
 *     summary: Obter total de vendas
 *     description: Retorna o valor total de vendas e a quantidade de pedidos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total de vendas obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMonthAmount:
 *                   type: number
 *                   description: Valor total de vendas (no mês)
 *                   example: 50000.00
 *                 orderCount:
 *                   type: integer
 *                   description: Quantidade de pedidos
 *                   example: 5
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado - apenas administradores
 */

/**
 * @swagger
 * /report/top-selling-product-by-month:
 *   get:
 *     tags: [Reports]
 *     summary: Obter produto mais vendido do mês
 *     description: Retorna o produto mais vendido (por quantidade) no mês atual
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Produto mais vendido obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: integer
 *                   description: ID do produto
 *                   example: 1
 *                 productName:
 *                   type: string
 *                   description: Nome do produto
 *                   example: "Carro Esporte"
 *                 productTrade:
 *                   type: string
 *                   description: Marca/Trade do produto
 *                   example: "Ferrari"
 *                 productModel:
 *                   type: string
 *                   description: Modelo do produto
 *                   example: "F8 Tributo"
 *                 totalQuantitySold:
 *                   type: integer
 *                   description: Total de unidades vendidas
 *                   example: 10
 *                 totalAmount:
 *                   type: number
 *                   description: Receita total do produto
 *                   example: 500000.00
 *       404:
 *         description: Nenhum produto vendido neste mês
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado - apenas administradores
 */

const configureReportRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  reportRouter.use(authMiddleware.handle);
  reportRouter.use(checkRoleMiddleware.admin);

  const getTotalSalesAmountController =
    await makeGetTotalSalesAmountController();

  reportRouter.get("/total-sales", getTotalSalesAmountController.handle);

  const getTopSellingProductByMonthController =
    await makeGetTopSellingProductByMonthController();

  reportRouter.get(
    "/top-selling-product-by-month",
    getTopSellingProductByMonthController.handle
  );

  return reportRouter;
};

configureReportRoutes();

export default reportRouter;
