const sequelize = require('../config/dbConfig');
const User = require('./userModel');
const Todo = require('./todoModel');
const Checklist = require('./checklistModel');

// Definisikan relasi antar model
User.hasMany(Todo, { foreignKey: 'user_id' });
Todo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Todo.hasMany(Checklist, { foreignKey: 'todosId', as: 'checklists' });
Checklist.belongsTo(Todo, { foreignKey: 'todosId', as: 'todo' });

// Sinkronisasi model dengan database
sequelize
  .sync()  // Avoid force: true, unless you want to reset the tables
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((err) => {
    console.error('Sync error:', err);
  });
module.exports = { User, Todo, Checklist, sequelize };
