const router = require('express').Router();
const { User, Character, Campaign } = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Character,
                attributes: ['id', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'armor', 'speed', 'hitpoints_current', 'hitpoints_temp', 'hit_dice', 'character_name', 'character_race', 'character_class', 'traits', 'items', 'flaws', 'notes', 'user_id', 'campaign_id']
            },
            {
                model: Campaign,
                attributes: ['id', 'campaign_name', 'user_id']
            }
        ]
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Post - Create user
router.post('/', (req, res) => {
    User.create({
        user_name: req.body.user_name,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.user_name;
            req.session.loggedIn = true;

            res.json(userData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});