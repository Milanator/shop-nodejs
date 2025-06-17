export const successResponse = (res, data = {}, message = undefined) => {
  return res.status(200).json({
    data,
    message,
    error: 0,
  });
};

export const failedResponse = (res, exception = undefined, status = 500) => {
  return res.status(status).json({
    message: exception.message,
    error: 1,
  });
};

export const isEmpty = (a) => {
  switch (a) {
    case undefined:
    case null:
    case []:
    case {}:
      return true;
  }

  return false;
};

export const getStaticUrl = (req, relativePath) =>
  `${req.protocol}://${req.get("host")}${relativePath}`;
