var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ERROR_MIDDLEWARE = require('./middlewares/error.middleware');

var POOL = require('./config/db');

const INDEX_ROUTES = require('./routes/index');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

var app = express();

app.use(cors());

app.use(session({
	secret: process.env.GA_CLIENT_ID,
	resave: false,
	saveUninitialized: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Check Connection to Database
POOL.connect((err) => {
	if (err) {
		return console.error('Error acquiring client', err
		);
	}
	console.log('Connected to Database');
});

app.use(INDEX_ROUTES);

app.use(ERROR_MIDDLEWARE);


module.exports = app;
