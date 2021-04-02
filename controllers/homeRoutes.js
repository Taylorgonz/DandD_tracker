const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const { User, Campaign, Character } = require('../models');
const { route } = require('./api/campaign-routes');

router.get('/', (req, res) => {
 if (req.oidc.isAuthenticated()) {
   res.redirect('/profile');
 } else {
  res.render('homepage');
 }
})


router.get('/character-builder', requiresAuth(), async (req, res) => {
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

    const nickname = req.oidc.user.nickname;

    res.render('profile', {
      user,
      campaigns,
      characters,
      nickname
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;