import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' })

export const allNotes = async () => {
  try {
    let params = {
      TableName: 'StudentNotes',
    }

    const results = await docClient.scan(params).promise()
    return results
  } catch (err) {
    return err
  }
}

export const getItemByCode = async (code) => {
  const db = new AWS.DynamoDB({ region: 'us-east-2' })

  try {
    let params = {
      TableName: 'StudentNotes',
      FilterExpression: 'CodeEtudiant = :CodeEtudiant',
      ExpressionAttributeValues: {
        ':CodeEtudiant': { N: code.toString() },
      },
    }

    const results = await db.scan(params).promise()
    return results
  } catch (err) {
    return err
  }
}

export const insertNotes = async (notes) => {
  let results = await allNotes()
  let id = results.Count + 1

  try {
    let items = await getItemByCode(notes.code)

    if (items.Count > 0)
      throw {
        statusCode: 400,
        message: 'Notes of students already saved',
      }

    let Item = {
      id,
      CodeEtudiant: notes.code,
      ExaIntra: (notes.intra * 0.4).toFixed(2),
      ExaFinal: (notes.final * 0.6).toFixed(2),
    }
    let NoteFinale = Number(Item.ExaIntra) + Number(Item.ExaFinal)
    Item.NoteFinale = NoteFinale

    if (NoteFinale < 60) Item.Observation = 'Reprobate'

    let params = {
      Item,
      TableName: 'StudentNotes',
    }

    const response = await docClient.put(params).promise()
    return response
  } catch (err) {
    return err
  }
}
