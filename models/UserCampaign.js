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
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    campaign_id: {
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
