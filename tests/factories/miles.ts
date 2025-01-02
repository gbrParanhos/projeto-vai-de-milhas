import { AffiliateStatus, Location, ServiceClass, Trip } from "../../src/protocols";
import { faker } from '@faker-js/faker';

const createRandomLocation = (): Location => ({
  lat: faker.number.float({ min: -90, max: 90, multipleOf: 0.0001 }),
  long: faker.number.float({ min: -180, max: 180, multipleOf: 0.0001 }),
});

export const TripFactory = (): Trip => {
  const serviceValues = Object.values(ServiceClass);
  const affiliateValues = Object.values(AffiliateStatus);

  return {
    code: faker.string.uuid(),
    origin: createRandomLocation(),
    destination: createRandomLocation(),
    miles: faker.datatype.boolean(),
    plane: faker.airline.airplane().name,
    service: faker.helpers.arrayElement(serviceValues),
    affiliate: faker.datatype.boolean() ? faker.helpers.arrayElement(affiliateValues) : undefined,
    date: faker.date.future().toISOString().split('T')[0],
  };
};