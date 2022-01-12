exports.createFilter = (data, prop) => {
  const filter = data.map((el) => el[prop]);
  return [...new Set(filter)];
};

exports.sortByYearAndPrice = (data) =>
  data.sort(
    (a, b) => b.year.split("/")[0] - a.year.split("/")[0] || a.price - b.price
  );

exports.filterById = (data, ids) => {
  return data.filter((el) => ids.find((id) => id == el.id));
};
