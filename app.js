const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing body dari request
app.use(express.json()); // Gunakan express.json() untuk parsing JSON

// Gunakan rute yang sudah didefinisikan
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes)

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Jalankan server
app.listen(PORT, async () => {
  try {
    // Tes koneksi ke database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Opsional: Sinkronisasi model ke database
    await sequelize.sync({ alter: true }); // Ubah `alter` sesuai kebutuhan
    console.log('Database synchronized successfully.');

    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
