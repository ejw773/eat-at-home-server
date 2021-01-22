'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saved_Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Saved_Companies.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete:'CASCADE'
      });
    }
  };
  Saved_Companies.init({
    user_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Saved_Companies',
  });
  return Saved_Companies;
};