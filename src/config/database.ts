import { createClient } from "@libsql/client";

export interface DatabaseConnection {
  run(sql: string, ...params: any[]): Promise<any>;
  get<T = any>(sql: string, ...params: any[]): Promise<T | undefined>;
  all<T = any>(sql: string, ...params: any[]): Promise<T>;
  exec(sql: string): Promise<void>;
  close(): Promise<void>;
}

export async function connectDatabase(): Promise<DatabaseConnection> {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  return {
    async all(sql, ...params) {
      const flatParams = params.flat();
      const result = await client.execute({ sql, args: flatParams });
      return result.rows as any;
    },

    async get(sql, ...params) {
      const flatParams = params.flat();
      const result = await client.execute({ sql, args: flatParams });
      return result.rows[0] as any;
    },

    async run(sql, ...params) {
      const flatParams = params.flat();
      const result = await client.execute({ sql, args: flatParams });

      return {
        lastID: result.lastInsertRowid,
        changes: result.rowsAffected,
      };
    },

    async exec(sql: string) {
      await client.execute(sql);
    },

    async close() {
      if (typeof (client as any).close === "function") {
        await (client as any).close();
      }
    },
  };
}
