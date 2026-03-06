const express = require("express");
const router = express.Router();
const {
  registerSuperAdmin,
} = require("../../controllers/superAdmin/superAdminController");
const {
  validateSuperAdminAccess,
} = require("../../middleware/superAdminAccessMiddleware");

router.post("/verify-access", validateSuperAdminAccess, (req, res) => {
  res.json({ success: true, message: "Access code verified" });
});

router.post("/register", validateSuperAdminAccess, registerSuperAdmin);

module.exports = router;
