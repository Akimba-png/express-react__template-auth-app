const Router = require('express');
const privateController = require('../controllers/private-controller');

class PrivateRouter {
  create(path = 'item') {
    const router = new Router();

    router.get(
      `/${path}`,
      privateController.getItems
    );

    router.post(
      `/${path}`,
      privateController.create
    );

    router.patch(
      `/${path}/:id`,
      privateController.update
    );

    router.delete(
      `/${path}/:id`,
      privateController.delete
    );

    return router;
  }
}

module.exports = new PrivateRouter();
