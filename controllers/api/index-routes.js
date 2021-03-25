const router = require('express').Router();

const campaignRoutes = require('./campaign-routes');
const characterRoutes = require('./character-routes');
const userRoutes = require('./user-routes');

router.use('/campaigns', campaignRoutes);
router.use('/characters', characterRoutes);
router.use('/users', userRoutes);

module.exports = router;