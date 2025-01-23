const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    underscored: true,
    timestamps: true
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Error:', err);
  });

module.exports = sequelize;
