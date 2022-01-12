const { getUsedCars } = require("./../api/usedCarsApi");
const catchAsync = require("./../utils/catchasync");
const {
  createFilter,
  sortByYearAndPrice,
  filterById,
} = require("../utils/dataTransform");
const AppError = require("./../utils/error");
const { checkParamsSite } = require("./../utils/commons");

exports.getCars = catchAsync(async (req, res, next) => {
  if (checkParamsSite(req)) {
    return next(new AppError("not supported country", 400));
  }
  const cars = await getUsedCars(req.query.site);
  if (!cars.data) {
    return next(new AppError("Something went wrong", 500));
  }
  const city = createFilter(cars.data, "city");
  const state = createFilter(cars.data, "state");
  const brand = createFilter(cars.data, "brand");
  const model = createFilter(cars.data, "model");
  const sortable = sortByYearAndPrice(cars.data);
  res.status(200).json({
    items: sortable,
    filters: {
      city,
      state,
      brand,
      model,
    },
  });
});
exports.getCarsByIds = catchAsync(async (req, res, next) => {
  if (checkParamsSite(req)) {
    return next(new AppError("not supported country", 400));
  }
  if (!req.query.ids) {
    return next(new AppError("You missed the ids", 400));
  }
  const cars = await getUsedCars(req.query.site);
  if (!cars.data) {
    return next(new AppError("Something went wrong", 500));
  }
  const ids = req.query.ids.split(",");
  const filtered = await filterById(cars.data, ids);

  res.status(200).json({
    items: filtered,
  });
});
