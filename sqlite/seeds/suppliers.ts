import { DatabaseConnection } from "../../src/config/database";
import { suppliers } from "./fixtures/suppliers";

export async function createSuppliers(db: DatabaseConnection) {
  for (const supplier of suppliers) {
    await db.run(
      `INSERT INTO suppliers (name, email, phone) VALUES (?, ?, ?)`,
      supplier.name,
      supplier.email,
      supplier.phone
    );
  }

  console.log(`Fornecedores criados com sucesso.`);
}
