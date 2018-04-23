const patchableProperties = {
  firstName: {
    type: 'string'

  },
  lastName: {
    type: 'string'
  }
}

const storedProperties = {
  id: {
    type: 'string',
    description: 'An UUID'
  }
}

const user = {
  type: 'object',
  required: ['firstName', 'lastName'],
  additionalProperties: false,
  properties: {
    ...storedProperties,
    ...patchableProperties
  }
}

const userPatchSchema = {
  type: 'object',
  required: [],
  additionalProperties: false,
  properties: patchableProperties
}

module.exports = {
  user,
  userPatchSchema
}
