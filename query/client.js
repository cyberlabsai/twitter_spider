const config = require('../config')
const Twitter = require('twitter')

const client = (key) => new Twitter({
  consumer_key: config[key].consumer_key,
  consumer_secret: config[key].consumer_secret,
  access_token_key: config[key].access_token_key,
  access_token_secret: config[key].access_token_secret
})

module.exports = {
  client
}
