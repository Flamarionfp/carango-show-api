import { Request, Response } from "express";
import { GetSuppliersRankingService } from "../../../services/reports/get-suppliers-ranking.service";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetSuppliersRankingController {
  constructor(private getSuppliersRankingService: GetSuppliersRankingService) {}

  handle = async (_: Request, res: Response) => {
    const ranking = await this.getSuppliersRankingService.execute();

    return res.status(HttpStatus.OK).json(ranking);
  };
}
