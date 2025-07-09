'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    static associate(models) {}
  }
  Allcode.init(
    {
      key: DataTypes.STRING,
      type: DataTypes.STRING,
      valuEN: DataTypes.STRING,
      valueVI: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Allcode',
    }
  );
  return Allcode;
};
