import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { SupplierRepository } from "../../repository/supplier.repository";

export class GetSupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  execute = async (id: number) => {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) throw new NotFoundException("Fornecedor não encontrado");

    return supplier;
  };
}
