import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { ListSuppliersService } from "../../../services/supplier";

import { ListSuppliersController } from "./list-suppliers.controller";

export const makeListSupplierController =
  async (): Promise<ListSuppliersController> => {
    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const listSupplierService = new ListSuppliersService(supplierRepository);
    const listSupplierController = new ListSuppliersController(
      listSupplierService
    );

    return listSupplierController;
  };
