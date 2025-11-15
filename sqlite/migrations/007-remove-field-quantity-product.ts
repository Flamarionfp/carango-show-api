import { DatabaseConnection } from "../../src/config/database";

export async function up(db: DatabaseConnection) {
  if (process.env.NODE_ENV !== "production") return Promise.resolve();

  await db.exec(`ALTER TABLE products DROP COLUMN quantity;`);
}
