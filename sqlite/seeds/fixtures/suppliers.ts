import { fakerPT_BR as faker } from "@faker-js/faker";

export const suppliers = Array.from({ length: 20 }).map((_, i) => ({
  name: faker.vehicle.manufacturer(),
  email: faker.internet.email({ provider: "example.com" }).toLowerCase(),
  phone: faker.phone.number({ style: "national" }),
}));
