import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { UpdateSupplierDTO } from "../../dtos/supplier.dto";
import { SupplierRepository } from "../../repository/supplier.repository";

export class UpdateSupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  execute = async (id: number, dto: UpdateSupplierDTO) => {
    const existingSupplier = await this.supplierRepository.findById(id);

    if (!existingSupplier) {
      throw new NotFoundException("Esse fornecedor não existe");
    }

    if (dto.name && dto.name !== existingSupplier.name) {
      const supplierWithNewName = await this.supplierRepository.findByName(
        dto.name
      );

      if (supplierWithNewName) {
        throw new NotFoundException("Já existe um fornecedor com esse nome");
      }
    }

    const updatedProduct = await this.supplierRepository.update(id, dto);

    return updatedProduct;
  };
}
