'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ratings.init({
    user_id: DataTypes.STRING,
    company_id: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ratings',
  });
  return Ratings;
};