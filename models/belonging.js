const path = require('path')
const libraries = require(path.join(process.cwd(), '/libraries'))

module.exports = (database, DataTypes) => {
  const belonging = database.define('belonging', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    equipmentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    purchaseDate: {
      type: DataTypes.DATEONLY,
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

  belonging.processAssociations = () => {
    const associations = []

    associations.push(belonging.hasOne(database.models.equipment, {
      foreignKey: 'equipmentId',
      targetKey: 'id',
      as: 'equipment',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    }))

    return Promise.allSettled(associations)
  }

  belonging.processSetup = () => {

  }

  return belonging
}
