const cron = require('node-cron')
const moment = require('moment-timezone')
const interval = process.env.interval || 1
const { get } = require('./database/execQuery')
const { getTweets } = require('./query/getTweets')
const { getImg } = require('./query/getImg')

const main = () => {
  return new Promise((resolve, reject) => {
    return get('getHashtags')
      .then(hashtags => {
        hashtags = hashtags.map(elm => {
          return getTweets(elm.hashtags, '2019-08-26')
        })
        return Promise.all(hashtags)
          .then(res => {
            let tweets = []
            res.forEach(elm => elm.forEach(el => tweets.push(el)))
            tweets = tweets.map(elm => {
              elm.createdAt = elm.createdAt ? moment(elm.createdAt).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss') : ''
              let url = `https://twitter.com/${elm.user.screenName}/status/${elm.id}`
              elm.url = url
              return getImg(elm)
            })
            return Promise.all(tweets)
              .then(tweets => {
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
                    elm.user.profileImageUrl,
                    elm.url,
                    elm.hashtag]
                  return get('insertTweets', arr)
                })
                return resolve(Promise.all(tweets))
              })
          })
      })
      .catch(err => reject(err))
  })
}

cron.schedule(`*/${interval} * * * * *`, () => {
  main()
})
