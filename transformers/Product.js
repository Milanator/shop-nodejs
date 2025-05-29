import { isEmpty } from "../utils.js";

class ProductTransformer {
  format(item) {
    return {
      ...item,
      price: Number(item.price).toFixed(2),
    };
  }

  get(data) {
    return data.map((item) => this.format(item));
  }

  first(rows) {
    return !isEmpty(rows) ? this.format(rows[0]) : undefined;
  }
}

export default ProductTransformer;
