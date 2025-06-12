import { failedResponse } from "./../utils.js";

export default (req, res, next) => {
  if (!req.session.authUser) {
    return failedResponse(res, { message: "Authorized" }, 401);
  }

  next();
};
