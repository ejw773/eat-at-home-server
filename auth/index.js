module.exports = (app, passport) => {

    // -----------------------------------------------------------------------------
    //                                LOGIN
    // -----------------------------------------------------------------------------
    app.get('/auth/github', passport.authenticate('github'));

    // -----------------------------------------------------------------------------
    //                                CALLBACK
    // -----------------------------------------------------------------------------
    app.get(
      '/auth/github/callback',
      passport.authenticate('github', {failureRedirect: '/login'}),
      (req, res) => res.redirect(`${process.env.FRONTEND}`)
    );

    // logout
    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect(`${process.env.FRONTEND}`);
    })
  };
