'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Saved_Companies, {
        foreignKey: 'user_id'
      });
    }
  };
  User.init({
    userName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    github_login: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
