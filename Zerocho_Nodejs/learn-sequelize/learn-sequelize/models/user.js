// eslint-disable-next-line arrow-body-style
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(20), // VARCHAR -> STRING
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED, // INT -> INTEGER;
      allowNull: false,
    },
    married: {
      type: DataTypes.BOOLEAN, // TINYINT -> BOOLEAN
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE, // DATETIME -> DATE
      allowNull: false, // NOT NULL -> allowNull
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });
};

//          VARCHAR -> STRING
//          INT     -> INTEGER
//          TINYINT -> BOOLEAN
//          DATETIME-> DATE
//          allowNull -> NOT NULL      unique -> UNIQUE        DataTypes.NOW -> now()
//          timestamps: true -> createdAt, updatedAt 컬럼 추가      But 지금은 created_at을 직접만들어서 false로 지정
//          실무에서는 timestamps: true, paranoid: true를 자주 사용


// module.exports = (sequelize, DataTypes) => sequelize.define('user', {
//   name: {
//     type: DataTypes.STRING(20), // VARCHAR -> STRING
//     allowNull: false,
//     unique: true,
//   },
//   age: {
//     type: DataTypes.INTEGER.UNSIGNED, // INT -> INTEGER;
//     allowNull: false,
//   },
//   married: {
//     type: DataTypes.BOOLEAN, // TINYINT -> BOOLEAN
//     allowNull: false,
//   },
//   comment: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   created_at: {
//     type: DataTypes.DATE, // DATETIME -> DATE
//     allowNull: false, // NOT NULL -> allowNull
//     defaultValue: sequelize.literal('now()'),
//   },
// }, {
//   timestamps: false,
// });
