const MEMBER = require("../models/member.model");

async function index(req, res) {
	const result = await MEMBER.index();
	res.json({
		message: "GET Member API",
		data: result.rows
	});
}

module.exports = {
	index
};