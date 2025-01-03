import { generateMilesForTrip, getMilesFromCode } from "../../src/services/miles-service"
import { MilesFactory, TripFactory } from "../factories/miles"
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
      expect(milesRepository.saveMiles).toHaveBeenCalled()
      expect(milesCalculatorService.calculateMiles).toHaveBeenCalled()
      expect(miles).toBe(fakeNumber)
    })

    it('should return conflict error', () => {
      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(MilesFactory())

      const trip = TripFactory()
      const miles = generateMilesForTrip(trip)

      expect(milesRepository.findMiles).toHaveBeenCalled()
      expect(miles).rejects.toEqual({
        type: "conflict",
        message: `Miles already registered for code ${trip.code}`
      })

    })
  })
  describe("GET /miles/:code", () => {
    it('should return miles from code', async () => {
      const fakeMiles = MilesFactory()
      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(fakeMiles)
      const miles = await getMilesFromCode(fakeMiles.code)

      expect(miles).toEqual(fakeMiles)
    })
    it('should return not found error', () => {
      jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null)
      const { code } = MilesFactory()
      const miles = getMilesFromCode(code)

      expect(milesRepository.findMiles).toHaveBeenCalled()
      expect(miles).rejects.toEqual({
        type: "not_found",
        message: `Miles not found for code ${code}`
      })
    })
  })
})