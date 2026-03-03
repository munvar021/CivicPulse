const asyncHandler = require('express-async-handler');
const User = require('../../models/general/User');
const Admin = require('../../models/admin/Admin');
const Citizen = require('../../models/citizen/Citizen');
const Officer = require('../../models/officer/Officer');
const SuperAdmin = require('../../models/superAdmin/SuperAdmin');
const { validateUniqueFields } = require('../../utils/validationHelper');
const { syncUserEmail, ensureUserExists, deleteUserByEmail } = require('../../utils/userHelper');

const getModelForRole = (role) => {
  const models = {
    admin: Admin,
    officer: Officer,
    citizen: Citizen,
    superAdmin: SuperAdmin,
  };
  return models[role] || null;
};

const getMe = asyncHandler(async (req, res) => {
  const Model = getModelForRole(req.user.role);
  if (!Model) {
    res.status(400);
    throw new Error('Invalid role');
  }
  
  let userData = await Model.findOne({ email: req.user.email }).select('-password').lean();
  
  if (!userData) {
    res.status(404);
    throw new Error('User not found');
  }
  
  if (req.user.role === 'admin' || req.user.role === 'officer') {
    userData = await Model.findOne({ email: req.user.email })
      .select('-password')
      .populate('department', 'name')
      .lean();
  }
  
  if (req.user.role === 'admin') {
    userData = await Model.findOne({ email: req.user.email })
      .select('-password')
      .populate('department', 'name')
      .populate('zone', 'name')
      .lean();
  }
  
  res.json(userData);
});

const updateMe = asyncHandler(async (req, res) => {
  const Model = getModelForRole(req.user.role);
  if (!Model) {
    res.status(400);
    throw new Error('Invalid role');
  }
  
  const userData = await Model.findOne({ email: req.user.email });
  if (!userData) {
    res.status(404);
    throw new Error('User not found');
  }

  const updateData = {};
  if (req.body.email && req.body.email !== userData.email) {
    await validateUniqueFields(Model, { email: req.body.email }, userData._id);
    updateData.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== userData.phone) {
    await validateUniqueFields(Model, { phone: req.body.phone }, userData._id);
    updateData.phone = req.body.phone;
  }

  const oldEmail = userData.email;
  userData.name = req.body.name || userData.name;
  userData.phone = updateData.phone || userData.phone;
  userData.email = updateData.email || userData.email;
  
  if (req.body.password) {
    userData.password = req.body.password;
  }
  
  await userData.save();
  
  if (updateData.email) {
    await syncUserEmail(oldEmail, updateData.email, req.user.role);
  } else {
    await ensureUserExists(oldEmail, req.user.role);
  }
  
  let result = await Model.findById(userData._id).select('-password').lean();
  
  if (req.user.role === 'admin' || req.user.role === 'officer') {
    result = await Model.findById(userData._id)
      .select('-password')
      .populate('department', 'name')
      .lean();
  }
  
  if (req.user.role === 'admin') {
    result = await Model.findById(userData._id)
      .select('-password')
      .populate('department', 'name')
      .populate('zone', 'name')
      .lean();
  }
  
  res.json(result);
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: 'Logged out successfully' });
});

const getUsers = asyncHandler(async (req, res) => {
  const { role, department } = req.query;
  const targetRole = role || 'citizen';

  const Model = getModelForRole(targetRole);
  if (!Model) {
    res.status(400);
    throw new Error('Invalid role specified');
  }

  let query = {};
  if ((targetRole === 'admin' || targetRole === 'officer') && department && department !== 'all') {
    query.department = department;
  }

  let results = await Model.find(query).sort({ createdAt: -1 }).lean();
  
  if (targetRole === 'admin' || targetRole === 'officer') {
    results = await Model.find(query).populate('department', 'name').sort({ createdAt: -1 }).lean();
  }
  
  if (targetRole === 'admin') {
    results = await Model.find(query)
      .populate('department', 'name')
      .populate('zone', 'name')
      .sort({ createdAt: -1 })
      .lean();
  }

  res.json(results);
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, department, zone } = req.body;
  const Model = getModelForRole(role);

  if (!Model) {
    res.status(400);
    throw new Error('Invalid role');
  }

  if ((role === 'admin' || role === 'officer') && !department) {
    res.status(400);
    throw new Error('Department is required for admins and officers');
  }

  await validateUniqueFields(Model, { email, phone });

  const createData = { name, email, password, phone, role, department };
  if (role === 'admin' && zone) {
    createData.zone = zone;
  }
  
  const [detailedUser] = await Promise.all([
    Model.create(createData),
    User.create({ email, role })
  ]);

  res.status(201).json(detailedUser);
});

