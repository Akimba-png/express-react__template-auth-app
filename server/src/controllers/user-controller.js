const validationService = require('./../services/validation-service');
const userService = require('./../services/user-service');

const cookieConfig = {
  httpOnly: true,
  maxAge: 60 * 60 * 1000,
  sameSite: 'None',
  secure: true,
};

class UserController {
  async signup(req, res, next) {
    try {
      validationService.validateRequest(req);
      const { name, email, password } = req.body;
      const { signedUser, refreshToken } = await userService.signup(name, email, password);
      res.cookie('refreshToken', refreshToken, cookieConfig);
      res.status(201).json(signedUser);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      validationService.validateRequest(req);
      const { email, password } = req.body;
      const { loggedUser, refreshToken } = await userService.login(email, password);
      res.cookie('refreshToken', refreshToken, cookieConfig);
      res.status(200).json(loggedUser);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'user successfully logged out' });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { updatedData, updatedToken } = await userService.refresh(refreshToken);
      res.cookie('refreshToken', updatedToken, cookieConfig);
      res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  }

  async checkAuth(req, res, next) {
    try {
      const userData = req.userData;
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
