require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const passport = require('passport');
const session = require('express-session')
const auth = require('./auth');
const gitHubStrategy = require('./auth/strategy/github');

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




// Temporary fake data
const userData = [
    {
        username: "vertigo_58",
        firtsname: "Alfred",
        lastname: "Hitchcock",
        email: "i_make_thrillers@hollywood.com",
        id: 1
    },
    {
        username: "sherlock_jr",
        firstname: "Buster",
        lastname: "Keaton",
        email: "i_make_comedies@silverscreen.com",
        id: 2
    }
];

const businessData = [
    {
        businessname: "Hello Fresh",
        website: "https://www.hellofresh.com/",
        category: "meal_kit",
        id: 1
    },
    {
        businessname: "Green Chef",
        website: "https://www.greenchef.com/",
        category: "meal_kit",
        id: 2
    },
    {
        businessname: "Zero Grocery",
        website: "zerogrocery.com",
        category: "grocery",
        id: 3
    }
];

const userSaves = [
    {
        userid: 1,
        businessid: 1
    },
    {
        userid: 2,
        businessid: 2
    },
    {
        userid: 2,
        businessid: 3
    }
]

const userReviews = [
    {
        userid: 1,
        businessid: 3,
        review_content: "The food from this grocery was more stale than a corpse in one of my films."
    },
    {
        userid: 2,
        businessid: 2,
        review_content: "I love the fact that cooking is now easier than doing my own film stunts."
    }
];

const userRatings = [
    {
        userid: 1,
        businessid: 3,
        user_rating: 1
    },
    {
        userid: 2,
        businessid: 2,
        user_rating: 5
    }
]

auth(app, passport);

app.use('/', express.static('public'));


app.get('/success', (req, res) => {
    res.json({login: 'success'});
})

app.get('/api/biz', (req, res) => {
    res.json(businessData);
})

app.get('/api/users', (req, res) => {
    res.json(userData);
})

app.get('/api/saves', (req,res) => {
    res.json(userSaves);
})

app.get('/api/reviews', (req, res) => {
    res.json(userReviews);
})

app.get('/api/ratings', (req, res) => {
    res.json(userRatings);
})


let PORT = 3000;

app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
});