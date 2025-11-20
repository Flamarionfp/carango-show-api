import { DatabaseConnection } from "../../src/config/database";

export async function up(db: DatabaseConnection) {
  await db.exec(`
    ALTER TABLE products ADD COLUMN supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL;
  `);
}
