import { createRandomLocation } from "../factories/miles"
import { calculateDistance } from "../../src/services/distances-calculator-service"

beforeEach(() => {
  jest.clearAllMocks();
});

describe("", () => {
  describe("distances", () => {
    it('should return distance', () => {
      const miles = calculateDistance(createRandomLocation(), createRandomLocation())
      expect(miles).toEqual(expect.any(Number))
    })
  })
})