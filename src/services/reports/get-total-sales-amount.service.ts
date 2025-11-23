import { OrderRepository } from "../../repository/order.repository";

export class GetTotalSalesAmountService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute = async () => {
    const result = await this.orderRepository.getTotalSalesAmountByMonth();

    return result;
  };
}
