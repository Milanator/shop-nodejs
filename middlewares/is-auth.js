import { failedResponse } from "../utils/common.js";

export default (req, res, next) => {
  if (!req.session.authUser) {
    return failedResponse(res, { message: "Unauthorized" }, 401);
  }

  next();
};
