const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routers/user-router');
const publicRouter = require('./routers/public-router');
const privateRouter = require('./routers/private-router');
const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');
const pathMiddleware = require('./middlewares/path-middleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.use('/auth', userRouter);
app.use('/public', pathMiddleware, publicRouter.create('item'));
app.use('/private', authMiddleware, pathMiddleware, privateRouter.create('item'));
app.use(errorMiddleware);

const appInit = () => {
  app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

appInit();
