import { Request, Response, NextFunction } from "express";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { updateSupplierBodySchema } from "../../../helpers/schemas/supplier.schema";
import { UpdateSupplierService } from "../../../services/supplier";

export class UpdateSupplierController {
  constructor(private readonly updateSupplierService: UpdateSupplierService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);
      const parsedBody = updateSupplierBodySchema.parse(req.body);

      const updatedProduct = await this.updateSupplierService.execute(
        id,
        parsedBody
      );

      return res.status(HttpStatus.OK).send(updatedProduct);
    } catch (error) {
      next(error);
    }
  };
}
