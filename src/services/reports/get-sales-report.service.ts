import { SalesReportDTO } from "../../dtos/order.dto";
import { OrderRepository } from "../../repository/order.repository";

export class GetSalesReportService {
  constructor(private orderRepository: OrderRepository) {}

  async execute() {
    const report = await this.orderRepository.getSalesReportByMonth();

    return report as SalesReportDTO;
  }
}
