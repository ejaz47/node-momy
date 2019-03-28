const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const auth_controller = require('./auth_controller.js');


// a simple test url to check that all of our files are communicating correctly.

router.post('/login', auth_controller.validator('login'), auth_controller.login);

module.exports = router;