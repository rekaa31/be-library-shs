// Middleware Auth
// const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.header('Authorization');
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		// const TOKEN_VALUE = token.split(' ')[1];

		next();

		// const decoded = jwt.verify(TOKEN_VALUE, process.env.JWT_SECRET);
		// req.user = decoded.user;
		// next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;