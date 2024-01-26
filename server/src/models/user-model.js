const path = require('path');
const dbService = require('./../services/db-service');


class UserModel {
  static filePath = path.resolve(__dirname, '..', 'database', 'user-db.json');

  static async findOne(data) {
   return await dbService.findOne(this.filePath, data);
  }

  static async create(data) {
    await dbService.create(this.filePath, data);
    return data;
  }
}

module.exports = UserModel;
