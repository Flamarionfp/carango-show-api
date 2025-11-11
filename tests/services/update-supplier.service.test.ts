import { NotFoundException } from "../../src/core/error/exceptions/not-found.exception";
import { UpdateSupplierService } from "../../src/services/supplier/update-supplier.service";
import { UpdateSupplierDTO } from "../../src/dtos/supplier.dto";
import { SupplierRepository } from "../../src/repository/supplier.repository";
import { makeSupplier } from "../utils/supplier";

describe("UpdateSupplierService", () => {
  it("should update supplier when exists and no name conflict", async () => {
    const existing = makeSupplier({ id: "5", name: "Old Name" });
    const dto: UpdateSupplierDTO = { name: "Old Name", email: "a@b.com" };

    const updated = { ...existing, ...dto };

    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(existing),
      findByName: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(updated),
    };

    const service = new UpdateSupplierService(mockRepo as SupplierRepository);

    const result = await service.execute(5, dto);

    expect(result).toEqual(updated);
    expect(mockRepo.findById).toHaveBeenCalledWith(5);
    expect(mockRepo.update).toHaveBeenCalledWith(5, dto);
  });

  it("should throw NotFoundException when supplier does not exist", async () => {
    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(null),
    };

    const service = new UpdateSupplierService(mockRepo as SupplierRepository);

    await expect(service.execute(123, { name: "X" })).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it("should throw NotFoundException when new name conflicts with other supplier", async () => {
    const existing = makeSupplier({ id: "7", name: "Old" });

    const mockRepo: Partial<SupplierRepository> = {
      findById: jest.fn().mockResolvedValue(existing),
      findByName: jest
        .fn()
        .mockResolvedValue(makeSupplier({ id: "8", name: "NewName" })),
    };

    const service = new UpdateSupplierService(mockRepo as SupplierRepository);

    await expect(
      service.execute(7, { name: "NewName" })
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
