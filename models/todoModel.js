const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // 0 = belum selesai, 1 = selesai
  },
}, {
  tableName: 'todos',
  timestamps: true,
});

module.exports = Todo;
