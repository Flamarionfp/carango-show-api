export async function up(db: import("sqlite").Database) {
  await db.exec(`
    CREATE TABLE suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,          
      email TEXT,                  
      phone TEXT,                 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
