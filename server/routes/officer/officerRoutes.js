const express = require('express');
const router = express.Router();
const { authOfficer, getOfficerDashboardData, getOfficerActiveTasks, getOfficerProfile, updateOfficerProfile, getOfficerWorkHistory, getOfficerAssignedTasks, getTaskById, updateTaskProgress } = require('../../controllers/officer/officerController');
const { protect, authorize } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/uploadMiddleware');

router.post('/login', authOfficer);

router.use(protect, authorize(['officer']));

router.get('/dashboard/stats', getOfficerDashboardData);
router.get('/dashboard/tasks', getOfficerActiveTasks);
router.route('/profile').get(getOfficerProfile).put(updateOfficerProfile);
router.get('/work-history', getOfficerWorkHistory);
router.get('/assigned-tasks', getOfficerAssignedTasks);
router.get('/task/:id', getTaskById);
router.post('/task/:id/progress', upload, updateTaskProgress);

module.exports = router;
