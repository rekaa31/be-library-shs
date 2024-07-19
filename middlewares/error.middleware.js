// Error Middleware
const error = (err, req, res, next) => {
	console.error(err.message);
	res.status(500).send('Server Error');
}

module.exports = error;