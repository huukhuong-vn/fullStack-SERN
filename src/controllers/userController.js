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
module.exports = {
  handleLogin,
};
