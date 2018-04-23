const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')('app')
const users = require('./lib/users')

require('express-async-errors')

const app = express()
app.use(bodyParser.json())

app.get('/users', users.list)
app.post('/users', users.create)

app.get('/health', (req, res) => {
  res
    .status(200)
    .send(`It's fine`)
})

app.use(function (err, req, res, next) {
  // Error handler
  debug(err)
  if (err.statusCode) {
    // Proper http-error
    return res.status(err.statusCode)
      .json(Object.assign({}, {
        message: err.message
      }, err.errors ? { errors: err.errors } : {}))
  }
  return res.status(500)
    .json({ message: 'Unhandled error' })
})

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port
    debug(`App listening on port ${port}`)
  })
}
