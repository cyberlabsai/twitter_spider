const { client } = require('./client')
let tweet
let key = 0
const getTweets = (filter, until) => {
  return new Promise((resolve, reject) => {
    return client(key).get('search/tweets', {q: `${filter}`, until: until, count: 100})
      .then((tweets) => {
        tweets = tweets.statuses.filter(elm => ((elm.text[0]+elm.text[1]) !== 'RT'))
        tweets = tweets.map(elm => {
          tweet = {
            id: elm.id_str,
            createdAt: elm.created_at,
            tweet_text: elm.text,
            image: elm.entities.media ? true : false,
            imageUrl: elm.entities.media ? elm.entities.media[0].media_url : '',
            hashtag: filter,
            lang: elm.lang,
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
          console.log('mudei', key)
        } else {
          return reject(err)
        }
      })
  })
}

module.exports = {
  getTweets
}


// var Twit = require('twit')
//
// var T = new Twit({
//         consumer_key:'XMNiN0Aw3S74MPqhAflhpQ',
//         consumer_secret:'aTHfRwjbwPKHfGtBM9rwt6Qko8jHAEnnRlZ7m5muc',
//         access_token:'14307977-W28juG3Irm7h14cBkWqUnSsZWsRUsw06x6h1i8iIv',
//         access_token_secret:'729lmn1hUJ4e9X4hCCDwBUGvyySDTf8fIxlCc2Htj5gxY',
//   timeout_ms:           30*1000,  // optional HTTP request timeout to apply to all requests.
//   strictSSL:            true,     // optional - requires SSL certificates to be valid.
// })
//
//
// var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] })
//
// stream.on('tweet', function (tweet) {
//   console.log(tweet);
// })
