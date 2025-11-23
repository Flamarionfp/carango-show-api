import { PaginatedResult, PaginationParams } from "../../@types/pagination";
import { connectDatabase, DatabaseConnection } from "../../config/database";
import {
  CreateOrderDTO,
  OrderDTO,
  OrderSummaryDTO,
  TotalSalesAmountDTO,
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
}
