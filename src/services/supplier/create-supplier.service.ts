import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { CreateSupplierDTO } from "../../dtos/supplier.dto";
import { SupplierRepository } from "../../repository/supplier.repository";

export class CreateSupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  execute = async (dto: CreateSupplierDTO) => {
    const existingSupplier = await Promise.all([
      this.supplierRepository.findByName(dto.name),
      this.supplierRepository.findByEmail(dto.email),
    ]).then(([byName, byEmail]) => byName || byEmail);

    // if (existingSupplier) {
    //   throw new BadRequestException("Esse fornecedor já existe");
    // }

    const createdSupplier = await this.supplierRepository.create(dto);

    return createdSupplier;
  };
}
