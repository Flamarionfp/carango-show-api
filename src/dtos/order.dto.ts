export interface OrderItemDTO {
  id: number;
  productId: number;
  productName: string;
  price: number;
  productTrade: string;
  productModel: string;
  productYear: string;
  productSpecifications: string[];
  productThumb: string;
}

export interface OrderDTO {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItemDTO[];
}

export interface OrderSummaryDTO {
  id: number;
  totalAmount: number;
  createdAt: string;
}

export type CreateOrderDTO = Omit<OrderDTO, "id" | "createdAt" | "items"> & {
  items: Omit<OrderItemDTO, "id">[];
};

export interface TotalSalesAmountDTO {
  totalMonthAmount: number;
  orderCount: number;
}

export interface TopSellingProductDTO {
  productId: number;
  productName: string;
  productTrade: string;
  productModel: string;
  totalQuantitySold: number;
  totalAmount: number;
}

export interface SalesReportOrderDTO {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string;
  itemCount: number;
}

export interface SalesReportDTO {
  period: string;
  totalOrders: number;
  totalItemsSold: number;
  averageOrderValue: number;
  orders: SalesReportOrderDTO[];
}

export interface FinancialMetricsDTO {
  totalAmount: number;
  totalOrders: number;
  averageOrderValue: number;
  averageItemPrice: number;
  topSellingProduct: TopSellingProductDTO | null;
}

export interface FinancialReportDTO {
  period: string;
  metrics: FinancialMetricsDTO;
}

export interface TopSupplierDTO {
  supplierId: number;
  supplierName: string;
  supplierEmail: string;
  totalProductsSold: number;
  totalAmount: number;
  averageOrderValue: number;
}

export interface SuppliersRankingDTO {
  period: string;
  suppliers: TopSupplierDTO[];
}
