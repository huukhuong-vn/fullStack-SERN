import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
// Băm mật khẩu
const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

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
let getAllUsers = async (id) => {
  try {
    let users = '';
    if (id === 'ALL' || !id) {
      users = await db.User.findAll({
        attributes: {
          exclude: ['password'], // Exclude password from the result
        },
      });
    } else if (id) {
      users = await db.User.findOne({
        where: { id: id },
        attributes: {
          exclude: ['password'], // Exclude password from the result
        },
      });
    } else {
      throw new Error('Invalid user ID');
    }
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rethrow the error to be handled by the controller
  }
};
let createNewUsser = async (data) => {
  try {
    if (!data.email || !data.password) {
      return {
        errCode: 1,
        message: 'Email and password are required',
      };
    }
    // Check if user already exists
    let existingUser = await db.User.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      return {
        errCode: 2,
        success: false,
        message: 'Email already exists',
      };
    }
    // Create new user
    let newUser = await db.User.create({
      email: data.email,
      password: hashUserPassword(data.password, salt), // Hash the password before saving
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phonenumber: data.phonenumber,
    });
    return {
      errCode: 0,
      message: 'User created successfully',
      user: newUser,
    };
  } catch (error) {
    console.error('Error creating new user:', error);
    return {
      errCode: 4,
      message: 'Error creating new user',
    };
  }
};

let updateUser = async (data) => {
  try {
    if (!data.id || !data.email) {
      return {
        errCode: 1,
        message: 'ID and email are required',
      };
    }
    // Find user by ID
    let user = await db.User.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (!user) {
      return {
        errCode: 2,
        message: 'User not found',
      };
    }
    // Update user details
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.address = data.address;
    user.phonenumber = data.phonenumber;
    await user.save();

    return {
      errCode: 0,
      message: 'User updated successfully',
      user: user,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      errCode: 3,
      message: 'Error updating user',
    };
  }
};

let deleteUser = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: 'ID is required',
    };
  }

  try {
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return {
        errCode: 2,
        message: 'User not found',
      };
    }

    await db.User.destroy({
      where: { id },
      force: true,
    });

    const remainingUsers = await db.User.findAll();

    if (remainingUsers.length === 0) {
      // Reset lại AUTO_INCREMENT về 1 khi bảng rỗng
      await db.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1');
    }

    return {
      errCode: 0,
      message: 'User deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      errCode: 3,
      message: 'Error deleting user',
    };
  }
};

export default {
  handleLogin,
  getAllUsers,
  createNewUsser,
  updateUser,
  deleteUser,
};
