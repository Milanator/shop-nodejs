export const successResponse = (res, data = {}, message = undefined) => {
  return res.status(200).json({
    data,
    message,
    error: 0,
  });
};

export const failedResponse = (res, message = undefined, status = 500) => {
  return res.status(200).json({
    message,
    status,
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
