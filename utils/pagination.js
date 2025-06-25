import {
  getCurrentUrl,
  getUpdatedUrlParam,
  getUrlParam,
} from "./../utils/url.js";
import { PER_PAGE } from "./../constants.js";

const getPrevPage = (currentUrl, currentPage) =>
  currentPage < 2
    ? null
    : getUpdatedUrlParam(currentUrl, "page", currentPage - 1);

const getNextPage = (currentUrl, currentPage, count, perPage) =>
  perPage * currentPage >= count
    ? null
    : getUpdatedUrlParam(currentUrl, "page", currentPage + 1);

export const getPaginationParams = (req) => {
  const per_page = req.query.per_page || PER_PAGE;

  return {
    per_page,
    offset: (req.query.page - 1) * per_page || 0,
  };
};

export const getPagination = (req, items, count, perPage) => {
  const current_url = getCurrentUrl(req);
  const current_page = Number(getUrlParam(current_url, "page") || 1);

  return {
    items,
    pagination: {
      count,
      current_page,
      current_url,
      page_count: Math.ceil(count / perPage),
      prev_page: getPrevPage(current_url, current_page),
      next_page: getNextPage(current_url, current_page, count, perPage),
    },
  };
};
