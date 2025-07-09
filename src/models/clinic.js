'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    static associate(models) {}
  }
  Clinic.init(
    {
      address: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Clinic',
    }
  );
  return Clinic;
};
