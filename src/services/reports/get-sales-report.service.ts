import { SalesReportDTO } from "../../dtos/order.dto";
import { OrderRepository } from "../../repository/order.repository";

export class GetSalesReportService {
  constructor(private orderRepository: OrderRepository) {}

  execute = async () => {
    const report = await this.orderRepository.getSalesReportByMonth();

    return report as SalesReportDTO;
  };
}
