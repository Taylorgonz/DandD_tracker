const router = require('express').Router()
const passport = require('passport')
const Campaign = require('../models/campaign')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/character-builder', async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      raw: true
    })

    res.render('character-builder', { 
      campaigns
    });
  } catch(err) {
    res.status(500).json(err);
  }
  
})

// middleware to check if user is logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401)
}

// protected route
router.get('/profile', checkUserLoggedIn, (req, res) => {
  // LOGGED IN PROFILE PAGE GOES HERE
  // res.send('<h1>req.user.displayName</h1>)
})

// auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    res.redirect('/profile')
  }
)
//

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;
