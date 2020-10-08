require('dotenv').config()
const logger = require('./Logger')
const QueryMaker = require('./Database')
const GetTweets = require('./GetTweets')

const Months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
}
// The twitter date came with wrong timestamp format.
const ConvertCreatedAt = createdAt => {
  // Thu Oct 01 17:42:18 +0000 2020
  const dateT = createdAt.split(' ')
  createdAt = `${dateT[5]}-${Months[dateT[1]]}-${dateT[2]} ${dateT[3]}`
  return createdAt
}

const Main = async (filter, fromData = '') => {
  logger.info('components.Main: Flow Started!')
  try {
    let tweets = await GetTweets(filter, fromData)
    tweets = await tweets.map(async tweet => {
      tweet.created_at = ConvertCreatedAt(tweet.createdAt)
      return QueryMaker('insertTweet', tweet)
    })
    return Promise.all(tweets)
  } catch (err) {
    let message
    if (err.message) {
      message = err.message
    } else {
      [{ message }] = err
    }
    logger.error(`components.Main: ${message}`)
  }
}

module.exports = Main
