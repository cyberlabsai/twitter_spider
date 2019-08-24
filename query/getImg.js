const axios = require('axios')
const getImg = elm => {
  return new Promise((resolve, reject) => {
    if (elm.image) {
      return axios.get(elm.imageUrl, { responseType: 'arraybuffer' })
        .then(image => {
          let returnedB64 = Buffer.from(image.data).toString('base64')
          elm.imageUrl = returnedB64
          return resolve(elm)
        })
        .catch(err => reject(err))
    } else {
      return resolve(elm)
    }
  })
}
module.exports = {
  getImg
}
