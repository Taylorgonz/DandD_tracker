const Campaign = require('./Campaign');
const Character = require('./Character');
const User = require('./User');
const UserCampaign = require('./UserCampaign');

// Campaign.belongsTo(User, {
  
// });
// User.hasMany(Campaign, {
//   foreignKey: 'dmId'
// });

Campaign.belongsToMany(User, {
  through: {
    model: UserCampaign
  },
  as: 'campaign_users'
});
User.belongsToMany(Campaign, {
  through: {
    model: UserCampaign
  },
  as: 'user_campaigns'
});

Character.belongsTo(Campaign, {
});
Campaign.hasMany(Character, {
  foreignKey: 'campaign_id'
});

User.hasMany(Character, {
  foreignKey: 'user_id'
});
Character.belongsTo(User, {
});

module.exports = {
  Campaign,
  Character,
  User,
  UserCampaign
}
