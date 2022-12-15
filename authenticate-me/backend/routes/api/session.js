// routes > api > session

//imports
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await User.login({ credential, password });

	if (!user) {
		const err = new Error("Login failed");
		err.status = 401;
		err.title = "Login failed";
		err.errors = [`The provided credentials were invalid.`];
		return next(err);
	}

	await setTokenCookie(res, user);

	return res.json({
		user: user,
	});
});

/*
// Testing above post error handler - username
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `WZ3UREHn-tA17z4URf2Fq6kNW7bmgUb9WW_c`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

//testing email
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `WZ3UREHn-tA17z4URf2Fq6kNW7bmgUb9WW_c`
  },
  body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

// testing invalid user credential + pass combo
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `WZ3UREHn-tA17z4URf2Fq6kNW7bmgUb9WW_c`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
}).then(res => res.json()).then(data => console.log(data));

*/

// log out - delete
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({ message: "success" });
});

/*
// testing delete = logout user
fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `kShVWw7C-r9HSPD4kiCeaJheXfmcNN8Qz4Kc`
  }
}).then(res => res.json()).then(data => console.log(data));

*/



// exports
module.exports = router;
