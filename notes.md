<!-- Meet Project Notes -->

<!-- phase-0-setup -->

<!-- Backend -->

<!-- SQL -->

-npm dev dependencies
npm i -D

-random JWT secret:
t> openssl rand -base64 10

.env >> JWToken

-update config >> index.js

.sequelizerc

-initialize sequelize
t> npx sequelize init

-update config >> database.js

-sqlite for development
-postgres for production

-touch
psql-setup-script.js

-migrate db
t> npx dotenv sequelize db:migrate

<!-- EXPRESS -->

touch app.js

-set up routes

-test route

-import routes into app.js

<!-- create server -->

-bin/www = entry file = start express server

<!-- csrf token access for dev -->

-get /api/csrf/restore =
allow dev to reset csrf token cookie xsrf-token

<!-- phase-1/2-api-routes -->

-mkdir api >> routes
index.js

-1-resource not found error handler
app.js

-2-sequelize error handler

-3-err handler
formatting all errors into res.JSON
includes: e.msg + e.array + e.stack-trace


<!-- phase 3 - user auth -->

-user table create
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

-apply the constraints in the schema
-apply validations in model

-generate seeders file
npx sequelize seed:generate --name demo-user

-setup bcrypt in seeder file
-seed data
npx dotenv sequelize db:seed:all

-user model scope
-exclude from being sent to frontend:
1.default: hashedPassword, updatedAt, email, and createdAt
2.currentUser: hashedpass

-create methods that api routes for authentication will use to interact with Users t
-tosafeobject method: return obj with only user instance info safe to save to jwt: id, username, email
-validatepass method: return boolean if there is match with user instance and hashedpass
-getcurrentuserbyid static method: return user with that id
-login static method: return search for user with credential and password keys , return: 
