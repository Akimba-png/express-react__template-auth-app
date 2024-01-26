# Локальный сервер с возможностью авторизации
Авторизация реализована при помощи JWT access / refresh token  

## Технологический стек:
- Express;
- JWT;
- Bcrypt;
- Nodejs file system module;


## Проект разворачивается по адресу:
http://localhost:5000

## Доступные endpoints по умолчанию:
### /auth
- /signup (POST) - регистрация нового пользователя;
- /login (POST) - авторизация пользователя;
- /login (GET) - проверка авторизации;
- /logout (DELETE) - выход пользователя из авторизации;
- /refresh (GET) - обновление refresh токена;

### /private _(доступно только авторизованным пользователям)_
- /item (GET) - получение всех items авторизованного пользователя;
- /item (POST) - создание нового item для авторизованного пользователя;
- /item/:id (PATCH) - update уже существующего, указанного item;
- /item/:id (DELETE) - удаление указанного item;

### /public
- /item (GET) - получение всех items существующих items;
- /item (POST) - создание нового item;
- /item/:id (PATCH) - update уже существующего, указанного item;
- /item/:id (DELETE) - удаление указанного item;

## Создание нового endpoint
В index.js необходимо:
- воспользоваться методом public/privateRouter.create(path)  
(где path - имя будущего endpoint);
- зарегистрировать результат в app.use()  
(передача pathMiddleware обязательна);

## Запуск проекта:
```bash
npm start
```
