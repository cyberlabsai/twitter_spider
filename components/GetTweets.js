const Client = require('./Client')
const logger = require('./Logger')

const GetTweets = async (filter, until) => {
  logger.info('components.GetTweets: Flow Started!')
  let tweets = await Client().get('search/tweets', { q: filter, until: until, count: 100 })
  tweets = tweets.statuses.filter(elm => ((elm.text[0] + elm.text[1]) !== 'RT'))
  tweets = tweets.map(elm => {
    const tweet = {
      id: elm.id_str,
      createdAt: elm.created_at,
      tweetText: elm.text,
      hashtag: filter,
      lang: elm.lang
    }
    return tweet
  })
  logger.info('components.GetTweets: Flow Ended!')
  return Promise.all(tweets)
}

module.exports = GetTweets
