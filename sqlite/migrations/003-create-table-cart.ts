import { DatabaseConnection } from "../../src/config/database";

export async function up(db: DatabaseConnection) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id), 
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
}
