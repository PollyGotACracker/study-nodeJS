import _tbl_todolist from "./tbl_todolist.js";

function initModels(sequelize) {
  var tbl_todolist = _tbl_todolist(sequelize);

  return {
    tbl_todolist,
  };
}
export default initModels;
