const mongoose = require("mongoose");
const ExpressError = require("./ExpressError");

module.exports = function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ExpressError(404, "Page Not Found"));
  }
  next();
};
