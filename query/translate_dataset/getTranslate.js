// Translating tweets
const translate = require('@vitalets/google-translate-api')
const en = require('./en')
const getTranslate = (text) => {
  return new Promise((resolve, reject) => {
    return translate('aaaa', {from: 'en', to: 'pt'})
      .then(res => {
        return resolve(res.text)
      }).catch(err => reject(err))
  })
}
count = 0
getTranslate(en.slice(0, 5000))
module.exports = {
  getTranslate
}
