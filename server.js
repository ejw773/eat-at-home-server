require('dotenv').config();
const bodyParser = require('body-parser');
const urlencodedParser = require('urlencoded-parser');
const express = require('express');
const fetch = require('node-fetch');
const passport = require('passport');
const session = require('express-session')
const auth = require('./auth');
const gitHubStrategy = require('./auth/strategy/github');
const { User, Reviews, Saved_Companies } = require('./models');

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
app.use('/auth', auth);

// app.get('/success', (req, res) => {
//     res.json({login: 'success'});
// });

// APP.GET

// APP.GET / Authentication
app.get('/success', (req, res) => {
    // res.json({login: 'success'});
    res.redirect(`${process.env.FRONTEND}profile`);
});

app.get('/logout', (req, res) => {
  res.json({status: "logged out"})
})

// APP.GET / Specific Company's Ratings & Reviews
app.get('/api/comp/review/:compid', urlencodedParser, async (req, res) => {
  const user = await Reviews.findAll({
    where: {
      company_id: req.params.compid
    }
  });
  res.json(user);
});


// APP.GET / USERS
// APP.GET / All Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  }
  catch(e) {
    console.log(e.toString());
  }
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
  console.log(session.user);
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

// APP.GET All Reviews and Ratings
app.get('/api/reviews', async (req, res) => {
    const reviews = await Reviews.findAll();
    res.json(reviews);
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
app.post('/api/saves/:user_id', urlencodedParser, async (req, res) => {
  const user_id = req.params.user_id;
  const company_id = req.body.company_id;
  const newSave = await Saved_Companies.create({
    user_id,
    company_id
  });
  res.json({
    id: newSave.id
  })
});

//APP.POST - Adding or Updating a Review
app.post('/api/review', urlencodedParser, async (req, res) => {
  const { user_id, company_id, review } = req.body;
  const foundItem = await Reviews.findOne({where: {
    user_id,
    company_id
  }});
  if (!foundItem) {
    console.log('need to make a new one');
    const newReview = await Reviews.create({
      user_id,
      company_id,
      review
    });
    res.json({newReview})
  } else {
    console.log('need to update the old one')
    console.log(review);
    const updatedReview = await Reviews.update({review: review}, {
      where: {
        user_id,
        company_id
      }
    });
    const returnUpdatedReview = await Reviews.findOne({
      where: {
        user_id,
        company_id
      }
    })
  res.json({review: returnUpdatedReview.review});
  }
})

// APP.POST - Adding or Updating a Rating
app.post('/api/rating', urlencodedParser, async (req, res) => {
  const { user_id, company_id, rating } = req.body;
  console.log(req.body);
  const foundItem = await Reviews.findOne({where: {
    user_id,
    company_id
  }});
  if (!foundItem) {
    console.log('need to make a new one');
    const newReview = await Reviews.create({
      user_id,
      company_id,
      rating
    });
    res.json({newReview})
  } else {
    console.log('need to update the old one')
    console.log(rating);
    const updatedRating = await Reviews.update({rating: rating}, {
      where: {
        user_id,
        company_id
      }
    });
    const returnUpdatedRating = await Reviews.findOne({ where: {
      user_id: user_id,
      company_id: company_id
    }})
  res.json({rating: returnUpdatedRating});
  }
})



// APP.PUT
// APP.PUT - Updating a User - Let's not use this just now...
app.put('/api/users/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const { displayName, userName, email } = req.body;
  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });
  console.log(id);
  const returnUpdatedUser = await User.findByPk(req.params.id)
  res.json(returnUpdatedUser)
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

// APP.DELETE - Deleting a Review with Rating
app.delete('/api/reviews/:id', urlencodedParser, async (req, res) => {
  const { id } = req.params;
  const deletedReview = await Reviews.destroy({
    where: {
      id
    }
  });
  res.json(deletedReview);
});

// APP.LISTEN
app.listen(process.env.PORT, () => {
    console.log(`The server is running at port ${process.env.PORT}`)
});
