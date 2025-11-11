import { NotFoundException } from "../../src/core/error/exceptions/not-found.exception";
import { GetSupplierService } from "../../src/services/supplier/get-supplier.service";
import { SupplierRepository } from "../../src/repository/supplier.repository";
import { makeSupplier } from "../utils/supplier";

describe("GetSupplierService", () => {
  it("should return supplier when found", async () => {
    const supplier = makeSupplier({ id: "10" });

    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(supplier),
    };

    const service = new GetSupplierService(mockRepo as SupplierRepository);

    const result = await service.execute(10);

    expect(result).toEqual(supplier);
    expect(mockRepo.findById).toHaveBeenCalledWith(10);
  });

  it("should throw NotFoundException when not found", async () => {
    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const service = new GetSupplierService(mockRepo as SupplierRepository);

    await expect(service.execute(999)).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
