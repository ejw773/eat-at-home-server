const GitHubStrategy = require('passport-github').Strategy
const passport = require('passport')
const User = require('../../models').User;

const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.GH_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // check to see if user already exists in the database
    let user = await User.findOne({where: { github_login: parseInt(profile.id) }})
    if(!user) {
      user = await User.build({
        github_login: parseInt(profile.id),
        displayName: profile.displayName,
        userName: profile.username,
        createAt: new Date(),
        updatedAt: new Date()
      })
      await user.save();
    }
    cb(null, user)
  }
);

passport.serializeUser(function(user, done) {
    // What goes INTO the session here; right now it's everything in User
    // this should really only be the User ID
    done(null, user);
});
passport.deserializeUser(function(id, done) {
    done(null, id);
    //This is looking up the User in the database using the information from the session "id"
    // Convert the ID into the User object.
});

// passport.serializeUser(function(user, done) {
//   console.log("Serialize user function: " + user.id)
//   done(null, user.id);
// });

// passport.deserializeUser(async function(id, done) {
//   console.log("Deserialize user function: " + id)
//   const user = await User.findByPk(id)
//   done(null, user);
// });

module.exports = gitHubStrategy;
