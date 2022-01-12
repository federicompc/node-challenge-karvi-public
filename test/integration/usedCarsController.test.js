const request = require("supertest");
const app = require("./../../app");

describe("endpoints tests", () => {
  test(" /cars endpoint test with order by year and price and filters response", async () => {
    const res = await request(app).get("/api/v1/cars?site=br");
    expect(res.status).toBe(200);
    expect(res.body.items[0].id).toBeTruthy();
    expect(res.body.filters.brand).toStrictEqual(expect.any(Array));
    expect(Number(res.body.items[0].year.split("/")[0])).toBeGreaterThanOrEqual(
      Number(res.body.items[1].year.split("/")[0])
    );
    expect(Number(res.body.items[0].price)).toBeLessThanOrEqual(
      Number(res.body.items[1].price)
    );
  });
  test("/cars-by-ids endpoint test response matching ids", async () => {
    const cars = await request(app).get("/api/v1/cars?site=ar");
    const reqIds = `${cars.body.items[0].id},${cars.body.items[1].id},${cars.body.items[2].id}`;
    const testIds = reqIds.split(",");
    const res = await request(app).get(
      `/api/v1/cars-by-ids/?site=ar&ids=${reqIds}`
    );
    expect(res.status).toBe(200);
    expect(res.body.items.length).toEqual(testIds.length);
    expect(res.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: Number(testIds[0]) }),
        expect.objectContaining({ id: Number(testIds[1]) }),
        expect.objectContaining({ id: Number(testIds[2]) }),
      ])
    );
  });
});
