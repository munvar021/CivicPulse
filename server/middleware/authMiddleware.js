const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/general/User");
const Admin = require("../models/admin/Admin");
const SuperAdmin = require("../models/superAdmin/SuperAdmin");
const Citizen = require("../models/citizen/Citizen");
const Officer = require("../models/officer/Officer");

const roleModels = {
  admin: Admin,
  superAdmin: SuperAdmin,
  citizen: Citizen,
  officer: Officer,
};

const protect = asyncHandler(async (req, res, next) => {
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  const token = bearerToken || cookieToken;

  if (!token) {
    res.status(401);
    throw new Error("Access denied. Please login to continue");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const genericUser = await User.findById(decoded.id)
      .select("-password")
      .lean();

    if (!genericUser) {
      res.status(401);
      throw new Error("User not found. Please login again");
    }

    const Model = roleModels[genericUser.role];
    if (!Model) {
      res.status(401);
      throw new Error("Invalid user role");
    }

    let query = Model.findOne({ email: genericUser.email });

    if (genericUser.role === "admin") {
      query = query.populate("department", "name").populate("zone", "name");
    } else if (genericUser.role === "officer") {
      query = query.populate("department", "name");
    }

    const specificUser = await query.lean();

    if (!specificUser) {
      res.status(401);
      throw new Error("User profile not found. Please contact administrator");
    }

    req.user = { ...genericUser, ...specificUser };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401);
      throw new Error("Invalid token. Please login again");
    }
    if (error.name === "TokenExpiredError") {
      res.status(401);
      throw new Error("Session expired. Please login again");
    }
    throw error;
  }
});

const authorize = (roles = []) => {
  const roleArray = typeof roles === "string" ? [roles] : roles;

  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Access denied. Please login to continue");
    }

    if (roleArray.length && !roleArray.includes(req.user.role)) {
      res.status(403);
      throw new Error("You do not have permission to access this resource");
    }
    next();
  };
};

module.exports = { protect, authorize };
