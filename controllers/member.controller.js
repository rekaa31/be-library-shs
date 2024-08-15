const imageKitConf = require("../config/lib/imagekit");
const { upload } = require("../config/storage");
const MEMBER = require("../models/member.model");

async function index(req, res) {
	const result = await MEMBER.index();
	res.json({
		message: "GET Member API",
		data: result.rows
	});
}

async function create(req, res) {
	const result = await MEMBER.create(req);
	res.json({
		message: "POST Member API",
		data: result.rows[0]
	});
}

async function uploadProfilePic(req, res) {

	upload.single('file')(req, res, async (err) => {
		if (err) {
			return res.status(400).json({
				message: err.message
			});
		}

		const result = await MEMBER.upload(req);

		res.json({
			message: "POST Member API",
			data: result.rows[0]
		});
	});

}

async function uploadBannerMember(req, res){

	const file = req.file;

	// Promise
	imageKitConf.upload({
		file: file.buffer.toString('base64'), // Required
		fileName: file.originalname,
		folder: "/binar-assets",
		tags: ["member-banner"]
	}).then((response) => {
		// Success
		console.log(response);
		res.json({
			message: "POST Member API",
			data: response
		});
	}).catch((error) => {
		// Failure
		console.log(error);
		res.status(400).json({
			message: error
		});
	});
}

async function show(req, res) {
	const result = await MEMBER.show(req);
	res.json({
		message: "GET Member API",
		data: result.rows[0]
	});
}

module.exports = {
	index,
	create,
	show,
	uploadProfilePic,
	uploadBannerMember
};