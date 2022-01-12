const { getUsedCars } = require("../../api/usedCarsApi");
const {
  createFilter,
  sortByYearAndPrice,
  filterById,
} = require("./../../utils/dataTransform");
const app = require("../../app");
const mockDataResponse = require("./../data-mocks/response.json");

describe("testing data transformation", () => {
  test("create filter", () => {
    const filter = createFilter(mockDataResponse, "brand");
    expect(filter).toEqual(expect.any(Array));
    //means that the unique on createFilter works
    expect(filter.length).toEqual(3);
  });
  test("sort by year and price", () => {
    const sorted = sortByYearAndPrice(mockDataResponse);
    expect(Number(sorted[0].year.split("/")[0])).toBeGreaterThanOrEqual(
      Number(sorted[1].year.split("/")[0])
    );
    expect(Number(sorted[0].price)).toBeLessThanOrEqual(
      Number(sorted[1].price)
    );
  });
  test("filter by ids", () => {
    const idsExample = [333128];
    const result = filterById(mockDataResponse, idsExample);
    expect(result.length).toEqual(idsExample.length);
    expect(result[0].id).toEqual(idsExample[0]);
  });
});
