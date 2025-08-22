import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
// Băm mật khẩu
const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// Lấy tất cả user
const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (e) {
    console.error('Lỗi khi lấy user:', e);
    throw e;
  }
};

// Tạo user mới
const createNewUser = async (data) => {
  if (!data.email || !data.password) {
    return { success: false, message: 'Email and password are required' };
  }

  try {
    const existingUser = await db.User.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

    const { password, ...restData } = data;
    const hashPassword = hashUserPassword(password);

    await db.User.create({ ...restData, password: hashPassword });

    return { success: true, message: 'User created successfully' };
  } catch (e) {
    console.error('Lỗi khi tạo user:', e.stack || e);
    return { success: false, message: 'Something went wrong on the server' };
  }
};

// Sửa lấy thông tin user theo id
const getUserInfoById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    return user;
  } catch (e) {
    console.error('Lỗi khi lấy thông tin user:', e);
    throw e;
  }
};
// Cập nhật thông tin user
const updateUserData = async (data) => {
  try {
    const user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      console.log(user);
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;

      if (data.password) {
        user.password = hashUserPassword(data.password);
      }
      await db.User.update(user, {
        where: { id: data.id },
      });
    }
  } catch (e) {
    console.error('Lỗi khi cập nhật thông tin user:', e);
    throw e;
  }
};
// Xoá user theo id
const deleteUserById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await db.User.destroy({
        where: { id: userId },
      });
      return { success: true, message: 'User deleted successfully' };
    }
    // check existing user on database
  } catch (e) {
    console.error('Lỗi khi xoá user:', e);
    throw e;
  }
};
const deleteAllUsers = async () => {
  try {
    await db.User.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
    });
  } catch (e) {
    console.error('Lỗi khi xoá tất cả user:', e);
    throw e;
  }
};

export default {
  getAllUsers,
  createNewUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
