const express = require('express');
const path = require('path');
const helmet = require('helmet');
const passport = require('passport');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv').config();

const app = express();

app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

const store = new RedisStore({url:process.env.REDIS_URL});

app.use(session({
	store: store,
	secret: 'milhouse',
	resave: true,
	saveUninitialized: false,
	name: 'store-search-cookie',
	ttl: 900000,
	prefix:'session',
	cookie: {maxAge: 900000}
}));

app.use(passport.initialize());
app.use(passport.session());

//google oauth setup
passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL
	},
	 (accessToken, refreshToken, profile, done) => {

		if (profile._json.domain !== 'bigcommerce.com') {
			done(new Error('Not a Bigcommerce account'));
			res.redirect('login').send('login failed');
		} else {
			console.log(profile._json.displayName + ' logged in.');
			done(null, profile);
		}
	}
));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log(req.sessionID);
		return next();
	}
	res.redirect(302, '/login');
}

app.get('/auth/google',
	passport.authenticate('google', {
		prompt: 'select_account',
		scope: [
			'profile',
			'email',
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/plus.profile.emails.read'
		]
	}));

app.get('/auth/google/callback',
	passport.authenticate('google', {failureRedirect: '/login', successRedirect: '/' }));

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/',
	ensureAuthenticated,
	(req, res) => {
		res.sendFile(path.join(__dirname + '/views/index.html'));
		console.log(req.session.user);
	});

module.exports = app;
