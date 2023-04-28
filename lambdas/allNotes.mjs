'use strict'

import { allNotes } from './notes.mjs'

export const handler = async (body, cta, callback) => {
  try {
    let response = await allNotes()
    if (response.statusCode == 400) throw response

    return {
      statusCode: 200,
      results: response,
    }
  } catch (err) {
    return {
      statusCode: 400,
      statusText: 'An error ocurred',
    }
  }
}
