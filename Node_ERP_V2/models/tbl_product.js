import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_product",
    {
      p_code: {
        type: Sequelize.DataTypes.STRING(13),
        allowNull: false,
        primaryKey: true,
      },
      p_title: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      p_main_cat: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      p_mid_cat: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      p_sub_cat: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      p_industry: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      p_buyer: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      p_iprice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      p_tax: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      p_oprice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_product",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "p_code" }],
        },
      ],
    }
  );
};
