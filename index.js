var CronJob = require('cron').CronJob
const Main = require('./components/Main')

// Execute every day
// var job = new CronJob('0 */15 * * *', () => {
//   console.log('Every 15 minute with time ', new Date())
//   return
  Main('twitter')
// }, null, true, 'America/Sao_Paulo')
// job.start()
