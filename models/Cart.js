import Sequelize from "sequelize";
import database from "./../plugins/database.js";

export default database.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
