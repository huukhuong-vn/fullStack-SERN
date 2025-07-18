import crud from '../services/crud';
let getHomePage = (req, res) => {
  return res.render('homepage.ejs');
};

let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
  return res.render('crud.ejs');
};
let postCRUD = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    let message = await crud.createNewUser(req.body);
    if (message.success === false) {
      return res.status(400).json({ message: message.message });
    }
    console.log('message from CRUD:', message);
    return res.redirect('/get-crud');
  } catch (e) {
    console.error('Error in postCRUD:', e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
let getAllUsers = async (req, res) => {
  let data = await crud.getAllUsers();
  console.log('data from controller:', data);
  return res.render('displayCRUD.ejs', { data: data });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  let userData = await crud.getUserInfoById(userId);

  return res.render('editCRUD.ejs', { user: userData });
};
let putCRUD = async (req, res) => {
  let data = req.body;
  await crud.updateUserData(data);
  return res.redirect('/get-crud');
};
let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  await crud.deleteUserById(userId);
  return res.redirect('/get-crud');
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getAllUsers,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
