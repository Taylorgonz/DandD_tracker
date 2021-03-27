const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')
const Campaign = require('./Campaign')

class UserCampaign extends Model {}

UserCampaign.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    campaignId: {
      type: DataTypes.INTEGER,
      references: {
        model: Campaign,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_campaign'
  }
)

module.exports = UserCampaign