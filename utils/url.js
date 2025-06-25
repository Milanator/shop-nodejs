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
