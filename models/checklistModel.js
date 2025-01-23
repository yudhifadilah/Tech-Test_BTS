const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Checklist = sequelize.define('Checklist', {
  todosId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'todos', // This should be a valid table
      key: 'id', // This should be a valid column
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // 0 = belum selesai, 1 = selesai
  },
}, {
  tableName: 'checklists',
  timestamps: true,
});

module.exports = Checklist;
