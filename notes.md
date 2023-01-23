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

-reset token url/path
http://localhost:8000/api/csrf/restore

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

-validate login inputs git feature branch
-adding user input validation on user login reqs

t> npm install express-validator

-validation middleware:
-touch validation.js > utils

-validating login req body > api/session
import check fxn from express-validator and handleVErr fxn

-connect post api/session to validatelogin middleware

-validating sugnup req.body: > routes/api/users.js
-post api/users signup route
-check with validatesignup
-validateSignup middleware is composed of the check and handleValidationErrors middleware
-checks to see if req.body.email exists and is an email, req.body.username is a minimum length of 4 and is not an email, and req.body.password is not empty and has a minimum length of 6

-connect the POST /api/users route to the validateSignup middleware

-wrapping up backend:
-refactor to add firstname and lastname attr

<!-- migrations -->

-create groups table and model
npx sequelize model:generate --name Group --attributes organizerId:integer,name:string,about:string,type:enum,private:boolean,city:string,state:string

-seeders for groups t
npx sequelize seed:generate --name test-groups

-create groupimages t
npx sequelize model:generate --name GroupImage --attributes groupId:integer,url:string,preview:boolean

-add skydiving imgs - seed file
npx sequelize seed:generate --name add-skydiving-imgs-test-1

-add membership seeders
npx sequelize seed:generate --name add-test-memberships

-usergroups join table = memberships
npx sequelize model:generate --name Membership --attributes userId:integer,groupId:integer,status:enum

//---------------------------

-EVENTS

-create events table
npx sequelize model:generate --name Event --attributes venueId:integer,groupId:integer,name:string,description:string,type:enum,capacity:integer,price:integer,startDate:date,endDate:date

-create seeders - events t
npx sequelize seed:generate --name add-test-events

-link events to group by groupid

-create eventimages table
npx sequelize model:generate --name EventImage --attributes eventId:integer,url:string,preview:boolean

-create seeders - eventimages t
npx sequelize seed:generate --name add-modernart-eventimages

-link eventimages to events

//---------------------------

-VENUES

-create venues table
npx sequelize model:generate --name Venue --attributes groupId:integer,address:string,city:string,state:string,lat:decimal,lng:decimal

-create seeders - venues t
npx sequelize seed:generate --name add-test-venues

-link venues to group by groupid
-link venues to events by venueid

//---------------------------

-Attendances

-create attendances table
npx sequelize model:generate --name Attendance --attributes eventId:integer,userId:integer,status:enum

-create seeders - attend t
npx sequelize seed:generate --name add-test-attendances

-link venues to group by groupid
-link venues to events by venueid

//---------------------------
tables:
venueid: 1 = online

venueid: 2 = broadway
1681 BROADWAY, NEW YORK, NY 10036

venueid: 3 = metropolitan museum of art
1000 5th ave, nyc, ny

venueid: 4 = american museum of natural history
200 Central Park West, New York, NY 10024

venueid: 5 = The Museum of Modern Art
11 W 53rd St, New York, NY 10019

//---------------------------

/_
// lazy load destructure - get all attendees of event
// let attends = await Attendance.findAll({
// where: { eventId },
// attributes: ["status"],
// });
// users.forEach((el, i) => {
// el.dataValues.Attendance = { status: attends[i].status };
// return el;
// });
_/

//---------------------------

//---------------------------

FRONTEND:
-commands:
npx create-react-app . --template @appacademy/react-redux-v17 --use-npm

//---------------------------

-js-cookie
npm install js-cookie

//---------------------------

-testing if setup is correct:
window.store.dispatch({ type: 'hello' });

//---------------------------

-login thunk action test in browser
window.store.dispatch(window.sessionActions.login({
credential: 'Demo-lition',
password: 'password'
}));

//---------------------------

-restore user thunk
window.store.dispatch(window.sessionActions.restoreUser());

//---------------------------

-sign up thunk test
window.store.dispatch(window.sessionActions.signup({
username: 'NewUser',
firstName: 'New',
lastName: 'User',
email: 'new@user.io',
password: 'password'
}));

//---------------------------

-logout thunk action test
window.store.dispatch(window.sessionActions.logout());

//---------------------------

-font awesome account kit code

<script src="https://kit.fontawesome.com/9224e637d0.js" crossorigin="anonymous"></script>

Now you can use any of the free icons available in Font Awesome by adding the <i> element with the desired className to be rendered in a React component

To change the size or color of the icon, wrap the <i> element in a parent element like a div.

Manipulating the font-size of the parent element changes the size of the icon.

The color of the parent element will be the color of the icon. For example, to render a big orange carrot icon:

const Carrot = () => {
return (

<div style={{ color: "orange", fontSize: "100px" }}>
<i className="fas fa-carrot"></i>
</div>
);
};

//---------------------------

-logout thunk action test
window.store.dispatch(window.sessionActions.logout());

//---------------------------

npm --prefix backend install backend && npm --prefix frontend install frontend

//---------------------------

# OLD Build Script

npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all

//---------------------------

