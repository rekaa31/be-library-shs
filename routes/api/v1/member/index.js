/**
 * Route for Domain Member
 */

var express = require('express');
var router = express.Router();

const MEMBER_CONTROLLER = require('../../../../controllers/member.controller');

/* GET users listing. */
router.get('/', MEMBER_CONTROLLER.index);

module.exports = router;