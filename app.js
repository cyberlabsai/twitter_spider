const cron = require('node-cron')
const { get } = require('./database/execQuery')
const { getTweets } = require('./query/getTweets')

const main = () => {
  return new Promise((resolve, reject) => {
    return get('getHashtags')
      .then(hashtags => {
        hashtags = hashtags.map(elm => {
          return getTweets(elm.hashtags, '2019-08-23')
        })
        return Promise.all(hashtags)
          .then(res => {
            let tweets = []
            res.forEach(elm => elm.forEach(el => tweets.push(el)))
            console.log(res)
            tweets = tweets.map(elm => {
              let arr
              arr = [
                elm.id,
                elm.createdAt,
                elm.tweet_text,
                elm.image,
                elm.imageUrl,
                elm.user.screenName,
                elm.user.name,
                elm.user.imageUrl]
              return get('insertTweets', arr)
            })
            return resolve(Promise.all(tweets))
          })
      })
      .catch(err => reject(err))
  })
}
cron.schedule('*/1 * * * * *', () => {
  main()
})
