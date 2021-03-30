const router = require('express').Router()
const passport = require('passport')
const { User, Campaign, Character } = require('../models')

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
  } catch (err) {
    res.status(500).json(err);
  }

})

// middleware to check if user is logged in
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401)
}
// router.get('/profile', async (req, res) => {
//   res.render('profile')
// });
// protected route
router.get('/profile', async (req, res) => {
try {
  const user = await User.findOne({
    where: {
      id: 1
    },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Character,
        attributes: ['character_name']
      },
      {
        model: Campaign,
        as: 'user_campaigns'
      }
    ],
    raw: true
  })
  res.render('profile', {
    user
  })
} catch (err) {
  res.status(500).json(err)
}
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