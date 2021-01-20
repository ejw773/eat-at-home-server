require('dotenv').config();
const bodyParser = require('body-parser');
const urlencodedParser = require('urlencoded-parser');
const express = require('express');
const fetch = require('node-fetch');
const passport = require('passport');
const session = require('express-session')
const auth = require('./auth');
const gitHubStrategy = require('./auth/strategy/github');
const { User, Ratings, Reviews, Saved_Companies } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);
app.use(session({
  secret: "R6jeFlIo1EukoiSj",
  cookie: {maxAge: 60000}
}))
app.use(passport.initialize());
app.use(passport.session());

// strategies
passport.use(gitHubStrategy);

auth(app, passport);

app.use(express.static('public'));

app.get('/success', (req, res) => {
    res.json({login: 'success'});
});

// APP.GET

// APP.GET / Authentication
app.get('/success', (req, res) => {
    // res.json({login: 'success'});
    res.redirect(`${process.env.FRONTEND}profile`);
});

app.get('/logout', (req, res) => {
  res.json({status: "logged out"})
})

// APP.GET / Specific Company's Reviews
app.get('/api/comp/review/:compid', urlencodedParser, async (req, res) => {
  const user = await Reviews.findAll({
    where: {
      company_id: req.params.compid
    }
  });
  res.json(user);
});

//APP.GET / Specific Company's Ratings
app.get('/api/comp/rating/:compid', urlencodedParser, async (req, res) => {
  const user = await Ratings.findAll({
    where: {
      company_id: req.params.compid
    }
  });
  res.json(user);
});

// APP.GET / USERS
// APP.GET / All Users
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// APP.GET / Specific User
app.get('/api/users/:userid', urlencodedParser, async (req, res) => {
  console.log("individual user requested");
  const user = await User.findAll({
    where: {
      id: req.params.userid
    }
  });
  res.json(user);
});

// APP.GET / Specific User's Ratings
app.get('/api/users/ratings/:userid', urlencodedParser, async (req, res) => {
  const user = await Ratings.findAll({
    where: {
      user_id: req.params.userid
    }
  });
  res.json(user);
});

// APP.GET / Specific User's Reviews
app.get('/api/users/reviews/:userid', urlencodedParser, async (req, res) => {
  const userid = req.params.userid;
  const reviews = await Reviews.findAll({
    where: {
      user_id: req.params.userid
    }
  })
  res.json(reviews);
});

// APP.GET Specific User's Saves
app.get('/api/saves/:userid', urlencodedParser, async (req, res) => {
  console.log("user's saves requested");
  const saves = await Saved_Companies.findAll({
    where: {
      user_id: req.params.userid
    }
  });
  res.json(saves);
});


// APP.GET / ALL OTHERS
// APP.GET All Saves
app.get('/api/saves', async (req, res) => {
    const saves = await Saved_Companies.findAll();
    res.json(saves);
});

// APP.GET All Reviews
app.get('/api/reviews', async (req, res) => {
    const reviews = await Reviews.findAll();
    res.json(reviews);
});

// APP.GET All Ratings
app.get('/api/ratings', async (req, res) => {
    const ratings = await Ratings.findAll();
    res.json(ratings);
});


// APP.POST

// APP.POST - Adding a User
app.post('/api/users', urlencodedParser, async (req, res) => {
  const { displayName, userName, email } = req.body;
  const newUser = await User.create({
    displayName,
    userName,
    email
  });
  res.json({
    id: newUser.id
  });
});

// APP.POST - Adding a Save
app.post('/api/saves', urlencodedParser, async (req, res) => {
  const { user_id, company_id } = req.body;
  const newSave = await Saved_Companies.create({
    user_id,
    company_id
  });
  res.json({
    id: newSave.id
  })
});

// APP.POST - Adding a Review
app.post('/api/reviews', urlencodedParser, async (req, res) => {
  const { review, user_id, company_id } = req.body;
  const newReview = await Reviews.create({
    review,
    user_id,
    company_id
  });
  res.json({
    id: newReview.id
  })
});

// APP.POST - Adding a Rating
app.post('/api/ratings', urlencodedParser, async (req, res) => {
  const { user_id, company_id, rating } = req.body;
  const newRating = await Ratings.create({
    user_id,
    company_id,
    rating
  });
  res.json({
    id: newRating.id
  })
});



// ======================= NONE OF THE 'PUT' ITEMS WORK RIGHT NOW =======================

// APP.PUT
// APP.PUT - Updating a User
app.put('/api/users/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const { displayName, userName, email } = req.body;
  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });
  res.json(updatedUser)
})

// APP.PUT - Updating a Review
app.put('/api/reviews/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const updatedReview = await Reviews.update(req.body, {
    where: {
      id
    }
  });
  res.json(updatedReview);
});

// APP.PUT - Updating a Rating
app.put('/api/ratings/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const updatedRating = await Ratings.update(req.body, {
    where: {
      id
    }
  });
  res.json(updatedRating);
})

// APP.DELETE
// APP.DELETE - Deleting a User
app.delete('/api/users/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
    where: {
      id
    }
  });
  res.json(deletedUser)
});

// APP.DELETE - Deleting a Save
app.delete('/api/saves/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const deletedSave = await Saved_Companies.destroy({
    where: {
      id
    }
  });
  res.json(deletedSave)
});

// APP.DELETE - Deleting a Review
app.delete('/api/reviews/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const deletedReview = await Reviews.destroy({
    where: {
      id
    }
  });
  res.json(deletedReview);
});

// APP.DELETE - Deleting a Rating
app.delete('/api/ratings/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const deletedRating = await Ratings.destroy({
    where: {
      id
    }
  });
  res.json(deletedRating);
});

// APP.LISTEN
app.listen(process.env.PORT, () => {
    console.log(`The server is running at port ${process.env.PORT}`)
});
