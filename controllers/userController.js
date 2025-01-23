const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Mendaftar sebagai user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login sebagai user dan mendapatkan token JWT
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: 'user' }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Authentication successful!', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


module.exports = { registerUser, loginUser};
