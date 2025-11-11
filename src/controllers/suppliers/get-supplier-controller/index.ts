import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { GetSupplierService } from "../../../services/supplier";
import { GetSupplierController } from "./get-supplier.controller";

export const makeGetSupplierController =
  async (): Promise<GetSupplierController> => {
    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const getSupplierService = new GetSupplierService(supplierRepository);
    const getSupplierController = new GetSupplierController(getSupplierService);

    return getSupplierController;
  };
