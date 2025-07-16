import db from '../models/index';
import crud from '../services/crud';
let getHomePage = async (req, res) => {
  try {
    let data = await crud.getAllUsers();
    console.log(data);

    return res.render('homepage.ejs', { data: data });
  } catch (e) {
    console.log('lỗi ', e);
  }
};

let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
  return res.render('crud.ejs');
};
let postCRUD = async (req, res) => {
  let message = await crud.createNewUser(req.body);
  console.log('message: ', message);
  return res.redirect('/');
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};
