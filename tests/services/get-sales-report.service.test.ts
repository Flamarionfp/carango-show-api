import { OrderRepository } from "../../src/repository/order.repository";
import { GetSalesReportService } from "../../src/services/reports/get-sales-report.service";

describe("GetSalesReportService", () => {
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let getSalesReportService: GetSalesReportService;

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

    getSalesReportService = new GetSalesReportService(mockOrderRepository);
  });

  it("should return sales report with orders list", async () => {
    const mockReport = {
      period: "2025-11",
      totalOrders: 3,
      totalItemsSold: 10,
      averageOrderValue: 3333.33,
      orders: [
        {
          id: 1,
          userId: 1,
          totalAmount: 5000,
          createdAt: "2025-11-20T10:00:00Z",
          itemCount: 5,
        },
        {
          id: 2,
          userId: 2,
          totalAmount: 3000,
          createdAt: "2025-11-21T11:00:00Z",
          itemCount: 3,
        },
        {
          id: 3,
          userId: 1,
          totalAmount: 2000,
          createdAt: "2025-11-22T12:00:00Z",
          itemCount: 2,
        },
      ],
    };

    mockOrderRepository.getSalesReportByMonth.mockResolvedValue(mockReport);

    const result = await getSalesReportService.execute();

    expect(result).toEqual(mockReport);
    expect(result.period).toBe("2025-11");
    expect(result.totalOrders).toBe(3);
    expect(result.totalItemsSold).toBe(10);
    expect(result.orders).toHaveLength(3);
    expect(mockOrderRepository.getSalesReportByMonth).toHaveBeenCalledTimes(1);
  });

  it("should return empty orders list when no sales", async () => {
    const mockReport = {
      period: "2025-11",
      totalOrders: 0,
      totalItemsSold: 0,
      averageOrderValue: 0,
      orders: [],
    };

    mockOrderRepository.getSalesReportByMonth.mockResolvedValue(mockReport);

    const result = await getSalesReportService.execute();

    expect(result.totalOrders).toBe(0);
    expect(result.orders).toHaveLength(0);
    expect(mockOrderRepository.getSalesReportByMonth).toHaveBeenCalledTimes(1);
  });

  it("should calculate correct average order value", async () => {
    const mockReport = {
      period: "2025-11",
      totalOrders: 2,
      totalItemsSold: 5,
      averageOrderValue: 2500.0,
      orders: [
        {
          id: 1,
          userId: 1,
          totalAmount: 2000,
          createdAt: "2025-11-20T10:00:00Z",
          itemCount: 3,
        },
        {
          id: 2,
          userId: 2,
          totalAmount: 3000,
          createdAt: "2025-11-21T11:00:00Z",
          itemCount: 2,
        },
      ],
    };

    mockOrderRepository.getSalesReportByMonth.mockResolvedValue(mockReport);

    const result = await getSalesReportService.execute();

    expect(result.averageOrderValue).toBe(2500.0);
    expect(mockOrderRepository.getSalesReportByMonth).toHaveBeenCalledTimes(1);
  });
});
