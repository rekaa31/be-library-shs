// Call Function Needed to Testing
const mockRequest = require("../consts/mock-request.const");
const mockResponse = require("../consts/mock-response.const");
const {
	getListAccount
} = require("../controllers/account.controller");

// Group of Test Case
describe('INDEX FUNCTION TESTING IN ACCOUNT CONTROLLER', () => {
	// Skenario Testing
	test('res.json() message, data', done => {
		const req = mockRequest();
		const res = mockResponse();
		// Call Function Needed to Testing
		getListAccount(req, res);
		// Expectation Output
		expect(res.json).toBeCalledWith({ message: "GET Account API", data: [] });
		// Closing Statement for Scenario Testing
		done();
	})
})

