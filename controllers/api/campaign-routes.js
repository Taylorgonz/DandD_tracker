const router = require('express').Router()
const { Campaign, User } = require('../../models')
const {auth} = require('express-openid-connect')

// Get all campaigns
router.get('/', (req, res) => {
  Campaign.findAll({
    attributes: [
      'id',
      'campaign_name',
      'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['user_name'],
        as: 'campaign_users'
      }
    ]
  })
    .then(campaignData => res.json(campaignData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Get a single campaign by Id
router.get('/:id', (req, res) => {
  Campaign.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'campaign_name',
      'user_id',
      'dm_id'
    ],
  })
    .then(campaignData => {
      if (!campaignData) {
        res.status(404).json({ message: 'Campaign not found' })
      }
      res.json(campaignData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Create a new campaign
router.post('/', (req, res) => {
  const user_id = req.oidc.user.sub
  Campaign.create({
    campaign_name: req.body.campaign_name,
    user_id: user_id,
    dm_id: user_id
  })
    .then(campaignData => res.json(campaignData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Update a campaign
router.put('/:id', (req, res) => {
  Campaign.update(
    {
      campaign_name: req.body.campaign_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(campaignData => {
      if (!campaignData) {
        res.status(404).json({ message: 'Campaign not found' })
        return
      }
      res.json(campaignData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// Delete a campaign
router.delete('/:id', (req, res) => {
  Campaign.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(campaignData => {
      if (!campaignData) {
        res.status(404).json({ message: 'Campaign not found' })
        return
      }
      res.json(campaignData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
