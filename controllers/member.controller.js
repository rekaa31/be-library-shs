const imageKitConf = require("../config/lib/imagekit");
const { upload } = require("../config/storage");
const MEMBER = require("../models/member.model");
const qr = require("node-qr-image");
const fs = require("fs");

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

async function qrMemberGenerator(req, res) {
	// Response QR Code as PNG
	// const qr = qr.image(req.params.id, { type: 'png' });
	// res.type('png');
	// qr.pipe(res);

	// Response QR Code as with data Buffer
	// const value_qr = 'https://binar.co.id/member/' + req.params.id;

	// const qrStream = qr.image(value_qr, { type: 'png' });

	// let chunks = [];

	// qrStream.on('data', (chunk) => {
	// 	chunks.push(chunk);
	// });

	// qrStream.on('end', () => {
	// 	const buffer = Buffer.concat(chunks);

	// 	res.writeHead(200, {
	// 		'Content-Type': 'image/png',
	// 		'Content-Length': buffer.length
	// 	});

	// 	res.end(buffer);

	// });

	// QR Code upload to ImageKit
	const value_qr = {
		"name": "biaya tambahan",
		"price": 1000,
		"expired": "2021-12-31"
	}

	const qrStream = qr.image(JSON.stringify(value_qr), { type: 'png', size: 400 });

	let chunks = [];

	qrStream.on('data', (chunk) => {
		chunks.push(chunk);
	});

	qrStream.on('end', () => {
		const buffer = Buffer.concat(chunks);

		// Promise
		imageKitConf.upload({
			file: buffer.toString('base64'), // Required
			fileName: 'qr-code-' + req.params.id + '.png',
			folder: "/binar-assets",
			tags: ["member-qr"]
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
	});

}

module.exports = {
	index,
	create,
	show,
	uploadProfilePic,
	uploadBannerMember,
	qrMemberGenerator
};