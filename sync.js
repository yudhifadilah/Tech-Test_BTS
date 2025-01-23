const sequelize = require('../config/dbConfig');
const { Todo, Checklist } = require('./associations'); // Import models with associations

sequelize.sync({ force: false })  // Don't use `force: true` unless you're okay with losing data
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((err) => {
    console.error('Sync error:', err);
  });
