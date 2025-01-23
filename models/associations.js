const Todo = require('./todoModel');
const Checklist = require('./checklistModel');

// Define the relationship between Todo and Checklist
Todo.hasMany(Checklist, {
  foreignKey: 'todosId',
  as: 'checklists',
});

Checklist.belongsTo(Todo, {
  foreignKey: 'todosId',
  as: 'todo',
});

module.exports = { Todo, Checklist };
