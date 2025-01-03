import { TripFactory } from "../factories/miles"
import * as distancesCalculatorService from "../../src/services/distances-calculator-service"
import { calculateMiles } from "../../src/services/miles-calculator-service";
import { faker } from "@faker-js/faker";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("", () => {
  describe("miles calculator", () => {
    it('should return zero miles', () => {
      const miles = calculateMiles(TripFactory(true))
      expect(miles).toBe(0)
    })
    it('should return miles from trip', () => {
      const fakeNumber = faker.number.int()
      jest.spyOn(distancesCalculatorService, "calculateDistance").mockReturnValue(fakeNumber)
      const trip = TripFactory(false)
      const miles = calculateMiles(trip)

      expect(distancesCalculatorService.calculateDistance).toHaveBeenCalled()
      expect(miles).toEqual(expect.any(Number))
    })
  })
})