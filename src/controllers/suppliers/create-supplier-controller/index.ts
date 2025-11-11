import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { CreateSupplierService } from "../../../services/supplier";
import { CreateSupplierController } from "./create-supplier.controller";

export const makeCreateSupplierController =
  async (): Promise<CreateSupplierController> => {
    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const createSupplierService = new CreateSupplierService(supplierRepository);
    const createSupplierController = new CreateSupplierController(
      createSupplierService
    );

    return createSupplierController;
  };
