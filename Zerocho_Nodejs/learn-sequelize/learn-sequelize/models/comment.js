module.exports = (sequelize, DataTypes) => sequelize.define('comment', {
  comment: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.literal('now()'),
  },
}, {
  timestamps: false,
});


//    화살표함수는 {}를 안쓰면 암묵적으로 return 해줌
// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define('comment', {
//     comment: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       defaultValue: sequelize.literal('now()'),
//     },
//   }, {
//     timestamps: false,
//   });
// };
