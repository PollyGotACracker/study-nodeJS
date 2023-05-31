import _tbl_buyer from "./sample_model.js";
const initModels = (sequelize) => {
  const tbl_buyer = _tbl_buyer(sequelize);

  return {
    tbl_buyer,
  };
};

export default initModels;
