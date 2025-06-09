import Sequilize from "sequelize";

export default new Sequilize("shop-nodejs", "root", "", {
  dialect: "mysql",
  host: "localhost",
});
