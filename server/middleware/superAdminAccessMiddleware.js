const validateSuperAdminAccess = (req, res, next) => {
  const accessCode = req.headers["x-admin-access-code"];
  const validCode = process.env.SUPERADMIN_ACCESS_CODE;

  if (accessCode !== validCode) {
    return res.status(403).json({
      success: false,
      message: "Invalid access code",
    });
  }

  next();
};

module.exports = { validateSuperAdminAccess };
