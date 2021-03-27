const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;