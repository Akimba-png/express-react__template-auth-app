const pathMiddleware = (req, _res, next) => {
  req.itemPath = req.path.split('/')[1];
  next();
};

module.exports = pathMiddleware;
