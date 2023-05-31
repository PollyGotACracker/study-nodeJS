import _tbl_buyer from "./tbl_buyer.js";
import _tbl_products from "./tbl_products.js";
import _tbl_users from "./tbl_users.js";

const initModels = (sequelize) => {
  const tbl_buyer = _tbl_buyer(sequelize);
  const tbl_products = _tbl_products(sequelize);
  const tbl_users = _tbl_users(sequelize);

  return {
    tbl_buyer,
    tbl_products,
    tbl_users,
  };
};
export default initModels;
