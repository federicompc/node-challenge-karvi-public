exports.checkParamsSite = (req) => {
  if (!req.query.site || (req.query.site !== "ar" && req.query.site !== "br")) {
    return true;
  }
};
