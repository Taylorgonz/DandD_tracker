const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const { User, Campaign, Character } = require('../models');

router.get('/', async (req, res) => {
  
  if (req.oidc.isAuthenticated()) {
    userData = await User.findOne({ where: { email: req.oidc.user.email } })
    if (!userData) {
      userData = User.create(
        {
          id: req.oidc.user.sub,
          user_name: req.oidc.user.nickname,
          email: req.oidc.user.email
        }
      )
    }
    res.redirect('/profile');
  } else {
    res.render('homepage');
  }
})


router.get('/profile', requiresAuth(), async (req, res) => {
  try {

    const user_id = req.oidc.user.sub;
    const user = await User.findOne({
      where: {
        id: user_id
      },
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
            'user_id'
          ],
          as: 'user_campaigns'
        }
      ],
      raw: true
    })

    const campaigns = await Campaign.findAll({
      where: {
        user_id: user_id
      },
      attributes: [
        'id',
        'campaign_name',
        'user_id'
      ],
      include: [
        {
          model: User,
          attributes: ['user_name', 'id'],
          as: 'campaign_users'
        }
      ],
      raw: true
    })

    const characters = await Character.findOne({
      where: {
        user_id: user_id
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
      characters,
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/character-builder', requiresAuth(), async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      raw: true
    })

    const user_id = req.oidc.user.sub;
    res.render('character-builder', {
      campaigns,
      user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }

})

router.get('/campaign-builder', requiresAuth(), async (req, res) => {
  try {

    const user_id = req.oidc.user.sub;
    res.render('campaign-builder', {
      user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;