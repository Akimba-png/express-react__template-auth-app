const Router = require('express');
const validationService = require('./../services/validation-service');
const userController = require('./../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const userRouter = new Router();

userRouter.post(
  '/signup',
  validationService.createEmailValidation(),
  validationService.createPasswordValidation(),
  validationService.createNameValidation(),
  userController.signup
);

userRouter.post(
  '/login',
  validationService.createEmailValidation(),
  validationService.createPasswordValidation(),
  userController.login
);

userRouter.get(
  '/login',
  authMiddleware,
  userController.checkAuth
);

userRouter.delete(
  '/logout',
  userController.logout
);

userRouter.get(
  '/refresh',
  userController.refresh
);

module.exports = userRouter;
