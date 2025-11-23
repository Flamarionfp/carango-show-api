import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { GetTopSellingProductByMonthService } from "../../../services/reports/get-top-selling-product-by-month.service";
import { GetTopSellingProductByMonthController } from "./get-top-selling-product-by-month.controller";

export const makeGetTopSellingProductByMonthController =
  async (): Promise<GetTopSellingProductByMonthController> => {
    const orderRepository = new OrderSqliteRepository();
    await orderRepository.init();

    const getTopSellingProductByMonthService =
      new GetTopSellingProductByMonthService(orderRepository);

    const getTopSellingProductByMonthController =
      new GetTopSellingProductByMonthController(
        getTopSellingProductByMonthService
      );

    return getTopSellingProductByMonthController;
  };
