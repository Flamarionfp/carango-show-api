import { Router } from "express";
import { makeGetTotalSalesAmountController } from "../controllers/reports/get-total-sales-amount-controller";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";

const reportRouter = Router();

/**
 * @swagger
 * /report:
 *   tags:
 *     name: Reports
 */
const configureReportRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  reportRouter.use(authMiddleware.handle);
  reportRouter.use(checkRoleMiddleware.admin);

  const getTotalSalesAmountController =
    await makeGetTotalSalesAmountController();

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
  reportRouter.get("/total-sales", getTotalSalesAmountController.handle);

  return reportRouter;
};

configureReportRoutes();

export default reportRouter;
