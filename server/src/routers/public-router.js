const Router = require('express');
const publicController = require('./../controllers/public-controller');

class PublicRouter {
  create(path = 'item') {
    const router = new Router();

    router.get(
      `/${path}`,
      publicController.getItems
    );

    router.post(
      `/${path}`,
      publicController.create
    );

    router.patch(
      `/${path}/:id`,
      publicController.update
    );

    router.delete(
      `/${path}/:id`,
      publicController.delete
    );

    return router;
  }
}

module.exports = new PublicRouter();
