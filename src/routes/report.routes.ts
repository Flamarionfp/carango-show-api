import { Router } from "express";
import { makeGetTotalSalesAmountController } from "../controllers/reports/get-total-sales-amount-controller";
import { makeGetTopSellingProductByMonthController } from "../controllers/reports/get-top-selling-product-by-month-controller";
import { makeGetSalesReportController } from "../controllers/reports/get-sales-report-controller";
import { makeGetFinancialReportController } from "../controllers/reports/get-financial-report-controller";
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

/**
 * @swagger
 * /report/sales:
 *   get:
 *     tags: [Reports]
 *     summary: Obter relatório de vendas
 *     description: Retorna relatório detalhado de vendas do mês com lista de pedidos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Relatório de vendas obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period:
 *                   type: string
 *                   description: Período do relatório (YYYY-MM)
 *                   example: "2025-11"
 *                 totalOrders:
 *                   type: integer
 *                   description: Total de pedidos
 *                   example: 15
 *                 totalItemsSold:
 *                   type: integer
 *                   description: Total de itens vendidos
 *                   example: 45
 *                 averageOrderValue:
 *                   type: number
 *                   description: Valor médio por pedido
 *                   example: 3333.33
 *                 orders:
 *                   type: array
 *                   description: Lista de pedidos
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       totalAmount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                       itemCount:
 *                         type: integer
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado - apenas administradores
 */

/**
 * @swagger
 * /report/financial:
 *   get:
 *     tags: [Reports]
 *     summary: Obter relatório financeiro
 *     description: Retorna análise financeira do mês com métricas de receita, preços médios e produtos mais vendidos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Relatório financeiro obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period:
 *                   type: string
 *                   description: Período do relatório (YYYY-MM)
 *                   example: "2025-11"
 *                 metrics:
 *                   type: object
 *                   properties:
 *                     totalAmount:
 *                       type: number
 *                       description: Receita total do período
 *                       example: 50000.00
 *                     totalOrders:
 *                       type: integer
 *                       description: Total de pedidos
 *                       example: 15
 *                     averageOrderValue:
 *                       type: number
 *                       description: Valor médio por pedido
 *                       example: 3333.33
 *                     averageItemPrice:
 *                       type: number
 *                       description: Preço médio por item
 *                       example: 1111.11
 *                     topSellingProduct:
 *                       type: object
 *                       nullable: true
 *                       description: Produto mais vendido (null se nenhum produto foi vendido)
 *                       properties:
 *                         productId:
 *                           type: integer
 *                         productName:
 *                           type: string
 *                         productTrade:
 *                           type: string
 *                         productModel:
 *                           type: string
 *                         totalQuantitySold:
 *                           type: integer
 *                         totalAmount:
 *                           type: number
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

  const getSalesReportController = await makeGetSalesReportController();

  reportRouter.get("/sales", getSalesReportController.handle);

  const getFinancialReportController = await makeGetFinancialReportController();

  reportRouter.get("/financial", getFinancialReportController.handle);

  return reportRouter;
};

configureReportRoutes();

export default reportRouter;
