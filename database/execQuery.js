const { database, pgp } = require('./database')
const fs = require('fs')

const get = async (name, obj = []) => {
  return new Promise((resolve, reject) => {
    let query = fs.readFileSync(`./database/SQL/${name}.sql`).toString()
    return database.query(pgp.as.format(query, obj))
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

module.exports = {
  get
}
