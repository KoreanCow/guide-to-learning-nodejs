/* eslint-disable max-len */
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' }); // 1:N 일 때
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

//      db.User.hasOne(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});                 1:1 일 때 hasMany -> hasOne
//      db.Comment.belongsTo(db.User, { foreingKey: 'commenter', targetKey: 'id'});                 hasOne belongTo 가 바뀌어도 상관없음 -> 1:1이니까

//      db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });       ex) 게시글정보를 담고있는 가상의 Post 모델과 해시태그 정보를 담고있는 가상의 Hashtag모델
//      db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });       N:M 일 때
module.exports = db;
