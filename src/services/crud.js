import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return JSON.stringify(users);
  } catch (e) {
    console.log('lỗi ', e);
  }
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassWord = await hashUserPassword(data.password);
      await db.User.create({ ...data, password: hashPassWord });
      resolve('Create user success');
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
  // Implement password hashing logic here
};
module.exports = {
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
};
