const { client } = require('./client')
let tweet
const getTweets = (filter, until) => {
  return new Promise((resolve, reject) => {
    return client.get('search/tweets', {q: `${filter}`, until: until, count: 100, locale: 'br'})
      .then((tweets) => {
        tweets = tweets.statuses.map(elm => {
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
        return resolve(tweets)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

module.exports = {
  getTweets
}
