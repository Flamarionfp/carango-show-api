import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { SupplierRepository } from "../../repository/supplier.repository";

export class DeleteSupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  execute = async (id: number) => {
    const existingSupplier = await this.supplierRepository.findById(id);

    if (!existingSupplier) {
      throw new NotFoundException("Esse fornecedor não existe");
    }

    await this.supplierRepository.delete(id);
  };
}
