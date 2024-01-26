const { readFile, writeFile } = require('node:fs/promises');

class DbService {
  async find(filePath, element) {
    const dbData = await this.#readFile(filePath);
    const parsedData = JSON.parse(dbData);
    if (element) {
      return parsedData.filter((e) => {
        return Object.values(e).includes(element);
      });
    }
    return parsedData;
  }

  async findOne(filePath, element) {
    const dbData = await this.#readFile(filePath);
    const filteredData = JSON.parse(dbData).find((e) => {
      return Object.values(e).includes(element);
    });
    return filteredData;
  }

  async update(filePath, element) {
    await this.#writeFile(filePath, JSON.stringify(element));
  }

  async updateOne(filePath, element) {
    const dbData = await this.#readFile(filePath);
    const parsedData = JSON.parse(dbData);
    const updatedData = parsedData.map((e) => {
      if (e.userId === element.userId) {
        return element;
      }
      return e;
    });
    await this.#writeFile(filePath, JSON.stringify(updatedData));
  }

  async create(filePath, element) {
    element.id = Date.now().toString();
    const dbData = await this.#readFile(filePath);
    const parsedData = JSON.parse(dbData);
    parsedData.push(element);
    await this.#writeFile(filePath, JSON.stringify(parsedData));
  }

  async #readFile(path) {
    try {
      await this.#addDelay(500);
      return await readFile(path, {encoding: 'utf-8'});
    } catch (error) {
      throw new Error('Something wrong happend while reading db');
    }
  }

  async #writeFile(path, data) {
    try {
      await writeFile(path, data);
    } catch (error) {
      throw new Error('Something wrong happened while writing db');
    }
  }

  async #addDelay(delay) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }
}

module.exports = new DbService();
