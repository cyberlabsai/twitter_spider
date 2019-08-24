const { client } = require('./client')
let tweet
let key = 0
const getTweets = (filter, until) => {
  return new Promise((resolve, reject) => {
    console.log('key ', key)
    return client(key).get('search/tweets', {q: `${filter}`, until: until, count: 100})
      .then((tweets) => {
        tweets = tweets.statuses.filter(elm => ((elm.text[0]+elm.text[1]) !== 'RT'))
        tweets = tweets.map(elm => {
          tweet = {
            id: elm.id,
            createdAt: elm.created_at,
            tweet_text: elm.text,
            image: elm.entities.media ? true : false,
            imageUrl: elm.entities.media ? elm.entities.media[0].media_url : '',
            user: {
              name: elm.user.name,
              screenName: elm.user.screen_name,
              profileImageUrl: elm.user.profile_image_url
            }
          }
          return tweet
        })
        // console.log(tweets)
        return resolve(tweets)
      })
      .catch((err) => {
        // It's a gambiarra from global key
        console.log(err)
        if (err[0].message === 'Rate limit exceeded') {
          key = (key === 0 ? 1 : 0)
          // console.log('mudei', key)
        } else {
          return reject(err)
        }
      })
  })
}

module.exports = {
  getTweets
}
