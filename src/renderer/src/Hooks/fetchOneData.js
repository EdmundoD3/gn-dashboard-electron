import { fetchApi } from './fetch'

const setIdValues = ({ values, setValues }) => {
  return {
    reFillingId: (data = []) => {
      const newData = data.reduce(
        (p, { fetchParam, data }) => ({ ...fetchOneData({ values, data, fetchParam }), ...p }),
        {}
      )
      const newValues = {
        ...values,
        ...newData
      }
      setValues(newValues)
    }
  }
}

const recoveringId = async ({ requiredData = [] }) =>
  await Promise.all(
    requiredData.map(async (element) => {
      const { data } = await fetchData({
        fetchParam: element,
        value: 's',
        url: `/api/v1/${element}/`
      })
      return { fetchParam: element, data }
    })
  )

const fetchData = async ({ fetchParam, value, url }) => {
  const params = {
    [fetchParam]: value
  }
  return fetchApi({ url, method: 'GET', query: params })
}
const fetchOneData = ({ values, data, fetchParam }) => {
  const isData = (e) => e[fetchParam] === values[fetchParam]
  const newData = data.find(isData) || { id: '' }
  const { id } = newData
  return {
    [fetchParam + '_id']: id || !!values[fetchParam] || '',
    [fetchParam]: values[fetchParam]
  }
}

export { setIdValues, recoveringId }