const updateUser = asyncHandler(async (req, res) => {
  const { role: newRole, department, zone, name, email, phone, password } = req.body;

  const models = [Admin, Citizen, Officer];
  let oldUserData, oldRole;

  for (const Model of models) {
    oldUserData = await Model.findById(req.params.id);
    if (oldUserData) {
      oldRole = oldUserData.role;
      break;
    }
  }

  if (!oldUserData) {
    res.status(404);
    throw new Error('User not found in any role collection');
  }

  const Model = getModelForRole(oldRole);

  const updateData = {};
  if (email && email !== oldUserData.email) {
    await validateUniqueFields(Model, { email }, oldUserData._id);
    updateData.email = email;
  }
  if (phone && phone !== oldUserData.phone) {
    await validateUniqueFields(Model, { phone }, oldUserData._id);
    updateData.phone = phone;
  }

  await ensureUserExists(oldUserData.email, oldRole);

  if (newRole && oldRole !== newRole) {
    const NewModel = getModelForRole(newRole);
    if (!NewModel) {
      res.status(400);
      throw new Error('Invalid new role');
    }

    const createData = {
      name: name || oldUserData.name,
      email: email || oldUserData.email,
      phone: phone || oldUserData.phone,
      password: password,
      role: newRole,
    };

    if (newRole === 'admin' || newRole === 'officer') {
      createData.department = department || oldUserData.department;
    }
    if (newRole === 'admin' && zone) {
      createData.zone = zone;
    }

    await Promise.all([
      NewModel.create(createData),
      oldUserData.deleteOne(),
      User.findOneAndUpdate(
        { email: oldUserData.email },
        { role: newRole, email: email || oldUserData.email }
      )
    ]);

    let newUser = await NewModel.findOne({ email: email || oldUserData.email }).lean();
    
    if (newRole === 'admin' || newRole === 'officer') {
      newUser = await NewModel.findOne({ email: email || oldUserData.email })
        .populate('department', 'name')
        .lean();
    }
    if (newRole === 'admin') {
      newUser = await NewModel.findOne({ email: email || oldUserData.email })
        .populate('department', 'name')
        .populate('zone', 'name')
        .lean();
    }
    
    res.json(newUser);
  } else {
    const oldEmail = oldUserData.email;
    oldUserData.name = name || oldUserData.name;
    oldUserData.email = updateData.email || oldUserData.email;
    oldUserData.phone = updateData.phone || oldUserData.phone;
    
    if (password) {
      oldUserData.password = password;
    }
    if ((oldRole === 'admin' || oldRole === 'officer') && department) {
      oldUserData.department = department;
    }
    if (oldRole === 'admin') {
      oldUserData.zone = zone || null;
    }
    
    await oldUserData.save();
    
    if (updateData.email) {
      await syncUserEmail(oldEmail, updateData.email, oldRole);
    }
    
    let updatedUser = await Model.findById(oldUserData._id).lean();
    
    if (oldRole === 'admin' || oldRole === 'officer') {
      updatedUser = await Model.findById(oldUserData._id)
        .populate('department', 'name')
        .lean();
    }
    if (oldRole === 'admin') {
      updatedUser = await Model.findById(oldUserData._id)
        .populate('department', 'name')
        .populate('zone', 'name')
        .lean();
    }
    
    res.json(updatedUser);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const models = [Admin, Citizen, Officer];
  let userToDelete, userEmail;

  for (const Model of models) {
    userToDelete = await Model.findById(req.params.id);
    if (userToDelete) {
      userEmail = userToDelete.email;
      break;
    }
  }
  
  if (!userToDelete) {
    res.status(404);
    throw new Error('User not found in any role collection');
  }

  await Promise.all([
    deleteUserByEmail(userEmail),
    userToDelete.deleteOne()
  ]);
  
  res.json({ message: 'User removed' });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  logoutUser,
};
