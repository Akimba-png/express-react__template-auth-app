const PrivateModel = require('../models/private-model');
const ApiError = require('../exceptions/api-error');
const ItemDto = require('./../dtos/item-dto');

class PrivateService {
  async create(userId, requestedItem) {
    requestedItem.id = Date.now().toString();
    const storedUserItem = await PrivateModel.findOne(userId);
    if (storedUserItem) {
      storedUserItem.items.push(requestedItem);
      await PrivateModel.updateOne(storedUserItem);
      const itemDto = new ItemDto(requestedItem);
      return itemDto;
    }
    const userItem = {
      userId,
      items: [requestedItem],
    };
    await PrivateModel.create(userItem);
    const itemDto = new ItemDto(requestedItem);
    return itemDto;
  }

  async update(userId, itemId, path, data) {
    const storedUserItem = await PrivateModel.findOne(userId);
    const itemToUpdate = storedUserItem.items.find((e) => {
      return e.id.toString() === itemId && e.systemGroup === path;
    });
    if (!itemToUpdate) {
      throw ApiError.badRequest('unknown item id to update');
    }
    for (const prop in data) {
      if (Object.hasOwn(data, prop)) {
        if (prop in itemToUpdate) {
          itemToUpdate[prop] = data[prop];
        } else {
          throw ApiError.badRequest('uncorrect data to update');
        }
      }
    }
    await PrivateModel.updateOne(storedUserItem);
    return itemToUpdate;
  }

  async delete(userId, itemId, path) {
    const storedUserItem = await PrivateModel.findOne(userId);
    if (!storedUserItem) {
      throw ApiError.badRequest('nothing yet saved here');
    }
    const updatedItems = storedUserItem.items.reduce((acc, e) => {
      return e.id.toString() === itemId && e.systemGroup === path ? acc : [...acc, e];
    }, []);
    if (storedUserItem.items.length === updatedItems.length) {
      throw ApiError.badRequest('nothing to delete here');
    }
    storedUserItem.items = updatedItems;
    await PrivateModel.updateOne(storedUserItem);
  }

  async getAll(userId, path) {
    const storedUserItem = await PrivateModel.findOne(userId);
    if (!storedUserItem) {
      return [];
    }
    return this.#filterItems(storedUserItem.items, path);
  }

  #filterItems(items, filter) {
    let values = [];
    for (const elem of items) {
      if (elem.systemGroup === filter) {
        const item = new ItemDto(elem);
        values.push(item);
      }
    }
    return values;
  }
}

module.exports = new PrivateService();
