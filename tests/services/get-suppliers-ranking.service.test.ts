import { OrderRepository } from "../../src/repository/order.repository";
import { GetSuppliersRankingService } from "../../src/services/reports/get-suppliers-ranking.service";

describe("GetSuppliersRankingService", () => {
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let getSuppliersRankingService: GetSuppliersRankingService;

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
      getSuppliersRankingByMonth: jest.fn(),
    } as any;

    getSuppliersRankingService = new GetSuppliersRankingService(
      mockOrderRepository
    );
  });

  it("should return suppliers ranking with top sellers first", async () => {
    const mockRanking = {
      period: "2025-11",
      suppliers: [
        {
          supplierId: 1,
          supplierName: "Ferrari",
          supplierEmail: "contact@ferrari.com",
          totalProductsSold: 50,
          totalAmount: 5000000.0,
          averageOrderValue: 100000.0,
        },
        {
          supplierId: 2,
          supplierName: "Lamborghini",
          supplierEmail: "contact@lamborghini.com",
          totalProductsSold: 30,
          totalAmount: 3000000.0,
          averageOrderValue: 100000.0,
        },
      ],
    };

    mockOrderRepository.getSuppliersRankingByMonth.mockResolvedValue(
      mockRanking
    );

    const result = await getSuppliersRankingService.execute();

    expect(result).toEqual(mockRanking);
    expect(result.period).toBe("2025-11");
    expect(result.suppliers).toHaveLength(2);
    expect(result.suppliers[0].totalAmount).toBeGreaterThan(
      result.suppliers[1].totalAmount
    );
    expect(
      mockOrderRepository.getSuppliersRankingByMonth
    ).toHaveBeenCalledTimes(1);
  });

  it("should return empty suppliers list when no sales", async () => {
    const mockRanking = {
      period: "2025-11",
      suppliers: [],
    };

    mockOrderRepository.getSuppliersRankingByMonth.mockResolvedValue(
      mockRanking
    );

    const result = await getSuppliersRankingService.execute();

    expect(result.suppliers).toHaveLength(0);
    expect(
      mockOrderRepository.getSuppliersRankingByMonth
    ).toHaveBeenCalledTimes(1);
  });

  it("should calculate correct ranking metrics", async () => {
    const mockRanking = {
      period: "2025-11",
      suppliers: [
        {
          supplierId: 3,
          supplierName: "Porsche",
          supplierEmail: "contact@porsche.com",
          totalProductsSold: 20,
          totalAmount: 2000000.0,
          averageOrderValue: 100000.0,
        },
      ],
    };

    mockOrderRepository.getSuppliersRankingByMonth.mockResolvedValue(
      mockRanking
    );

    const result = await getSuppliersRankingService.execute();

    expect(result.suppliers[0].totalProductsSold).toBe(20);
    expect(result.suppliers[0].totalAmount).toBe(2000000.0);
    expect(
      mockOrderRepository.getSuppliersRankingByMonth
    ).toHaveBeenCalledTimes(1);
  });
});
