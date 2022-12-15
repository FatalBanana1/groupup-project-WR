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
-signin static method

-User auth middlewares = 3 fxns

-create utils folder in backend
-file inside = auth.js = store auth helper fxns

-settokencookie method
-restoreuser method
-requireAuth method

-test user middleware
-add test route in backend > routes > api > index.js

-import restoreuser and connect to router before other middlew/routehan

<!-- phase 4 - user auth routes -->

-session router
-touch session.js > backend/routes/api
-touch users.js > backend/routes/api

-connect all routers exported from 2 files in index.js > api
-connect routes AFTER restoreUser

-session.js - import and post route

-user logout api route:
-delete route > api/session
logout route will remove token cookie and return success json msg

-signup: > router/api/users
post route

-get session user route > api/session
restore session user


