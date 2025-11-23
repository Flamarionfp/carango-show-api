import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { GetSalesReportService } from "../../../services/reports/get-sales-report.service";
import { GetSalesReportController } from "./get-sales-report.controller";

export const makeGetSalesReportController =
  async (): Promise<GetSalesReportController> => {
    const orderRepository = new OrderSqliteRepository();
    await orderRepository.init();

    const getSalesReportService = new GetSalesReportService(orderRepository);

    const getSalesReportController = new GetSalesReportController(
      getSalesReportService
    );

    return getSalesReportController;
  };
