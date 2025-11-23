import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { GetFinancialReportService } from "../../../services/reports/get-financial-report.service";
import { GetFinancialReportController } from "./get-financial-report.controller";

export const makeGetFinancialReportController =
  async (): Promise<GetFinancialReportController> => {
    const orderRepository = new OrderSqliteRepository();
    await orderRepository.init();

    const getFinancialReportService = new GetFinancialReportService(
      orderRepository
    );

    const getFinancialReportController = new GetFinancialReportController(
      getFinancialReportService
    );

    return getFinancialReportController;
  };
