require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const passport = require('passport');
const session = require('express-session')
const auth = require('./auth');
const gitHubStrategy = require('./auth/strategy/github');
const { User, Ratings, Reviews, Saved_Companies } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: "super secret",
  cookie: {maxAge: 60000}
}))
app.use(passport.initialize());
app.use(passport.session());

// strategies
passport.use(gitHubStrategy);

auth(app, passport);

app.use('/', express.static('public'));

app.get('/success', (req, res) => {
    res.json({login: 'success'});
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/api/saves', async (req, res) => {
    const saves = await Saved_Companies.findAll();
    res.json(saves);
});

app.get('/api/ratings', async (req, res) => {
    const ratings = await Ratings.findAll();
    res.json(ratings);
});

app.get('/api/reviews', async (req, res) => {
    const reviews = await Reviews.findAll();
    res.json(reviews);
});

app.listen(process.env.PORT, () => {
    console.log(`The server is running at port ${process.env.PORT}`)
});
