import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_todolist",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      s_date: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      s_time: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      t_content: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
      e_date: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      e_time: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_todolist",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
