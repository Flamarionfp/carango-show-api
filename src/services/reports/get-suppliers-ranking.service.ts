import { SuppliersRankingDTO } from "../../dtos/order.dto";
import { OrderRepository } from "../../repository/order.repository";

export class GetSuppliersRankingService {
  constructor(private orderRepository: OrderRepository) {}

  execute = async () => {
    const ranking = await this.orderRepository.getSuppliersRankingByMonth();

    return ranking as SuppliersRankingDTO;
  };
}
