const { body, validationResult } = require('express-validator');
const ApiError = require('./../exceptions/api-error');

class ValidationService {
  validateRequest(req) {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      throw ApiError.badRequest('validation error', validation.array());
    }
  }

  createEmailValidation() {
    return body('email').trim().isEmail().escape();
  }

  createPasswordValidation() {
    return body('password').trim().isLength({min: 3, max: 10}).escape();
  }

  createNameValidation() {
    return body('name').trim().notEmpty().isLength({max: 10}).escape();
  }
}

module.exports = new ValidationService();
