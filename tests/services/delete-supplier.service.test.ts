import { NotFoundException } from "../../src/core/error/exceptions/not-found.exception";
import { DeleteSupplierService } from "../../src/services/supplier/delete-supplier.service";
import { SupplierRepository } from "../../src/repository/supplier.repository";
import { makeSupplier } from "../utils/supplier";

describe("DeleteSupplierService", () => {
  it("should delete supplier when exists", async () => {
    const existing = makeSupplier({ id: "20" });

    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(existing),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const service = new DeleteSupplierService(mockRepo as SupplierRepository);

    await expect(service.execute(20)).resolves.toBeUndefined();
    expect(mockRepo.delete).toHaveBeenCalledWith(20);
  });

  it("should throw NotFoundException when supplier does not exist", async () => {
    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const service = new DeleteSupplierService(mockRepo as SupplierRepository);

    await expect(service.execute(999)).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
