const express = require('express');
const router = express.Router();
const { registerUser, loginUser, viewAllReports, updateReportStatus } = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Mendaftar sebagai User
router.post('/register', registerUser);

// Login sebagai User
router.post('/login', loginUser);

// Melihat semua laporan (Hanya bisa diakses oleh admin)
router.get('/reports', authenticateJWT, viewAllReports);

// Mengubah status laporan (Hanya bisa diakses oleh admin)
router.put('/reports/status', authenticateJWT, updateReportStatus);

module.exports = router;
