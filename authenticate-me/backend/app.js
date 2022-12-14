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

//import routes
const routes = require("./routes");
app.use(routes); // connect all the routes

//exports
module.exports = app;
