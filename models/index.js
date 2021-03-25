const Campaign = require("./campaign");
const Character = require("./character");
const User = require("./user");

Campaign.hasMany(User, {
    foreignKey: "user_id",
});

Character.hasOne(Campaign, {
    foreignKey: "campaign_id",
});

Character.hasOne(User, {
    foreignKey: "user_id",
});


module.exports= {
    Campaign,
    Character,
    User,
};