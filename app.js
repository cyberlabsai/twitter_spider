const cron = require('node-cron')
const moment = require('moment-timezone')
const { get } = require('./database/execQuery')
const { getTweets } = require('./query/getTweets')

// Dont do it, kids. It's a gambiarra
const fixCreateAt = time => {
  // let month = 8
  // time = time.split(' ')
  // time = `${time[5]}-${month}-${time[2]} ${time[3]}`
  // time = moment(time).tz("America/Sao_Paulo")
  // console.log('bb', time)
  console.log('bbb', time)
  console.log()
  console.log('aaa ', time)
  return time
}
const main = () => {
  return new Promise((resolve, reject) => {
    return get('getHashtags')
      .then(hashtags => {
        hashtags = hashtags.map(elm => {
          return getTweets(elm.hashtags, '2019-08-25')
        })
        return Promise.all(hashtags)
          .then(res => {
            let tweets = []
            res.forEach(elm => elm.forEach(el => tweets.push(el)))
            tweets = tweets.map(elm => {
              elm.createdAt = moment(elm.createdAt).tz("America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss')
              let arr
              arr = [
                elm.id,
                elm.createdAt,
                elm.tweet_text,
                elm.image,
                elm.imageUrl,
                elm.user.screenName,
                elm.user.name,
                elm.user.profileImageUrl]
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
