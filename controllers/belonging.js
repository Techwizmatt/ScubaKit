const path = require('path')
const db = require(path.join(process.cwd(), '/models'))
const libraries = require(path.join(process.cwd(), '/libraries'))

const belonging = {
  /**
   * Create an belonging row within the belongings table
   * @param belonging | Object with keys and values according to belongings table
   * @returns {Promise<Object|Error>}
   */
  doCreate (belonging) {
    return new Promise((resolve, reject) => {
      db.models.belonging.create(belonging).then(belonging => {
        resolve(belonging)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * Read belonging information
   * @param id - Id of belonging object to perform query
   * @returns {Promise<Object|null>}
   */
  doRead (id) {
    return new Promise((resolve, reject) => {
      db.models.belonging.findOne({
        attributes: ['model', 'name', 'description', 'imageUrl', 'purchaseUrl'],
        include: [
          {
            model: db.models.equipment,
            as: 'equipment',
            attributes: ['price', 'purchaseDate', 'description', 'imageUrl'],
            include: [
              {
                model: db.models.manufacturer,
                as: 'manufacturer',
                attributes: ['name', 'logoUrl']
              },
              {
                model: db.models.category,
                as: 'category',
                attributes: ['name']
              }
            ]
          }
        ],
        where: {
          id: id,
          isActive: true
        }
      }).then(belonging => {
        resolve(belonging)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * Read all belonging information to a user
   * @returns {Promise<Object|null>}
   */
  doReadAll () {
    return new Promise((resolve, reject) => {
      db.models.belonging.findOne({
        attributes: ['model', 'name', 'description', 'imageUrl', 'purchaseUrl'],
        include: [
          {
            model: db.models.equipment,
            as: 'equipment',
            attributes: ['name', 'model', 'description', 'imageUrl'],
            include: [
              {
                model: db.models.manufacturer,
                as: 'manufacturer',
                attributes: ['name', 'logoUrl']
              },
              {
                model: db.models.category,
                as: 'category',
                attributes: ['name']
              }
            ]
          }
        ],
        where: {
          id: id,
          isActive: true
        }
      }).then(belonging => {
        resolve(belonging)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = belonging
