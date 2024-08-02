/**
 * Route for Domain Member
 */

var express = require('express');
var router = express.Router();

const MEMBER_CONTROLLER = require('../../../../controllers/member.controller');

/* GET users listing. */
router.get('/', MEMBER_CONTROLLER.index);

/* GET users listing. */
router.get('/:id_user/from/:id_category', MEMBER_CONTROLLER.index);

/* POST */

module.exports = router;