# render new build command:

npm install &&
npm run render-postbuild &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all

//---------------------------

    let auth = await Membership.findOne({
    	where: { userId: user.dataValues.id, status: "co-host" },
    	include: [
    		{
    			model: Group,
    		},
    	],
    });

    console.log(`inside back----`, auth.status);

    if (!auth) {
    	return res.status(400).json({
    		message: "Authentication Error",
    		statusCode: 403,
    		errors: {
    			memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
    		},
    	});
    } else {
    	next();
    }

};

//---------------------------

const valid_user = async (req, res, next) => {
const { user } = req;

    if (!user) {
    	return res.status(400).json({
    		message: "Validation Error",
    		statusCode: 400,
    		errors: {
    			memberId: "User must be signed in.",
    		},
    	});
    }

    let auth = await Membership.findOne({
    	where: { userId: user.dataValues.id },
    	include: [
    		{
    			model: Group,
    		},
    	],
    });
    console.log(`inside back----`, );

    if (!auth) {
    	return res.status(400).json({
    		message: "Authentication Error",
    		statusCode: 403,
    		errors: {
    			memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
    		},
    	});
    }

    if (
    	user.dataValues.id &&
    	(auth.status === "co-host" || auth.Group.organizerId === user.id)
    ) {
    	next();
    } else {
    	return res.status(403).json({
    		message: "Authentication Error",
    		statusCode: 403,
    		errors: {
    			memberId: `Current User must be the organizer of the group or a member of the group with a status of co-host`,
    		},
    	});
    }

};

//---------------------------

//---------------------------

css notes:

setting props with calculations

ex.

width: calc(100% - 100px);

//---------------------------

-TODO

//---------------------------
//---------------------------

create group form content:

display none on buttons that have rendered

step 1:

city, state

First, set your group’s location.

Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.

-show next button - link to next comp
-next = group name
-click - hide old comps

//---------------------------

step 2:

group name

-show new next button

What will your group’s name be?

Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.

//---------------------------

step 3:

about

Now describe what ${Group.name} will be about.

People will see this when we promote your group, but you’ll be able to add to it later, too.

What's the purpose of the group?
Who should join?
What will you do at your events?

---input field: textarea

below input:

lightbulb
Here's an example:

“Welcome tech lovers far and wide! We’re an online and in-person tech-enthusiast group hosting live speaking events on a range of tech topics. You can join us in person if possible or on one of our live streams. Look out for our virtual happy hours and other networking events.”

//---------------------------

step 4:

type, private

Is your group meeting online only or in person as well?

options:
online only
In person

---

Can anyone join your group?
Will your group be set to public or private?
Private groups can only be seen by Groupup users ONLY. Groupup account will be required to view group.

(check if user is signed in:
not signed in: set groups pg to only return where type = public, conditionally render another map fxn
signed in: all groups shown, normal map run)

options:
Public
Private Only

//---------------------------

step 5:

add group image = optional, can be done later

//---------------------------

from meetup:

Almost done! Just take a minute to review our guidelines
Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:

Provide growth opportunities for members
Encourage real human interactions in person or online
Have a host present at all events
Be transparent about the group’s intentions
You can read more about all of this in our community guidelines.

Once you submit your group, a human at Meetup will review it based on these guidelines and make sure it gets promoted to the right people.

ALTER description to:

Almost done!
My name is Wasiq Rashid (full-stack developer).
I would like to sincerely Thank You for going through my portfolio project and considering me for the position at your company. I appreciate your time and effort.

Below is a link to review my resume on LinkedIn and contact info which is also found in the footer section "Contact Page". Email: wasiqnj@gmail.com

-- TODO: add later...
Once you submit your group, a prefilled form will be shown for you to email me your response to this job request.


//---------------------------

//---------------------------

//---------------------------

//---------------------------

npm install && npm run render-postbuild && npm run build && npm run sequelize --prefix backend db:seed:undo:all && npm run sequelize --prefix backend db:migrate:undo:all && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all

//---------------------------
npm install && npm run render-postbuild && npm run build && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all

npm install && npm run render-postbuild && npm run build && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all

//---------------------------
//---------------------------
//---------------------------
//---------------------------

									{user ? (
										<NavLink
											to={`/groups/${group.id}/members`}
										>
											Members
										</NavLink>
									) : (
										<div>
											<OpenModalButton
												buttonText="Members"
												onButtonClick={closeMenu}
												modalComponent={
													<LoginFormModal />
												}
											/>
										</div>
									)}
								</div>

								<div className="margin-div" />

								<div className="hidden">
									<DeleteModalButton
										id="delete-group-button"
										buttonText="Delete Group"
										onButtonClick={closeMenu}
										modalComponent={
											<DeleteGroup group={group} />
										}
									/>
								</div>

								<div className="hidden">
									<EditModalButton
										id="update-group-button"
										buttonText="Edit Group"
										onButtonClick={closeMenu}
										modalComponent={
											<UpdateGroup group={group} />
										}
									/>
								</div>
							</div>
						</div>
