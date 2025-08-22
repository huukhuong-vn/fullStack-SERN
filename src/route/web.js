import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getAllUsers);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.post('/delete-crud', homeController.deleteCRUD);

  router.post('/api/login', userController.handleLogin);
  router.get('/api/get-all-users', userController.getAllUsers);
  router.post('/api/create-new-user', userController.createNewUser);
  router.put('/api/edit-user', userController.updateUser);
  router.delete('/api/delete-user', userController.deleteUser);

  return app.use('/', router);
};

module.exports = initWebRoutes;
