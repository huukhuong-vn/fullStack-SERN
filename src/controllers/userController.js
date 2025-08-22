import userService from '../services/userService';
let handleLogin = async (req, res) => {
  let { email, password } = req.body;

  // Here you would typically check the credentials against a database
  if (!email || !password) {
    return res
      .status(500)
      .json({ errCode: 1, message: 'Email and password are required' });
  }
  let userData = await userService.handleLogin(email, password);
  if (userData.success === false) {
    return res.status(500).json({
      errCode: userData.errCode,
      message: userData.message,
    });
  }
  return res.status(200).json({
    errCode: 0,
    success: true,
    message: userData.message,
    user: userData.user || {},
  });
  // In a real application, you would hash the password and compare it with the stored hash
};
let getAllUsers = async (req, res) => {
  let id = req.query.id; // Assuming you pass the user ID
  try {
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
      errCode: 0,
      message: 'OK',
      users: users || [],
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      errCode: 1,
      message: 'Error fetching users',
    });
  }
};

let createNewUser = async (req, res) => {
  let data = req.body;
  try {
    let response = await userService.createNewUsser(data);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error creating new user:', error);
    return res.status(500).json({
      errCode: 1,
      message: 'Error creating new user',
    });
  }
};
let updateUser = async (req, res) => {
  let data = req.body;
  try {
    let response = await userService.updateUser(data);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      errCode: 1,
      message: 'Error updating user',
    });
  }
};
let deleteUser = async (req, res) => {
  let userId = req.query.id; // Assuming you pass the user ID
  try {
    let response = await userService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      errCode: 1,
      message: 'Error deleting user',
    });
  }
};
module.exports = {
  handleLogin,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
