import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { GetSuppliersRankingService } from "../../../services/reports/get-suppliers-ranking.service";
import { GetSuppliersRankingController } from "./get-suppliers-ranking.controller";

export const makeGetSuppliersRankingController =
  async (): Promise<GetSuppliersRankingController> => {
    const orderRepository = new OrderSqliteRepository();
    await orderRepository.init();

    const getSuppliersRankingService = new GetSuppliersRankingService(
      orderRepository
    );

    const getSuppliersRankingController = new GetSuppliersRankingController(
      getSuppliersRankingService
    );

    return getSuppliersRankingController;
  };
