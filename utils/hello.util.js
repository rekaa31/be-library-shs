function greeting(name) {
  if (!name) {
	return 'Hello, stranger!';
  } else {
	return `Hello ${name}`;
  }
}

module.exports = greeting;