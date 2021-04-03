const { Model, DataTypes } = require('sequelize')
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
      allowNull: true
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hitpoints_current: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    hitpoints_temp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    hit_dice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
      type: DataTypes.TEXT,
      allowNull: false
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    flaws: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
