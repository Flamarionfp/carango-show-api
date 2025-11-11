import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { DeleteSupplierService } from "../../../services/supplier";
import { DeleteSupplierController } from "./delete-supplier.controller";

export const makeDeleteSupplierController =
  async (): Promise<DeleteSupplierController> => {
    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const deleteSupplierService = new DeleteSupplierService(supplierRepository);
    const deleteSupplierController = new DeleteSupplierController(
      deleteSupplierService
    );

    return deleteSupplierController;
  };
