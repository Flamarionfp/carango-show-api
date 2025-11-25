import { PaginatedResult, PaginationParams } from "../../@types/pagination";
import { connectDatabase, DatabaseConnection } from "../../config/database";
import {
  CreateOrderDTO,
  OrderDTO,
  OrderSummaryDTO,
  TotalSalesAmountDTO,
  TopSellingProductDTO,
  SalesReportOrderDTO,
  SalesReportDTO,
  FinancialReportDTO,
  SuppliersRankingDTO,
} from "../../dtos/order.dto";
import { paginate } from "../../helpers/misc/paginate";
import { OrderRepository } from "../order.repository";

export class OrderSqliteRepository implements OrderRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  findById = async (id: number) => {
    const orders = await this.fetchOrdersWithItems("WHERE o.id = ?", [id]);
    return orders.length > 0 ? orders[0] : undefined;
  };

  list = async (
    userId: number,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<OrderSummaryDTO>> => {
    return this.fetchOrdersSummary("WHERE o.user_id = ?", [userId], pagination);
  };

  listAll = async (
    pagination?: PaginationParams
  ): Promise<PaginatedResult<OrderSummaryDTO>> => {
    return this.fetchOrdersSummary("", [], pagination);
  };

  create = async (order: CreateOrderDTO): Promise<OrderDTO> => {
    const result = await this.connection.run(
      `INSERT INTO orders (user_id, total_amount, created_at) VALUES (?, ?, datetime('now'))`,
      order.userId,
      order.totalAmount
    );

    const orderId = result.lastID;

    for (const item of order.items) {
      await this.connection.run(
        `INSERT INTO order_items (order_id, product_id, price) VALUES (?, ?, ?)`,
        orderId,
        item.productId,
        item.price
      );
    }

    const createdOrder = await this.findById(orderId);
    if (!createdOrder) throw new Error("Erro ao criar o pedido");

    return createdOrder;
  };

  private async fetchOrdersWithItems(
    whereClause = "",
    params: any[] = []
  ): Promise<OrderDTO[]> {
    const query = `
      SELECT
        o.id AS orderId,
        o.user_id AS userId,
        o.total_amount AS totalAmount,
        o.created_at AS createdAt,
        oi.id AS orderItemId,
        oi.product_id AS productId,
        oi.price AS price,
        p.name AS productName,
        p.trade AS productTrade,
        p.model AS productModel,
        p.year AS productYear,
        p.specifications AS productSpecifications,
        p.thumb AS productThumb
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      ${whereClause}
      ORDER BY o.created_at DESC
    `;

    const rows = await this.connection.all<any[]>(query, ...params);

    if (rows.length === 0) return [];

    const ordersMap = new Map<number, OrderDTO>();
    for (const row of rows) {
      if (!ordersMap.has(row.orderId)) {
        ordersMap.set(row.orderId, {
          id: row.orderId,
          userId: row.userId,
          totalAmount: row.totalAmount,
          createdAt: row.createdAt,
          items: [],
        });
      }
      ordersMap.get(row.orderId)?.items.push({
        id: row.orderItemId,
        productId: row.productId,
        productName: row.productName,
        price: row.price,
        productTrade: row.productTrade,
        productModel: row.productModel,
        productYear: row.productYear,
        productSpecifications: JSON.parse(row.productSpecifications || "[]"),
        productThumb: row.productThumb,
      });
    }

    return Array.from(ordersMap.values());
  }

  private async fetchOrdersSummary(
    whereClause = "",
    params: any[] = [],
    pagination?: PaginationParams
  ): Promise<PaginatedResult<OrderSummaryDTO>> {
    const baseQuery = `
      SELECT 
        o.id AS id,
        o.total_amount AS totalAmount,
        o.created_at AS createdAt
      FROM orders o
      ${whereClause}
      ORDER BY o.created_at DESC
    `;

    return paginate<OrderSummaryDTO>(
      this.connection,
      baseQuery,
      params,
      pagination
    );
  }

  deleteByUserId = async (userId: number) => {
    await this.connection.run(`DELETE FROM orders WHERE user_id = ?`, userId);
  };

  getTotalSalesAmountByMonth = async (): Promise<TotalSalesAmountDTO> => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

    const result = await this.connection.get<any>(
      `SELECT 
        SUM(total_amount) as totalMonthAmount, 
        COUNT(id) as orderCount 
      FROM orders 
      WHERE strftime('%Y-%m', created_at) = ?`,
      `${currentYear}-${currentMonth}`
    );

    if (!result || result.totalMonthAmount === null) {
      return {
        totalMonthAmount: 0,
        orderCount: 0,
      };
    }

    return {
      totalMonthAmount: Number(result.totalMonthAmount) || 0,
      orderCount: Number(result.orderCount) || 0,
    };
  };

  getTopSellingProductByMonth = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

    const result = await this.connection.get<any>(
      `SELECT
        oi.product_id AS productId,
        p.name AS productName,
        p.trade AS productTrade,
        p.model AS productModel,
        COUNT(oi.id) AS totalQuantitySold,
        SUM(oi.price) AS totalAmount
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN products p ON oi.product_id = p.id
      WHERE strftime('%Y-%m', o.created_at) = ?
      GROUP BY oi.product_id, p.name, p.trade, p.model
      ORDER BY totalQuantitySold DESC
      LIMIT 1`,
      `${currentYear}-${currentMonth}`
    );

    if (!result) {
      return null;
    }

    return {
      productId: result.productId,
      productName: result.productName,
      productTrade: result.productTrade,
      productModel: result.productModel,
      totalQuantitySold: Number(result.totalQuantitySold),
      totalAmount: Number(result.totalAmount),
    } as TopSellingProductDTO;
  };

  getSalesReportByMonth = async (): Promise<SalesReportDTO> => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const monthYear = `${currentYear}-${currentMonth}`;

    const ordersResult = await this.connection.all<any[]>(
      `SELECT
          o.id,
          o.user_id AS userId,
          o.total_amount AS totalAmount,
          o.created_at AS createdAt,
          COUNT(oi.id) AS itemCount
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE strftime('%Y-%m', o.created_at) = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC`,
      monthYear
    );

    const totalOrders = ordersResult.length;
    const totalItemsSold = ordersResult.reduce(
      (sum, order) => sum + Number(order.itemCount),
      0
    );
    const totalAmount = ordersResult.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0
    );
    const averageOrderValue = totalOrders > 0 ? totalAmount / totalOrders : 0;

    const orders: SalesReportOrderDTO[] = ordersResult.map((order) => ({
      id: order.id,
      userId: order.userId,
      totalAmount: Number(order.totalAmount),
      createdAt: order.createdAt,
      itemCount: Number(order.itemCount),
    }));

    return {
      period: monthYear,
      totalOrders,
      totalItemsSold,
      averageOrderValue: Number(averageOrderValue.toFixed(2)),
      orders,
    };
  };

  getFinancialReportByMonth = async (): Promise<FinancialReportDTO> => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const monthYear = `${currentYear}-${currentMonth}`;

    const totalsResult = await this.connection.get<any>(
      `SELECT 
          SUM(o.total_amount) as totalAmount,
          COUNT(DISTINCT o.id) as totalOrders
        FROM orders o
        WHERE strftime('%Y-%m', o.created_at) = ?`,
      monthYear
    );

    const totalAmount = Number(totalsResult?.totalAmount) || 0;
    const totalOrders = Number(totalsResult?.totalOrders) || 0;
    const averageOrderValue = totalOrders > 0 ? totalAmount / totalOrders : 0;

    const itemResult = await this.connection.get<any>(
      `SELECT 
        COUNT(oi.id) as totalItems,
        AVG(oi.price) as avgPrice
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE strftime('%Y-%m', o.created_at) = ?`,
      monthYear
    );

    const averageItemPrice = Number(itemResult?.avgPrice) || 0;

    const topProduct = await this.getTopSellingProductByMonth();

    return {
      period: monthYear,
      metrics: {
        totalAmount: Number(totalAmount.toFixed(2)),
        totalOrders,
        averageOrderValue: Number(averageOrderValue.toFixed(2)),
        averageItemPrice: Number(averageItemPrice.toFixed(2)),
        topSellingProduct: topProduct,
      },
    };
  };

  getSuppliersRankingByMonth = async (): Promise<SuppliersRankingDTO> => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const monthYear = `${currentYear}-${currentMonth}`;

    const suppliersResult = await this.connection.all<any[]>(
      `SELECT
        s.id AS supplierId,
        s.name AS supplierName,
        s.email AS supplierEmail,
        COUNT(oi.id) AS totalProductsSold,
        SUM(oi.price) AS totalAmount,
        AVG(oi.price) AS averageOrderValue
      FROM suppliers s
      LEFT JOIN products p ON s.id = p.supplier_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id
      WHERE strftime('%Y-%m', o.created_at) = ? OR (o.id IS NULL)
      GROUP BY s.id, s.name, s.email
      ORDER BY totalAmount DESC`,
      monthYear
    );

    const suppliers = suppliersResult
      .filter((s) => s.totalAmount !== null && s.totalProductsSold > 0)
      .map((s) => ({
        supplierId: s.supplierId,
        supplierName: s.supplierName,
        supplierEmail: s.supplierEmail,
        totalProductsSold: Number(s.totalProductsSold),
        totalAmount: Number(s.totalAmount),
        averageOrderValue: Number(s.averageOrderValue),
      }));

    return {
      period: monthYear,
      suppliers,
    };
  };
}
