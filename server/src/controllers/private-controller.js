const privateService = require('./../services/private-service');

class PrivateController {
  async getItems(req, res, next) {
    try {
      const user = req.userData;
      const path = req.itemPath;
      const items = await privateService.getAll(user.id, path);
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = req.userData;
      const requestedItem = req.body;
      requestedItem.systemGroup = req.itemPath;
      const createdItem = await privateService.create(user.id, requestedItem);
      res.status(201).json(createdItem);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const path = req.itemPath;
      const user = req.userData;
      const itemIdToUpdate = req.params.id;
      const requestedDataToUpdate = req.body;
      const updatedItem = await privateService.update(
        user.id,
        itemIdToUpdate,
        path,
        requestedDataToUpdate
      );
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const path = req.itemPath;
      const user = req.userData;
      const itemId = req.params.id;
      await privateService.delete(user.id, itemId, path);
      res.status(200).json({ message: 'item successfully deleted' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PrivateController();
