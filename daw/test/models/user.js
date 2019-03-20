module.exports = (sequelize, DataTypes) => {
  sequelize.define('user', {
    nick: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        isEmail: true,
      },
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
};
