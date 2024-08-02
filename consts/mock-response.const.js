const mockResponse = () => {
	const res = {};
	res.json = jest.fn().mockReturnValue(res);
	return res;
}

module.exports = mockResponse