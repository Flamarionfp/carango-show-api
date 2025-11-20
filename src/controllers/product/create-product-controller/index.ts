import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { CreateProductService } from "../../../services/product";
import { CreateProductController } from "./create-product.controller";

export const makeCreateProductController =
  async (): Promise<CreateProductController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const createProductService = new CreateProductService(
      productRepository,
      supplierRepository
    );
    const createProductController = new CreateProductController(
      createProductService
    );

    return createProductController;
  };
