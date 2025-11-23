import { Request, Response } from "express";
import { GetTotalSalesAmountService } from "../../../services/reports/get-total-sales-amount.service";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetTotalSalesAmountController {
  constructor(
    private readonly getTotalSalesAmountService: GetTotalSalesAmountService
  ) {}

  handle = async (_req: Request, res: Response) => {
    try {
      const result = await this.getTotalSalesAmountService.execute();

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw error;
    }
  };
}
