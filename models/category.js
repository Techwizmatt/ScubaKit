const path = require('path')
const libraries = require(path.join(process.cwd(), '/libraries'))

module.exports = (database, DataTypes) => {
  const category = database.define('category', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      get () {
        return this.getDataValue('name').split(' ').map(word => {
          return word.toString().charAt(0).toUpperCase() + word.toString().slice(1)
        }).join(' ')
      }
    },
    key: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
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

  category.processAssociations = () => {
    const associations = []

    return Promise.allSettled(associations)
  }

  category.processSetup = () => {

  }

  return category
}
