const Campaign = require('./Campaign');
const Character = require('./Character');
const User = require('./User');
const UserCampaign = require('./UserCampaign');

Campaign.belongsTo(User, {
  foreignKey: 'dmId'
});
User.hasMany(Campaign, {
  foreignKey: 'dmId'
});

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
  foreignKey: 'campaignId'
});
Campaign.hasMany(Character, {
  foreignKey: 'campaignId'
});

User.hasMany(Character, {
  foreignKey: 'userId'
});
Character.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  Campaign,
  Character,
  User,
  UserCampaign
}
