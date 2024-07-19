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
	}
};

module.exports = MEMBER;