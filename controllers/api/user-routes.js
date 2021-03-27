const router = require('express').Router();
const { Campaign, Character, User } = require('../../models');

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
                ]
            },
            {
                model: Campaign,
                attributes: [
                    'id', 
                    'campaign_name', 
                    'user_id'
                ]
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

// User login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    })
        .then(userData => {
            if (!userData) {
                res.json(400).json({ message: 'That username or password is incorrect' });
                return;
            };

            const validPassword = userData.passwordConfirm(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: "That username or password is incorrect" });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.user_name = userData.user_name;
                req.session.loggedIn = true;

                // Add message saying user is logged in?
            });
        });
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Update a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'No user found with that ID' });
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with that ID' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;