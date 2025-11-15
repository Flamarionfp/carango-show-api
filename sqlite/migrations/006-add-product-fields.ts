import { DatabaseConnection } from "../../src/config/database";

export async function up(db: DatabaseConnection) {
  await db.exec(
    `ALTER TABLE products ADD COLUMN trade TEXT NOT NULL DEFAULT '';`
  );
  await db.exec(
    `ALTER TABLE products ADD COLUMN model TEXT NOT NULL DEFAULT '';`
  );
  await db.exec(
    `ALTER TABLE products ADD COLUMN year DATE NOT NULL DEFAULT '1900-01-01';`
  );
  await db.exec(
    `ALTER TABLE products ADD COLUMN specifications TEXT NOT NULL DEFAULT '[]';`
  );
  await db.exec(
    `ALTER TABLE products ADD COLUMN thumb TEXT NOT NULL DEFAULT '';`
  );
}
