const path = require('path')
const db = require(path.join(process.cwd(), '/models'))
const libraries = require(path.join(process.cwd(), '/libraries'))

const equipment = {
  /**
   * Create an equipment row within the equipments table
   * @param equipment | Object with keys and values according to equipments table
   * @returns {Promise<Object|Error>}
   */
  doCreate (equipment) {
    return new Promise((resolve, reject) => {
      db.models.equipment.create(equipment).then(equipment => {
        resolve(equipment)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * Read equipment information
   * @param id - Id of equipment object to perform query
   * @returns {Promise<Object|null>}
   */
  doRead (id) {
    return new Promise((resolve, reject) => {
      db.models.equipment.findOne({
        attributes: ['model', 'name', 'description', 'imageUrl', 'purchaseUrl'],
        include: [
          {
            model: db.models.manufacturer,
            as: 'manufacturer',
            attributes: ['name', 'logUrl']
          },
          {
            model: db.models.category,
            as: 'category',
            attributes: ['name']
          }
        ],
        where: {
          id: id,
          isActive: true
        }
      }).then(equipment => {
        resolve(equipment)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * Read all equipment information
   * @returns {Promise<Object|null>}
   */
  doReadAll () {
    return new Promise((resolve, reject) => {
      db.models.equipment.findAll({
        attributes: ['model', 'name', 'description', 'imageUrl', 'purchaseUrl'],
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
        ],
        where: {
          isActive: true
        }
      }).then(equipment => {
        resolve(equipment)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = equipment
