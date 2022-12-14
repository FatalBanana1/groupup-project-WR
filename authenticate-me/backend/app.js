// BACKEND = main app.js

const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");


// check env: prod or dev
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();
//connect morgan middleware
app.use(morgan("dev"));

//import routes dir
const routes = require("./routes");
app.use(routes); // connect all the routes

//add cookie parser
app.use(cookieParser());
app.use(express.json());

//security middleware

if (!isProduction) {
	//enable cors onlin in dev
	app.use(cors());
}

//helmet helps set vareity of headers to secure app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);

//set _csrf token + create req.csrftoken method

app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
);

// catch unhandled reqs - forward to error handler
app.use((_req, _res, next) => {
	const err = new Error(`The requested resource couldn't be found.`);
	err.title = `Resource Not Found`;
	err.errors = [`The requested resource couldn't be found.`];
	err.status = 404;
	next(err);
});

//sequelize error handler
const { ValidationError } = require("sequelize");

app.use((err, _req, _res, next) => {
	// check if err is from sqlize
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = `Validation Error`;
	}
	next(err);
});

// formatting all errors into res.JSON
// includes: e.msg + e.array + e.stack-trace

app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: err.title || `Server Error`,
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

//exports
module.exports = app;
