export interface SupplierDTO {
  id: string | number;
  name: string;
  email: string;
  phone: string;
}

export type CreateSupplierDTO = Omit<SupplierDTO, "id">;

export type UpdateSupplierDTO = Partial<CreateSupplierDTO>;
