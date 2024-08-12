var express = require('express');
var router = express.Router();
const V1_ROUTER = require('./api');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({
  clientID: process.env.GA_CLIENT_ID,
  clientSecret: process.env.GA_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    name: profile.name,
    emails: profile.emails,
    photos: profile.photos,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return done(null, user);
}));

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log(obj);
  done(null, obj);
});

function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', V1_ROUTER);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL for handling the OAuth 2.0 response
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), 
  (req, res) => {
    res.json({
      status: true,
      message: 'You are authenticated',
      accessToken: req.user.accessToken,
      refreshToken: req.user.refreshToken
    })
  }
);

router.get('/test-page', (req, res) => {
  res.json({
    status: true,
    message: 'You are authenticated',
    accessToken: req.user.accessToken,
    refreshToken: req.user.refreshToken
  })
})

module.exports = router;
