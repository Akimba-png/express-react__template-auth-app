const path = require('path');
const dbService = require('./../services/db-service');

class TokenModel {
  static filePath = path.resolve(__dirname, '..', 'database', 'token-db.json');

  static async findOne(data) {
    return await dbService.findOne(this.filePath, data);
  }

  static async updateOne(data) {
    await dbService.updateOne(this.filePath, data);
    return data;
  }

  static async create(data) {
    await dbService.create(this.filePath, data);
    return data;
  }
}

module.exports = TokenModel;
