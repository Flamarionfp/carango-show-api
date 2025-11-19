import { fakerPT_BR as faker } from "@faker-js/faker";

export const suppliers = Array.from({ length: 30 }).map((_, i) => ({
  name: faker.vehicle.manufacturer(),
  email: faker.internet.email({ provider: "example.com" }).toLowerCase(),
  phone: "(54) 99999-9999",
}));
