const path = require('path');
const dbService = require('./../services/db-service');

class PublicModel {
  static filePath = path.resolve(__dirname, '..', 'database', 'public-db.json');

  static async create(data) {
    await dbService.create(this.filePath, data);
    return data;
  }

  static async find(data) {
    return await dbService.find(this.filePath, data);
  }

  static async update(data) {
    await dbService.update(this.filePath, data);
    return;
  }
}

module.exports = PublicModel;
