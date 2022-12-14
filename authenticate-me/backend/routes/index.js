// routes >> index.js

//create express router

const express = require("express");
const router = express.Router();

//test route
// router.get("/hello/world", function (req, res) {
// 	res.cookie("XSRF-TOKEN", req.csrfToken());
// 	res.send("Hello World!");
// });

// get /api/csrf/restore
// allows dev to reset csrf token cookie xsrf-token
// set cookie on response
router.get("/api/csrf/restore", (req, res) => {
	const csrfToken = req.csrfToken();
	res.cookie("XSRF-TOKEN", csrfToken);
	res.status(200).json({
		"XSRF-TOKEN": csrfToken,
	});
});

module.exports = router;
