import { BadRequestException } from "../../src/core/error/exceptions/bad-request.exception";
import { CreateSupplierService } from "../../src/services/supplier/create-supplier.service";
import { CreateSupplierDTO, SupplierDTO } from "../../src/dtos/supplier.dto";
import { SupplierRepository } from "../../src/repository/supplier.repository";
import { makeSupplier } from "../utils/supplier";

describe("CreateSupplierService", () => {
  it("should create supplier when not exists by name or email", async () => {
    const dto: CreateSupplierDTO = {
      name: "Novo Fornecedor",
      email: "novo@fornecedor.com",
      phone: "1234",
    };

    const mockRepo: Partial<SupplierRepository> = {
      findByName: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation(async (d: CreateSupplierDTO) => ({
        id: "100",
        ...d,
      })),
    };

    const service = new CreateSupplierService(mockRepo as SupplierRepository);

    const created = await service.execute(dto);

    expect(created).toMatchObject({ id: "100", ...dto });
    expect(mockRepo.findByName).toHaveBeenCalledWith(dto.name);
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it("should throw BadRequestException when supplier exists by name", async () => {
    const dto: CreateSupplierDTO = {
      name: "Existente",
      email: "novo2@fornecedor.com",
      phone: "1234",
    };

    const existing = makeSupplier({ name: "Existente" });

    const mockRepo: Partial<SupplierRepository> = {
      findByName: jest.fn().mockResolvedValue(existing),
      findByEmail: jest.fn().mockResolvedValue(null),
    };

    const service = new CreateSupplierService(mockRepo as SupplierRepository);

    await expect(service.execute(dto)).rejects.toBeInstanceOf(
      BadRequestException
    );
    expect(mockRepo.findByName).toHaveBeenCalledWith(dto.name);
  });

  it("should throw BadRequestException when supplier exists by email", async () => {
    const dto: CreateSupplierDTO = {
      name: "NovoNome",
      email: "existente@fornecedor.com",
      phone: "1234",
    };

    const existing = makeSupplier({ email: "existente@fornecedor.com" });

    const mockRepo: Partial<SupplierRepository> = {
      findByName: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(existing),
    };

    const service = new CreateSupplierService(mockRepo as SupplierRepository);

    await expect(service.execute(dto)).rejects.toBeInstanceOf(
      BadRequestException
    );
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
  });
});
