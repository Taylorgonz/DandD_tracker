const router = require('express').Router();
const { Campaign, Character, User } = require('../../models');

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
                attributes: ['user_name']
            }
        ]
    })
    .then(campaignData => res.json(campaignData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single campaign by Id
router.get('/:id', (req, res) => {
    Campaign.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'campaign_name',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: ['user_name']
            }
        ]
    })
    .then(campaignData => {
        if (!campaignData) {
            res.status(404).json({ message: 'Campaign not found' });
        }
        res.json(campaignData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a new campaign
router.post('/', userAuth, (req, res) => {
    Campaign.create({
        campaign_name: req.body.campaign_name,
        creator_id: req.session.user_id
    })
    .then(campaignData => res.json(campaignData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a campaign
router.put('/:id', userAuth, (req, res) => {
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
            res.status(404).json({ message: 'Campaign not found' });
            return;
        }
        res.json(campaignData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a campaign
router.delete('/:id', userAuth, (req, res) => {
    Campaign.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(campaignData => {
        if (!campaignData) {
            res.status(404).json({ message: 'Campaign not found' });
            return;
        }
        res.json(campaignData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;