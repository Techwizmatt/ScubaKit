const path = require('path')
const libraries = require(path.join(process.cwd(), '/libraries'))

module.exports = (database, DataTypes) => {
  const equipment = database.define('equipment', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    manufacturerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    purchaseUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: 'DATETIME',
      allowNull: false,
      defaultValue: database.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: 'DATETIME',
      allowNull: false,
      defaultValue: database.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
      type: 'DATETIME'
    }
  }, {
    underscored: false,
    paranoid: true,
    timestamps: true
  })

  equipment.processAssociations = () => {
    const associations = []

    associations.push(equipment.hasOne(database.models.manufacturer, {
      foreignKey: 'manufacturerId',
      targetKey: 'id',
      as: 'manufacturer',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    }))

    associations.push(equipment.hasOne(database.models.category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      as: 'category',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    }))

    return Promise.allSettled(associations)
  }

  equipment.processSetup = () => {

  }

  return equipment
}
