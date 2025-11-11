import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { ListSuppliersService } from "../../../services/supplier";

export class ListSuppliersController {
  constructor(private readonly listSuppliersService: ListSuppliersService) {}

  handle = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const suppliers = await this.listSuppliersService.execute();

      return res.status(HttpStatus.OK).send(suppliers);
    } catch (error) {
      next(error);
    }
  };
}
