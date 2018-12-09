const cp = require('child_process')
const path = require('path')

;(async () => {
  const script = path.resolve(__dirname, '../crawler/trailer-list.js')
  const child = cp.fork(script, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    const err = code === 0 ? null : new Error('exit code ' + code)
    console.log(err)
  })

  child.on('message', data => {
    const result = data.result
    console.log(result)
  })

})()