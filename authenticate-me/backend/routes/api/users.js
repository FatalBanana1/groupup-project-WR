// routes > api > users

//imports
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Sign up
router.post("/", async (req, res) => {
	const { email, password, username } = req.body;
	const user = await User.signup({ email, username, password });

	await setTokenCookie(res, user);

	return res.json({
		user: user,
	});
});

/*
sxvI7aLo-k4ORa8dzJYGQ1lqwGpxcMFSnSS8

//testing post route
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `sxvI7aLo-k4ORa8dzJYGQ1lqwGpxcMFSnSS8`
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));



*/

// exports
module.exports = router;
