import { SupplierRepository } from "../../repository/supplier.repository";

export class ListSuppliersService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  execute = async () => {
    const suppliers = await this.supplierRepository.findAll();

    return suppliers;
  };
}
