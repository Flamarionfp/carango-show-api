import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { GetTotalSalesAmountService } from "../../../services/reports/get-total-sales-amount.service";
import { GetTotalSalesAmountController } from "./get-total-sales-amount.controller";

export const makeGetTotalSalesAmountController =
  async (): Promise<GetTotalSalesAmountController> => {
    const orderRepository = new OrderSqliteRepository();
    await orderRepository.init();

    const getTotalSalesAmountService = new GetTotalSalesAmountService(
      orderRepository
    );
    const getTotalSalesAmountController = new GetTotalSalesAmountController(
      getTotalSalesAmountService
    );

    return getTotalSalesAmountController;
  };
