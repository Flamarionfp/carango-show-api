import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { SupplierSqliteRepository } from "../../../repository/sqlite/supplier-sqlite.repository";
import { UpdateProductService } from "../../../services/product";
import { UpdateProductController } from "./update-product.controller";

export const makeUpdateProductController =
  async (): Promise<UpdateProductController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const supplierRepository = new SupplierSqliteRepository();
    await supplierRepository.init();

    const updateProductService = new UpdateProductService(
      productRepository,
      supplierRepository
    );
    const updateProductController = new UpdateProductController(
      updateProductService
    );

    return updateProductController;
  };
