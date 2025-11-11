import { NextFunction, Request, Response } from "express";
import { GetSupplierService } from "../../../services/supplier";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetSupplierController {
  constructor(private readonly getSupplierService: GetSupplierService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);

      const supplier = await this.getSupplierService.execute(id);

      return res.status(HttpStatus.OK).send(supplier);
    } catch (error) {
      next(error);
    }
  };
}
