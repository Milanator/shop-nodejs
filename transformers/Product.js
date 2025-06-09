import { isEmpty } from "../utils.js";

class ProductTransformer {
  static format(item) {
    return {
      ...item,
      price: Number(item.price).toFixed(2),
    };
  }

  static get(data) {
    return data.map((item) => this.format(item.dataValues));
  }

  static first(row) {
    return !isEmpty(row?.dataValues) ? this.format(row.dataValues) : undefined;
  }
}

export default ProductTransformer;
