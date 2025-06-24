import fs from "fs";

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

export const getCurrentUrl = (req) =>
  `${req.protocol}://${req.get("host")}${req.originalUrl}`;

export const getStaticUrl = (req, relativePath) =>
  `${req.protocol}://${req.get("host")}${relativePath}`;

export const getUpdatedUrlParam = (url, key, value) => {
  url = new URL(url);

  url.searchParams.set(key, value);

  return url;
};

export const getUrlParam = (url, key) => {
  url = new URL(url);

  return new URLSearchParams(url.search).get(key);
};

export const deleteFile = (path) => {
  fs.unlink(path, (exception) => {
    if (exception) {
      throw new Error(exception);
    }
  });
};
