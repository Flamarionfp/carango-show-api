import { Request, Response } from "express";
import { GetSalesReportService } from "../../../services/reports/get-sales-report.service";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetSalesReportController {
  constructor(private getSalesReportService: GetSalesReportService) {}

  handle = async (_: Request, res: Response) => {
    const report = await this.getSalesReportService.execute();

    return res.status(HttpStatus.OK).json(report);
  };
}
