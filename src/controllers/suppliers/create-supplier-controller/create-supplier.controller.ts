import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { CreateSupplierService } from "../../../services/supplier";
import { createSupplierBodySchema } from "../../../helpers/schemas/supplier.schema";

export class CreateSupplierController {
  constructor(private readonly createSupplierService: CreateSupplierService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = createSupplierBodySchema.parse(req.body);

      const createdSupplier = await this.createSupplierService.execute(
        parsedBody
      );

      return res.status(HttpStatus.CREATED).send(createdSupplier);
    } catch (error) {
      next(error);
    }
  };
}
