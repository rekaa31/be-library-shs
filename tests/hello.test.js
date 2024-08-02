const GREETING = require('./../utils/hello.util');

test('CASE_U1_T1: Greeting Function Testing', () => {
	expect(GREETING('Reka')).toBe('Hello Reka');
});

test('CASE_U1_T2: Greeting Function Testing', () => {
	expect(GREETING()).toBe('Hello, stranger!');
});