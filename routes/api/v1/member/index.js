/**
 * Route for Domain Member
 */

var express = require('express');
var router = express.Router();

const MEMBER_CONTROLLER = require('../../../../controllers/member.controller');
const { upload } = require('../../../../config/storage');
const { cloudUpload, cloud } = require('../../../../config/storage/cloud');

/* GET users listing. */
router.get('/', MEMBER_CONTROLLER.index);

/* POST */
router.put('/:id/upload', MEMBER_CONTROLLER.uploadProfilePic);

/* POST */
router.put('/:id/upload-banner', cloud(
	['image/png', 'image/jpeg']
).single('file'), MEMBER_CONTROLLER.uploadBannerMember);

/* POST */
router.post('/', MEMBER_CONTROLLER.create);

/* GET */
router.get('/:id', MEMBER_CONTROLLER.show);



module.exports = router;