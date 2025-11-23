import { OrderRepository } from "../../src/repository/order.repository";
import { GetFinancialReportService } from "../../src/services/reports/get-financial-report.service";

describe("GetFinancialReportService", () => {
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let getFinancialReportService: GetFinancialReportService;

  beforeEach(() => {
    mockOrderRepository = {
      init: jest.fn().mockResolvedValue(undefined),
      create: jest.fn(),
      list: jest.fn(),
      findById: jest.fn(),
      listAll: jest.fn(),
      deleteByUserId: jest.fn(),
      getTotalSalesAmountByMonth: jest.fn(),
      getTopSellingProductByMonth: jest.fn(),
      getSalesReportByMonth: jest.fn(),
      getFinancialReportByMonth: jest.fn(),
    } as any;

    getFinancialReportService = new GetFinancialReportService(
      mockOrderRepository
    );
  });

  it("should return financial report with all metrics", async () => {
    const mockReport = {
      period: "2025-11",
      metrics: {
        totalAmount: 50000.0,
        totalOrders: 15,
        averageOrderValue: 3333.33,
        averageItemPrice: 1111.11,
        topSellingProduct: {
          productId: 1,
          productName: "Ferrari F8",
          productTrade: "Ferrari",
          productModel: "F8 Tributo",
          totalQuantitySold: 10,
          totalAmount: 5000.0,
        },
      },
    };

    mockOrderRepository.getFinancialReportByMonth.mockResolvedValue(mockReport);

    const result = await getFinancialReportService.execute();

    expect(result.period).toBe("2025-11");
    expect(result.metrics.totalAmount).toBe(50000.0);
    expect(result.metrics.totalOrders).toBe(15);
    expect(result.metrics.averageOrderValue).toBe(3333.33);
    expect(result.metrics.averageItemPrice).toBe(1111.11);
    expect(result.metrics.topSellingProduct).toBeDefined();
    expect(mockOrderRepository.getFinancialReportByMonth).toHaveBeenCalledTimes(
      1
    );
  });

  it("should return financial report with null top selling product", async () => {
    const mockReport = {
      period: "2025-11",
      metrics: {
        totalAmount: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        averageItemPrice: 0,
        topSellingProduct: null,
      },
    };

    mockOrderRepository.getFinancialReportByMonth.mockResolvedValue(mockReport);

    const result = await getFinancialReportService.execute();

    expect(result.metrics.totalAmount).toBe(0);
    expect(result.metrics.topSellingProduct).toBeNull();
    expect(mockOrderRepository.getFinancialReportByMonth).toHaveBeenCalledTimes(
      1
    );
  });

  it("should calculate correct financial metrics", async () => {
    const mockReport = {
      period: "2025-11",
      metrics: {
        totalAmount: 10000.0,
        totalOrders: 4,
        averageOrderValue: 2500.0,
        averageItemPrice: 500.0,
        topSellingProduct: {
          productId: 2,
          productName: "Lamborghini",
          productTrade: "Lamborghini",
          productModel: "Huracan",
          totalQuantitySold: 5,
          totalAmount: 3000.0,
        },
      },
    };

    mockOrderRepository.getFinancialReportByMonth.mockResolvedValue(mockReport);

    const result = await getFinancialReportService.execute();

    expect(result.metrics.totalAmount).toBe(10000.0);
    expect(result.metrics.totalOrders).toBe(4);
    expect(result.metrics.averageOrderValue).toBe(2500.0);
    expect(result.metrics.averageItemPrice).toBe(500.0);
    expect(mockOrderRepository.getFinancialReportByMonth).toHaveBeenCalledTimes(
      1
    );
  });
});
