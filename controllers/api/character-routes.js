const router = require('express').Router()
const { Campaign, Character, User } = require('../../models')

// Get all characters
router.get('/', (req, res) => {
  Character.findAll({
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
    include: [
      {
        model: User,
        attributes: ['user_name']
      },
      {
        model: Campaign,
        attributes: [
          'id',
          'campaign_name',
          'user_id'
        ],

        include: {
          model: User,
          attributes: ['user_name'],
          as: 'campaign_users'
        }
      }
    ]
  })
    .then(characterData => res.json(characterData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Get a single character by Id
router.get('/:id', (req, res) => {
  Character.findOne({
    where: {
      id: req.params.id
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
    include: [
      {
        model: User,
        attributes: ['user_name']
      },
      {
        model: Campaign,
        attributes: [
          'id',
          'campaign_name',
          'user_id'
        ],
        include: {
          model: User,
          attributes: ['user_name'],
          as: 'campaign_users'
        }
      }
    ]
  })
    .then(characterData => {
      if (!characterData) {
        res.status(404).json({ message: 'No character found with that id' })
      }
      res.json(characterData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Create a new character
router.post('/', (req, res) => {
  Character.create({
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intelligence: req.body.intelligence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma,
    armor: req.body.armor,
    speed: req.speed.armor,
    hitpoints_current: req.body.hitpoints_current,
    hitpoints_temp: req.body.hitpoints_temp,
    hit_dice: req.body.hit_dice,
    character_name: req.body.character_name,
    character_race: req.body.character_race,
    character_class: req.body.character_class,
    traits: req.body.traits,
    items: req.body.items,
    flaws: req.body.flaws,
    notes: req.body.notes,
    campaign_id: req.body.campaign_id,
    creator_id: req.session.user_id
  })
    .then(characterData => res.json(characterData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Update a character
router.put('/:id', (req, res) => {
  Character.update(
    {
      strength: req.body.strength,
      dexterity: req.body.dexterity,
      constitution: req.body.constitution,
      intelligence: req.body.intelligence,
      wisdom: req.body.wisdom,
      charisma: req.body.charisma,
      armor: req.body.armor,
      speed: req.speed.armor,
      hitpoints_current: req.body.hitpoints_current,
      hitpoints_temp: req.body.hitpoints_temp,
      hit_dice: req.body.hit_dice,
      character_name: req.body.character_name,
      character_race: req.body.character_race,
      character_class: req.body.character_class,
      traits: req.body.traits,
      items: req.body.items,
      flaws: req.body.flaws,
      notes: req.body.notes,
      campaign_id: req.body.campaign_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(characterData => {
      if (!characterData) {
        res.status(404).json({ message: 'Character not found' })
        return
      }
      res.json(characterData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Delete a character
router.delete('/:id', (req, res) => {
  Character.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(characterData => {
      if (!characterData) {
        res.status(404).json({ message: 'Character not found' })
        return
      }
      res.json(characterData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
