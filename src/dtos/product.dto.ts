import { PaginationParams } from "../@types/pagination";

export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  trade: string;
  model: string;
  year: string;
  specifications: string[];
  thumb: string;
  supplierId?: number | null;
}

export type FilterProductsDTO = Partial<Pick<ProductDTO, "name" | "price">>;

export type ProductQueryDTO = FilterProductsDTO & PaginationParams;

export type CreateProductDTO = Omit<ProductDTO, "id">;

export type UpdateProductDTO = Partial<CreateProductDTO>;
