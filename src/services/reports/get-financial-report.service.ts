import { FinancialReportDTO } from "../../dtos/order.dto";
import { OrderRepository } from "../../repository/order.repository";

export class GetFinancialReportService {
  constructor(private orderRepository: OrderRepository) {}

  async execute() {
    const report = await this.orderRepository.getFinancialReportByMonth();

    return report as FinancialReportDTO;
  }
}
