const path = require('path')
const libraries = require(path.join(process.cwd(), '/libraries'))

module.exports = (database, DataTypes) => {
  const manufacturer = database.define('manufacturer', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    domain: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    logoUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true
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

  manufacturer.processAssociations = () => {
    const associations = []

    return Promise.allSettled(associations)
  }

  manufacturer.processSetup = () => {

  }

  return manufacturer
}
