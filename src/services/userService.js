import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleLogin = async (email, password) => {
  try {
    const user = await db.User.findOne({
      where: { email },
      attributes: ['email', 'password', 'roleId'],
      raw: true, // Use raw to get a plain object instead of a Sequelize instance
    });
    if (!user) {
      return { success: false, message: 'User not found', errCode: 1 };
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return { success: false, message: 'Wrong password', errCode: 2 };
    }
    // Remove password from user object before returning
    delete user.password;
    return {
      errCode: 0,
      success: true,
      message: 'Login successful',
      user: user,
    };
  } catch (e) {
    console.error('Error during login:', e);
    return {
      success: false,
      message: 'Internal server error',
      errCode: 500,
    };
  }
};

export default {
  handleLogin,
};
