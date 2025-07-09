/*const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Seating = sequelize.define('Seating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rows: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  columns: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seatData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
 }, {
    tableName: 'seatings',
    //timestamps: false
  });

module.exports = Seating;*/