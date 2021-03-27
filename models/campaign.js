const { Model, DataTypes } = require('sequelize')
const User = require('./User')
const sequelize = require('../config/connection')
const Character = require('./Character')

class Campaign extends Model {}

Campaign.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
    // characterId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Character,
    //     key: 'id'
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'campaign'
  }
)

module.exports = Campaign
