const Datastore = require('@google-cloud/datastore')
const validator = require('is-my-json-valid')
const createError = require('http-errors')
const uuid = require('uuid/v4')

const { user: userSchema } = require('./schema/user')

const datastore = Datastore()

const USER_KEYNAME = 'user'

async function list (req, res) {
  const query = datastore.createQuery(USER_KEYNAME)
    .order('timestamp', { descending: true })
    .limit(10)

  const [entities] = await datastore.runQuery(query)

  const results = entities.map(entity => {
    return Object.assign({}, {
      id: entity[datastore.KEY].id
    }, entity)
  })

  return res.json(results)
}

async function create (req, res) {
  const userValidator = validator(userSchema)
  const validate = userValidator(req.body)

  if (!validate) {
    throw createError(400, 'Invalid input', { errors: userValidator.errors })
  }

  const id = uuid()
  const data = Object.assign({}, req.body, {
    timestamp: new Date()
  })

  await datastore.save({
    key: datastore.key([USER_KEYNAME, id]),
    data
  })

  return res.json(Object.assign({ id }, data))
}

module.exports = {
  list,
  create
}
