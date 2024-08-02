function getTransactionList(req, res) {
	res.json({ message: "GET Transaction API", data: [] });
}

module.exports = {
	getTransactionList
};