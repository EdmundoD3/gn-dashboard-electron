import { Router } from 'express'

const checkType = {
  isString: (str) => typeof str === 'string',
  isNumber: (num) => typeof num === 'number',
  isInteger: (num) => Number.isInteger(num) && num % 2 === 0
}

const validate = () => {
  const includesBadParams = ({ val }) => {
    const invalidCharacters = /[`*()+=\[\]{};'"\\|<>\/?]/
    return invalidCharacters.test(val)
  }

  const maxLength = ({ val = '', maxlength = 250 }) => {
    const isCut = val.length > maxlength
    const newVal = isCut ? val.slice(0, 255) : val
    return String(newVal)
  }

  return { maxLength, includesBadParams }
}

const CRUDMetodForOneData = ({ modelsFunction }) => {
  const nameOfvalue = modelsFunction.nameOfTable
  const { isString } = checkType

  return {
    getsForOneData: async (req, res) => {
      const value = req.query[nameOfvalue] || ''

      if (!isString(value)) {
        return res.status(403).json({ error: `${nameOfvalue} is not a string` })
      }

      try {
        const response = await modelsFunction.getByName({ value })
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error })
      }
    },
    getById: async (req, res) => {
      const id = req.query.id

      if (!id) {
        return res.status(403).json({ error: `id not found` })
      }

      try {
        const response = await modelsFunction.getById({ id })
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error })
      }
    },
    getPages: async (req, res) => {
      const { limit = 10, offset = 0 } = req.query

      try {
        const response = await modelsFunction.get({ limit, offset })
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error })
      }
    },
    postForOneData: async (req, res) => {
      const value = req.body[nameOfvalue]

      if (!value) {
        return res.status(403).json({ error: `${nameOfvalue} is not found` })
      }

      try {
        const existvalue = await modelsFunction.getSpecificName({ value })

        if (existvalue[0]) {
          return res
            .status(400)
            .json({ error: `${nameOfvalue} already exists with id: ${existvalue[0].id}` })
        }

        const response = await modelsFunction.post({ value })
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        return res.status(400).json({ error: error })
      }
    }
  }
}

const routersForOneData = ({ modelsFunction }) => {
  const router = Router()
  const { getsForOneData, getById, postForOneData, getPages } = CRUDMetodForOneData({
    modelsFunction
  })

  router.get('/', getsForOneData)
  router.get('/pages', getPages)
  router.get('/id', getById)
  router.post('/', postForOneData)

  return router
}

export { routersForOneData, checkType, validate }
