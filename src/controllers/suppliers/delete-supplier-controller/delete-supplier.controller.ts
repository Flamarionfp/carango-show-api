import { NextFunction, Request, Response } from "express";
import { DeleteSupplierService } from "../../../services/supplier";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class DeleteSupplierController {
  constructor(private readonly deleteSupplierService: DeleteSupplierService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);

      await this.deleteSupplierService.execute(id);

      return res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}
