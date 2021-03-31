const router = require('express').Router()
const passport = require('passport')
const { User, Campaign, Character } = require('../models')
const { route } = require('./api/campaign-routes')
router.get('/', (req, res) => {
 res.redirect('/profile')
})
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
          attributes: [
            'id',
            'campaign_name',
            'userId'
          ],
          as: 'user_campaigns'
        }
      ],
      raw: true
    })

    const campaigns = await Campaign.findAll({
      where: {
        user_id: 1
      },
      attributes: [
        'id',
        'campaign_name',
        'user_id'
      ],
      raw: true
    })

    const characters = await Character.findOne({
      where: {
        user_id: 1
      },
      attributes: [
        'id',
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma',
        'armor',
        'speed',
        'hitpoints_current',
        'hitpoints_temp',
        'hit_dice',
        'character_name',
        'character_race',
        'character_class',
        'traits',
        'items',
        'flaws',
        'notes',
        'user_id',
        'campaign_id'
      ],
      raw: true
    })

    res.render('profile', {
      user,
      campaigns,
      characters
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