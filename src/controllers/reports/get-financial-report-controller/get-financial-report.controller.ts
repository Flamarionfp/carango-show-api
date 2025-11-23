import { Request, Response } from "express";
import { GetFinancialReportService } from "../../../services/reports/get-financial-report.service";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetFinancialReportController {
  constructor(private getFinancialReportService: GetFinancialReportService) {}

  handle = async (_: Request, res: Response) => {
    const report = await this.getFinancialReportService.execute();

    return res.status(HttpStatus.OK).json(report);
  };
}
