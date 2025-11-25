import { PaginatedResult, PaginationParams } from "../@types/pagination";
import {
  CreateOrderDTO,
  OrderDTO,
  OrderSummaryDTO,
  TotalSalesAmountDTO,
  TopSellingProductDTO,
  SalesReportDTO,
  FinancialReportDTO,
  SuppliersRankingDTO,
} from "../dtos/order.dto";

export interface OrderRepository {
  init(): Promise<void>;
  list: (
    userId: number,
    pagination?: PaginationParams
  ) => Promise<PaginatedResult<OrderSummaryDTO>>;
  listAll: (
    pagination?: PaginationParams
  ) => Promise<PaginatedResult<OrderSummaryDTO>>;
  findById: (id: number) => Promise<OrderDTO | undefined>;
  create: (order: CreateOrderDTO) => Promise<OrderDTO>;
  deleteByUserId: (userId: number) => Promise<void>;
  getTotalSalesAmountByMonth: () => Promise<TotalSalesAmountDTO>;
  getTopSellingProductByMonth: () => Promise<TopSellingProductDTO | null>;
  getSalesReportByMonth: () => Promise<SalesReportDTO>;
  getFinancialReportByMonth: () => Promise<FinancialReportDTO>;
  getSuppliersRankingByMonth: () => Promise<SuppliersRankingDTO>;
}
