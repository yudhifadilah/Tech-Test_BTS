const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleChecklist,
  createChecklist,
} = require('../controllers/todoController');
const authenticateJWT = require('../middlewares/authMiddleware');


// Route untuk membuat tugas baru
router.post('/create', authenticateJWT, createTodo);

// Route untuk mendapatkan semua tugas
router.get('/todosGet', authenticateJWT, getTodos);

// Route untuk memperbarui tugas
router.put('/todos/:id', authenticateJWT, updateTodo);

// Route untuk menghapus tugas
router.delete('/todos/:id', authenticateJWT, deleteTodo);

// Route untuk mengubah status checklist
router.patch('/todos/:id/checklist', authenticateJWT, toggleChecklist);

// Rute untuk membuat checklist baru di dalam todo
router.post('/todos/:todosId/checklists', authenticateJWT, createChecklist);

module.exports = router;
