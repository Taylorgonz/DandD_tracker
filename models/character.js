const { Model, DataTypes } = require('sequelize')
const User = require('./User')
const Campaign = require('./Campaign')
const sequelize = require('../config/connection')

class Character extends Model { }

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    armor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hitpoints_current: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hitpoints_temp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hit_dice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    character_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    character_race: {
      type: DataTypes.STRING,
      allowNull: false
    },
    character_class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    traits: {
      type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flaws: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    role: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'role'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'character'
  }
)

module.exports = Character
