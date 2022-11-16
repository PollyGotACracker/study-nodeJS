import _tbl_buyer from "./tbl_buyer.js";
import _tbl_product from "./tbl_product.js";
import _tbl_users from "./tbl_users.js";

const initModels = (sequelize) => {
  const tbl_buyer = _tbl_buyer(sequelize);
  const tbl_product = _tbl_product(sequelize);
  const tbl_users = _tbl_users(sequelize);

  return {
    tbl_buyer,
    tbl_product,
    tbl_users,
  };
};
export default initModels;
