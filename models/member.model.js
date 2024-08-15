// Create Model for Member
const DB = require('../config/db');

const MEMBER = {
	index: async () => {
		try {
			const result = await DB.query('SELECT * FROM members');
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},
	create: async (req) => {
		try {
			const { name, presensi } = req.body;
			const result = await DB.query('INSERT INTO members (name, presensi) VALUES ($1, $2) RETURNING *', [name, presensi]);
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},
	show: async (req) => {
		try {
			const { id } = req.params;
			const result = await DB.query('SELECT * FROM members WHERE id = $1', [id]);
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},
	upload: async (req) => {
		try {
			const { file } = req;
			const result = await DB.query('UPDATE members SET pic = $1 WHERE id = $2 RETURNING *', [file.path, req.params.id]);
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	}
};

module.exports = MEMBER;