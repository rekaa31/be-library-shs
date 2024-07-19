const express = require('express');
const router = express.Router();
const MEMBER_ROUTER = require('./member');
const AUTH_MIDDLEWARE = require('../../../middlewares/auth.middleware');

// ROUTE USING MIDDLEWARE
router.use('/member', AUTH_MIDDLEWARE, MEMBER_ROUTER);

module.exports = router;