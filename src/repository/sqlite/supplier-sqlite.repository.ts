import { connectDatabase, DatabaseConnection } from "../../config/database";
import {
  CreateSupplierDTO,
  SupplierDTO,
  UpdateSupplierDTO,
} from "../../dtos/supplier.dto";
import { SupplierRepository } from "../supplier.repository";

export class SupplierSqliteRepository implements SupplierRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  create = async (dto: CreateSupplierDTO) => {
    const result = await this.connection.run(
      `INSERT INTO suppliers (name, email, phone) VALUES (?, ?, ?)`,
      dto.name,
      dto.email,
      dto.phone
    );

    const supplier: SupplierDTO = {
      id: result.lastID!,
      ...dto,
    };

    return supplier;
  };

  findAll = async () => {
    const rows = await this.connection.all<SupplierDTO[]>(
      `SELECT id, name, email, phone FROM suppliers`
    );

    return rows;
  };

  findById = async (id: number) => {
    const row = await this.connection.get<SupplierDTO>(
      `SELECT id, name, email, phone FROM suppliers WHERE id = ?`,
      id
    );

    return row ?? null;
  };

  findByEmail = async (email: string) => {
    const row = await this.connection.get<SupplierDTO>(
      `SELECT id, name, email, phone FROM suppliers WHERE email = ?`,
      email
    );

    return row ?? null;
  };

  findByName = async (name: string) => {
    const row = await this.connection.get<SupplierDTO>(
      `SELECT id, name, email, phone FROM suppliers WHERE name = ?`,
      name
    );

    return row ?? null;
  };

  delete = async (id: number) => {
    await this.connection.run(`DELETE FROM suppliers WHERE id = ?`, id);
  };

  update = async (id: number, product: UpdateSupplierDTO) => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (product.name !== undefined) {
      fieldsToUpdate.push("name = ?");
      values.push(product.name);
    }
    if (product.email !== undefined) {
      fieldsToUpdate.push("email = ?");
      values.push(product.email);
    }
    if (product.phone !== undefined) {
      fieldsToUpdate.push("phone = ?");
      values.push(product.phone);
    }

    if (fieldsToUpdate.length === 0) {
      const existingSupplier = await this.findById(id);
      if (!existingSupplier) {
        throw new Error("Supplier not found");
      }
      return existingSupplier;
    }

    values.push(id);

    const query = `UPDATE suppliers SET ${fieldsToUpdate.join(
      ", "
    )} WHERE id = ?`;

    await this.connection.run(query, ...values);

    const updatedSupplier = await this.findById(id);

    return updatedSupplier!;
  };
}
