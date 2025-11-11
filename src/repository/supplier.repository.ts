import {
  CreateSupplierDTO,
  SupplierDTO,
  UpdateSupplierDTO,
} from "../dtos/supplier.dto";

export interface SupplierRepository {
  init(): Promise<void>;
  create: (dto: CreateSupplierDTO) => Promise<SupplierDTO>;
  findById: (id: number) => Promise<SupplierDTO | null>;
  findByName: (name: string) => Promise<SupplierDTO | null>;
  findByEmail: (email: string) => Promise<SupplierDTO | null>;
  findAll: () => Promise<SupplierDTO[]>;
  delete: (id: number) => Promise<void>;
  update: (id: number, product: UpdateSupplierDTO) => Promise<SupplierDTO>;
}
