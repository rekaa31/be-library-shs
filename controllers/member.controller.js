const MEMBER = require("../models/member.model");

async function index(req, res) {
	try {
		const result = await MEMBER.index();
		res.json(result.rows);
	} catch (err) {
		throw new Error(err);
	}
}

module.exports = {
	index
};