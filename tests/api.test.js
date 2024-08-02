const request = require('supertest');
const app = require('../app');

describe('API TESTING', () => {
	test('GET /api/v1/member', async () => {
		const response = await request(app).get('/api/v1/member').set('Authorization', 'Bearer token');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toEqual('GET Member API');
		expect(response.body).toHaveProperty('data');
	});


});