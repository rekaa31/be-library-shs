// Call Function Needed to Testing
const mockRequest = require("../consts/mock-request.const");
const mockResponse = require("../consts/mock-response.const");
const {
	getTransactionList
} = require("../controllers/transaction.controller");

// Test Case
describe('INDEX FUNCTION TESTING IN TRANSACTION CONTROLLER', () => {
	test('res.json() message, data', done => {
		const req = mockRequest();
		const res = mockResponse();
		getTransactionList(req, res);
		expect(res.json).toBeCalledWith({ message: "GET Transaction API", data: [] });
		done();
	})
})

