import { SupplierDTO } from "../../src/dtos/supplier.dto";

export const makeSupplier = (
  overrides: Partial<SupplierDTO> = {}
): SupplierDTO => ({
  id: overrides.id ?? "1",
  name: overrides.name ?? "Fornecedor Teste",
  email: overrides.email ?? "teste@fornecedor.com",
  phone: overrides.phone ?? "(54) 99999-9999",
});
