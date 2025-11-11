import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { UpdateSupplierService } from "../../../services/supplier";
import { UpdateSupplierController } from "./update-supplier.controller";

export const makeUpdateSupplierController =
  async (): Promise<UpdateSupplierController> => {
    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const updateSupplierService = new UpdateSupplierService(supplierRepository);
    const updateSupplierController = new UpdateSupplierController(
      updateSupplierService
    );

    return updateSupplierController;
  };
