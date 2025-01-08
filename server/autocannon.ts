'use strict'

import autocannon from 'autocannon'

const instance = autocannon({
  url: 'http://localhost:3000/listing/find'
}, console.log)

// this is used to kill the instance on CTRL-C
// process.once('SIGINT', () => {
//   instance.stop()
// })

// just render results
autocannon.track(instance, {renderProgressBar: false})