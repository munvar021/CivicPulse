const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  logoutUser,
} = require('../../controllers/general/userController');
const { protect, authorize } = require('../../middleware/authMiddleware');

router.post('/logout', logoutUser);

router.use(protect);

router.route('/me').get(getMe).put(updateMe);

router.use(authorize(['superAdmin']));

router.route('/').get(getUsers).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;
