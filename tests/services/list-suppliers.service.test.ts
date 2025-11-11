import { ListSuppliersService } from "../../src/services/supplier/list-suppliers.service";
import { SupplierRepository } from "../../src/repository/supplier.repository";
import { makeSupplier } from "../utils/supplier";

describe("ListSuppliersService", () => {
  it("should return all suppliers", async () => {
    const suppliers = [makeSupplier({ id: "1" }), makeSupplier({ id: "2" })];

    const mockRepo: Partial<SupplierRepository> = {
      findAll: jest.fn().mockResolvedValue(suppliers),
    };

    const service = new ListSuppliersService(mockRepo as SupplierRepository);

    const result = await service.execute();

    expect(result).toEqual(suppliers);
  });

  it("should return empty array when none", async () => {
    const mockRepo: Partial<SupplierRepository> = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const service = new ListSuppliersService(mockRepo as SupplierRepository);

    const result = await service.execute();

    expect(result).toEqual([]);
  });
});
