const ApiError = require('./../exceptions/api-error');
const tokenService = require('./../services/token-service');
const UserDto = require('./../dtos/user-dto');

const authMiddleware = (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unAuthorized());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.unAuthorized());
    }
    const jwtDecoded = tokenService.validateAccessToken(accessToken);
    if (!jwtDecoded) {
      return next(ApiError.unAuthorized());
    }
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.unAuthorized());
    }
    const userDto = new UserDto(jwtDecoded);
    userDto.accessToken = accessToken;
    req.userData = userDto;
    next();
  } catch (error) {
    next(ApiError.unAuthorized());
  }
};

module.exports = authMiddleware;
