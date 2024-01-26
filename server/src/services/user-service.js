const bcrypt = require('bcrypt');
const UserModel = require('./../models/user-model');
const UserDto = require('./../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./../services/token-service');

const CRYPT_SALT = 7;

class UserService {
  async signup(name, email, password) {
    const candidate = await UserModel.findOne(email);
    if (candidate) {
      throw ApiError.badRequest(`email ${email} is already registered`);
    }
    const hashedPassword = await bcrypt.hash(password, CRYPT_SALT);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const createdUser = await UserModel.create(newUser);
    const userDto = new UserDto(createdUser);
    const jwt = tokenService.generateToken({...userDto});
    await tokenService.saveToken(jwt.refreshToken, userDto.id);
    userDto.accessToken = jwt.accessToken;
    return {
      signedUser: userDto,
      refreshToken: jwt.refreshToken,
    };
  }

  async login(email, password) {
    const dbUser = await UserModel.findOne(email);
    if (!dbUser) {
      throw ApiError.badRequest('uregistered email');
    }
    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordCorrect) {
      throw ApiError.badRequest('incorrect email or password');
    }
    const userDto = new UserDto(dbUser);
    const jwt = tokenService.generateToken({...userDto});
    await tokenService.saveToken(jwt.refreshToken, userDto.id);
    userDto.accessToken = jwt.accessToken;
    return {
      loggedUser: userDto,
      refreshToken: jwt.refreshToken,
    };
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      throw ApiError.badRequest('empty refreshToken cookies');
    }
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unAuthorized();
    }
    const jwtDecoded = tokenService.validateRefreshToken(refreshToken);
    if (!jwtDecoded) {
      throw ApiError.unAuthorized();
    }
    const userDto = new UserDto(jwtDecoded);
    const jwt = tokenService.generateToken({...userDto});
    await tokenService.saveToken(jwt.refreshToken, userDto.id);
    userDto.accessToken = jwt.accessToken;
    return {
      updatedData: userDto,
      updatedToken: jwt.refreshToken,
    }
  }
}

module.exports = new UserService();
