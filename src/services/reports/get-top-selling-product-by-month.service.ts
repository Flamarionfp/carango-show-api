import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { OrderRepository } from "../../repository/order.repository";

export class GetTopSellingProductByMonthService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute = async () => {
    const result = await this.orderRepository.getTopSellingProductByMonth();

    if (!result) throw new NotFoundException("Nenhum produto vendido esse mês");

    return result;
  };
}
