// routes >> api >> index

// imports
const router = require("express").Router();

// routes

//test api router
router.post("/test", function (req, res) {
	res.json({ requestBody: req.body });
});

// test in brower console:
/*
fetch('/api/test', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `lQkwdIIS-eM2K0y2PEMZJvutk44Sx4rz2cBc`
  },
  body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));
*/

// exports
module.exports = router;
