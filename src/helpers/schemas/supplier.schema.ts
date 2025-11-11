import * as z from "zod";

const supplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome não pode ultrapassar 100 caracteres"),
  email: z.email("E-mail inválido").trim().toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s9\d{4}-\d{4}$/, "Telefone inválido")
    .transform((value) => value.replace(/\D/g, "")),
});

export const createSupplierBodySchema = z.object({
  ...supplierSchema.shape,
});

export const updateSupplierBodySchema = supplierSchema.partial();
