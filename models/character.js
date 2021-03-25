const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Character extends Model {}

Character.init (
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
        cpnstitution: {
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
        character_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "user",
              key: "id"
            }
        },
        campaign_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "campaign",
              key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'category',
      }
);

module.exports = Character;