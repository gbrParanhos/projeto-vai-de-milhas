import { Miles } from "@prisma/client";
import { AffiliateStatus, Location, ServiceClass, Trip } from "../../src/protocols";
import { faker } from '@faker-js/faker';

export const createRandomLocation = (): Location => ({
  lat: faker.number.float({ min: -90, max: 90, multipleOf: 0.0001 }),
  long: faker.number.float({ min: -180, max: 180, multipleOf: 0.0001 }),
});

export const TripFactory = (miles?: boolean): Trip => {
  const serviceValues = Object.values(ServiceClass);
  const affiliateValues = Object.values(AffiliateStatus);

  return {
    code: faker.string.uuid(),
    origin: createRandomLocation(),
    destination: createRandomLocation(),
    miles: miles === null ? faker.datatype.boolean() : miles,
    plane: faker.airline.airplane().name,
    service: faker.helpers.arrayElement(serviceValues),
    affiliate: faker.datatype.boolean() ? faker.helpers.arrayElement(affiliateValues) : undefined,
    date: faker.date.future().toISOString().split('T')[0],
  };
};

export const MilesFactory = (): Miles => ({
  id: faker.number.int({ min: 1, max: 10 }),
  code: faker.string.uuid(),
  miles: faker.number.int()
})