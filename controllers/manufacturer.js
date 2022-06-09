const path = require('path')
const db = require(path.join(process.cwd(), '/models'))
const libraries = require(path.join(process.cwd(), '/libraries'))

const manufacturer = {
  /**
   * Create a manufacturer within the manufacturers table
   * @param manufacturer | Object with keys and values according to manufacturers table
   * @returns {Promise<Object|Error>}
   */
  doCreate (manufacturer) {
    return new Promise((resolve, reject) => {
      db.models.manufacturer.create(manufacturer).then(manufacturer => {
        resolve(manufacturer)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = manufacturer
