import { generateMilesForTrip } from "../../src/services/miles-service"
import { TripFactory } from "../factories/miles"
import * as milesRepository from "../../src/repositories/miles-repository"
import * as milesCalculatorService from "../../src/services/miles-calculator-service"
import { faker } from "@faker-js/faker"

beforeEach(() => {
  jest.clearAllMocks();
});

describe("", () => {
  describe("POST /miles", () => {
    it('should return miles', async () => {
      const fakeNumber = faker.number.int()
      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null)
      jest.spyOn(milesRepository, "saveMiles").mockResolvedValueOnce(null)
      jest.spyOn(milesCalculatorService, "calculateMiles").mockReturnValue(fakeNumber)

      const trip = TripFactory()
      const miles = await generateMilesForTrip(trip)

      expect(milesRepository.findMiles).toHaveBeenCalled()
      expect(miles).toBe(fakeNumber)
    })

    it('should return conflict error', () => {
      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce({ id: 1, code: "uuid", miles: 1 })

      const trip = TripFactory()
      const miles = generateMilesForTrip(trip)

      expect(miles).rejects.toEqual({
        type: "conflict",
        message: `Miles already registered for code ${trip.code}`
      })

    })
  })
})