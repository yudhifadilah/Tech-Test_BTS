const { Todo, Checklist } = require('../models');

// Membuat tugas baru
const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Validasi input
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    // Membuat tugas baru di database
    const newTodo = await Todo.create({
      title,
      description,
      status: 0, // Status default (0 = belum selesai, 1 = selesai)
    });

    res.status(201).json({
      message: 'Todo created successfully!',
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Melihat semua tugas
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      attributes: ['id', 'title', 'description', 'status'], // Pilih atribut spesifik
      include: [
        {
          model: Checklist,
          as: 'checklists',
          attributes: ['id', 'title', 'todosId'], // Pilih atribut spesifik
        },
      ],
      order: [['id', 'ASC']], // Urutkan hasil berdasarkan ID Todo
    });

    res.status(200).json({
      message: 'Todos fetched successfully!',
      todos,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

// Memperbarui tugas
const updateTodo = async (req, res) => {
  const { id } = req.params; // ID tugas yang akan diperbarui
  const { title, description, status } = req.body;

  try {
    // Mencari tugas berdasarkan ID
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Memperbarui tugas
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.status = status !== undefined ? status : todo.status;
    await todo.save();

    res.status(200).json({
      message: 'Todo updated successfully!',
      todo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Menghapus tugas
const deleteTodo = async (req, res) => {
  const { id } = req.params; // ID tugas yang akan dihapus

  try {
    // Mencari tugas berdasarkan ID
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Menghapus tugas
    await todo.destroy();

    res.status(200).json({ message: 'Todo deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};

// Mengubah status checklist
const toggleChecklist = async (req, res) => {
  const { id } = req.params; // ID tugas yang akan diubah

  try {
    // Mencari tugas berdasarkan ID
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Mengubah status checklist (0 -> 1, 1 -> 0)
    todo.status = todo.status === 0 ? 1 : 0;
    await todo.save();

    res.status(200).json({
      message: 'Checklist status updated successfully!',
      todo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling checklist status', error: error.message });
  }
};

// Membuat checklist baru di dalam todo
const createChecklist = async (req, res) => {
  const { todosId } = req.params; // ID todo
  const { title } = req.body;

  try {
    // Validasi input
    if (!title) {
      return res.status(400).json({ message: 'Checklist title is required.' });
    }

    // Periksa apakah todo dengan ID diberikan ada
    const todo = await Todo.findByPk(todosId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Membuat checklist baru
    const newChecklist = await Checklist.create({
      todosId,
      title,
    });

    res.status(201).json({
      message: 'Checklist created successfully!',
      checklist: newChecklist,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating checklist', error: error.message });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo, toggleChecklist, createChecklist };
