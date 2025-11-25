import { DatabaseConnection } from "../../src/config/database";
import { products } from "./fixtures/products";

export async function createProducts(db: DatabaseConnection) {
  const supplierRows = await db.all<any[]>(`SELECT id FROM suppliers`);
  const supplierIds = supplierRows.map((r) => r.id).filter((id) => !!id);

  for (const product of products) {
    const supplierId =
      supplierIds.length > 0
        ? supplierIds[Math.floor(Math.random() * supplierIds.length)]
        : null;

    await db.run(
      `INSERT INTO products (name, price, trade, model, year, specifications, thumb, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      product.name,
      product.price,
      product.trade,
      product.model,
      product.year,
      JSON.stringify(product.specifications),
      product.thumb,
      supplierId
    );
  }

  console.log(`Produtos criados com sucesso.`);
}

// TODO: Descomentar caso queira usar essa versão parar gerar dinãmicamente com faker (sem as fotos adequadas)
// import { fakerPT_BR as faker } from "@faker-js/faker";
// import { DatabaseConnection } from "../../src/config/database";

// export async function createProducts(db: DatabaseConnection, quantity = 100) {
//   const products = [];

//   for (let i = 0; i < quantity; i++) {
//     const trade = faker.vehicle.manufacturer();
//     const model = faker.vehicle.model();
//     const name = `${trade} ${model}`;
//     const price = faker.number.int({ min: 50, max: 300 });
//     const year = faker.date.between({ from: "2010-01-01", to: "2024-12-31" });
//     const specifications = faker.helpers.arrayElements(
//       [
//         "Manual",
//         "Automático",
//         "Flex",
//         "Gasolina",
//         "Ar-condicionado",
//         "Direção hidráulica",
//         "Vidros elétricos",
//         "Airbag",
//         "ABS",
//       ],
//       { min: 3, max: 6 }
//     );
//     const thumb = `${process.env.BUCKET_PUBLIC_URL}/${faker.vehicle
//       .type()
//       .toLowerCase()}.jpg`;

//     products.push({
//       name,
//       price,
//       trade,
//       model,
//       year: year.toISOString().split("T")[0],
//       specifications,
//       thumb,
//     });
//   }

//   for (const product of products) {
//     await db.run(
//       `INSERT INTO products (name, price, trade, model, year, specifications, thumb)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       product.name,
//       product.price,
//       product.trade,
//       product.model,
//       product.year,
//       JSON.stringify(product.specifications),
//       product.thumb
//     );
//   }

//   console.log(`${quantity} produtos criados com sucesso.`);
// }
