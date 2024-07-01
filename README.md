-
  npm install

-
  * Используется NestJS, postgres

Заполнение .env файла
  * Предполагается что почта для рассылки кодов регистрации уже зарегистрирована

  Пример:
    JWT_SECRET=jwt_secret
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=password
    DB_DATABASE=bothub
    EMAIL=example@mail.ru
    EMAIL_PASSWORD=password
    EMAIL_SMTP_HOST=smtp.mail.ru
    EMAIL_SMTP_PORT=465

Создание и запуск миграции БД:

-
  Windows: npm run migration:generate-win --name=Tables
  Unix/Mac: npm run migration:generate --name=Tables

  * Разница в передаче переменных в скрипт
-
  npm run start:dev
-
  npm run migration:run

Swagger:

4.
  http://localhost:3000/api#/

5.
  Зарегистрироваться в системе. Предполагается, что первый зарегистрированный пользователь получит права администратора.
6.
  Работа со справочниками согласно описанию в Сваггере
7.
  Работа с пользователями
  Вы не можете менять свои права (иначе в системе может не остаться администраторов)
  Права хранятся в формате бит. маски - число xxxx, где на биты на позициях 1, 2, 3 и 4 отвечают за права на удаление, создание, редактирование и получение сущностей соответственно

# bothub-test-task
