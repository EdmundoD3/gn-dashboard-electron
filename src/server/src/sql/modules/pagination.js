const pagination = ({ model }) => {
  return {
    count: async (req, res) => {
      try {
        const response = await model.count()
        return res.status(200).json({
          error: null,
          data: response
        })
      } catch (error) {
        console.error(error)
        return res.status(400).json({ error: error })
      }
    },
    getPages: async (req, res) => {
      const { limit = 10, offset = 0 } = req.body
      const isNumber = (num) => typeof num === 'number'
      if (!limit && !offset) {
        return res.status(403).json({ error: 'limit or offset not found' })
      }
      if (!isNumber(limit) || !isNumber(offset)) {
        return res.status(403).json({ error: 'limit or offset is not a number' })
      }
      try {
        const response = await model.get({ limit, offset })
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

export { pagination }
