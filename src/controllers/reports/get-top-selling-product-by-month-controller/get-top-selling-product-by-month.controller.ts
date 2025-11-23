import { Request, Response } from "express";
import { GetTopSellingProductByMonthService } from "../../../services/reports/get-top-selling-product-by-month.service";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetTopSellingProductByMonthController {
  constructor(
    private readonly getTopSellingProductByMonthService: GetTopSellingProductByMonthService
  ) {}

  handle = async (_req: Request, res: Response) => {
    try {
      const result = await this.getTopSellingProductByMonthService.execute();

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw error;
    }
  };
}
