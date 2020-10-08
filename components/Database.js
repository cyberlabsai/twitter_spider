require('dotenv').config()
const promise = require('bluebird')
const fs = require('fs')

const options = {
  promiseLib: promise
}
const pg = require('pg-promise')(options)

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const user = DB_USER
const password = DB_PASS
const host = DB_HOST
const port = DB_PORT
const database = DB_NAME

const getDB = pg({
  host,
  port,
  database,
  user,
  password
})

const QueryMaker = async (file, arr = []) => {
  const query = await fs.readFileSync(
    `./queries/${file}.sql`
  )
    .toString()
  const result = await getDB
    .query(
      pg
        .as
        .format(
          query,
          arr
        )
    )

  return result
}

module.exports = QueryMaker
