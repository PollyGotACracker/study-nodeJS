import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_buyer",
    {
      b_num: {
        type: Sequelize.DataTypes.STRING(4),
        allowNull: false,
        primaryKey: true,
      },
      b_name: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      b_tel: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: true,
      },
      b_mname: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      b_mtel: {
        type: Sequelize.DataTypes.STRING(13),
        allowNull: true,
      },
      b_addr: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_buyer",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "b_num" }],
        },
      ],
    }
  );
};
