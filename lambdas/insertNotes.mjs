'use strict'

import { insertNotes } from './notes.mjs'

export const handler = async (body, cta, callback) => {
  try {
    let response = await insertNotes(body)
    if (response.statusCode == 400) throw response

    return {
      statusCode: 200,
      statusText: 'Notes saved',
      message: 'Information stored in DynamoDB AWS',
    }
  } catch (err) {
    return {
      statusCode: 400,
      statusText: 'An error ocurred',
      message: err.message,
    }
  }
}
