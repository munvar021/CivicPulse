const generateToken = require('./generateToken');
const User = require('../models/general/User');

const authenticateUser = async (Model, email, password) => {
  const userProfile = await Model.findOne({ email });

  if (!userProfile) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (!(await userProfile.matchPassword(password))) {
    const error = new Error('Password is incorrect');
    error.statusCode = 401;
    throw error;
  }

  let user = await User.findOne({ email: userProfile.email });
  
  if (!user) {
    user = await User.create({ 
      email: userProfile.email, 
      role: userProfile.role 
    });
  }

  const token = generateToken(user._id);

  return { user, token };
};

const setCookieToken = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  authenticateUser,
  setCookieToken,
};
