import Sequelize from "sequelize";
import database from "../plugins/database.js";

export default database.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // order details
});
