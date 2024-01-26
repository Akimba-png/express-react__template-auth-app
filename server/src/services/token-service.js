const jwt = require('jsonwebtoken');
const TokenModel = require('./../models/token-model');
const ApiError = require('../exceptions/api-error');

class TokenService {
  generateToken(data) {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_KEY, {expiresIn: '360min'});
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_KEY, {expiresIn: '360min'});
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(refreshToken, userId) {
    const savedData = await TokenModel.findOne(userId);
    if (savedData) {
      savedData.refreshToken = refreshToken;
      await TokenModel.updateOne(savedData);
      return;
    }
    const payload = {
      userId,
      refreshToken,
    };
    await TokenModel.create(payload);
  }

  async removeToken(refreshToken) {
    const savedData = await TokenModel.findOne(refreshToken);
    if (!savedData) {
      throw ApiError.badRequest('unknown refreshToken cookies');
    }
    savedData.refreshToken = '';
    await TokenModel.updateOne(savedData);
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
