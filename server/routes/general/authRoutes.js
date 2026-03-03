const express = require('express');
const router = express.Router();
const {
  registerCitizen,
  loginCitizen,
} = require('../../controllers/citizen/citizenController');
const { registerSuperAdmin } = require('../../controllers/superAdmin/superAdminController');

router.post('/register', registerCitizen);
router.post('/login', loginCitizen);
router.post('/superadmin/register', registerSuperAdmin);

module.exports = router;