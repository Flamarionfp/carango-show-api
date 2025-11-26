import { id } from "zod/v4/locales/index.cjs";
import { ProductRepository } from "../../repository/product.repository";
import { UpdateProductDTO } from "../../dtos/product.dto";
import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { SupplierRepository } from "../../repository/supplier.repository";

export class UpdateProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly supplierRepository: SupplierRepository
  ) {}

  execute = async (id: number, dto: UpdateProductDTO) => {
    const existingProduct = await this.productRepository.findById(id);

    // if (!existingProduct) {
    //   throw new NotFoundException("Esse produto não existe");
    // }

    if (dto.name && dto.name !== existingProduct.name) {
      const productWithNewName = await this.productRepository.findByName(
        dto.name
      );

      // if (productWithNewName) {
      //   throw new NotFoundException("Já existe um produto com esse nome");
      // }
    }

    if (dto.supplierId !== undefined && dto.supplierId !== null) {
      const supplier = await this.supplierRepository.findById(dto.supplierId);
      if (!supplier) {
        throw new BadRequestException(
          `Fornecedor com ID ${dto.supplierId} não encontrado`
        );
      }
    }

    const updatedProduct = await this.productRepository.update(id, dto);

    return updatedProduct;
  };
}
