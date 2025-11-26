import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { CreateProductDTO, ProductDTO } from "../../dtos/product.dto";
import { ProductRepository } from "../../repository/product.repository";
import { SupplierRepository } from "../../repository/supplier.repository";

export class CreateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly supplierRepository: SupplierRepository
  ) {}

  execute = async (dto: CreateProductDTO) => {
    const existingProduct = await this.productRepository.findByName(dto.name);

    // if (existingProduct) {
    //   throw new BadRequestException("Esse produto já existe");
    // }

    if (dto.supplierId) {
      const supplier = await this.supplierRepository.findById(dto.supplierId);
      if (!supplier) {
        throw new BadRequestException(
          `Fornecedor com ID ${dto.supplierId} não encontrado`
        );
      }
    }

    const createdProduct = await this.productRepository.create(dto);

    return createdProduct;
  };
}
