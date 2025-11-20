import * as z from "zod";
import "dotenv/config";
import { paginationSchema } from "./pagination.schema";

const productSchema = z.object({
  name: z.string().trim(),
  price: z.coerce.number().min(1),
  trade: z.string().trim(),
  model: z.string().trim(),
  specifications: z.array(z.string()),
  thumb: z
    .url()
    .optional()
    .default(`${process.env.BUCKET_PUBLIC_URL}/default.webp`),
  year: z
    .union([
      z.string().regex(/^(\d{4}-\d{2}-\d{2})$/, { message: "Data inválida" }),
      z.date(),
    ])
    .transform((val) => {
      if (val instanceof Date) {
        return val.toISOString().split("T")[0];
      }

      return val;
    }),
    supplierId: z
      .union([z.number().int().positive(), z.null()])
      .optional()
      .describe("ID do fornecedor associado ao produto"),
});

export const createProductBodySchema = z.object({
  ...productSchema.shape,
});

export const productsQuerySchema = productSchema.partial().extend({
  ...paginationSchema.shape,
});

export const updateProductBodySchema = productSchema.partial();
