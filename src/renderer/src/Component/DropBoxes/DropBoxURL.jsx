import { useEffect, useState } from 'react'
import DropBox from './DropBox'
import { fetchData } from '../../Hooks/fetchData'

export default function DropBoxUrl({
  url = '/api/v1/cobrador',
  fetchParam = 'cobrador',
  labelName = 'Cobrador'
}) {
  const fetchDataDropBox = fetchData(url)
  const apiDataInit = fetchDataDropBox.get({
    url: '/',
    params: {
      [fetchParam]: ''
    }
  })

  const nameId = fetchParam + '_id'

  return ({ values, setValues }) => {
    const [apiData, setApiData] = useState(apiDataInit)
    const [dates, setDates] = useState('')

    useEffect(() => {
      const paramData = values[fetchParam]
      setApiData(
        fetchDataDropBox.get({
          url: '/',
          params: {
            [fetchParam]: paramData
          }
        })
      )
      return () => {}
    }, [values])
    const { data } = apiData.read()

    function handleChange(evt) {
      evt.preventDefault()
      const { name, value } = evt.target
      // if exist value and not
      const isData = (e) => e[fetchParam] === value
      const newData = data.find(isData) || { id: '' }
      const { id } = newData
      const newValues = {
        ...values,
        [name]: value.toLowerCase(),
        [nameId]: id || !!value || ''
      }
      setValues(newValues)
    }

    const propsDropBox = { values, setValues, handleChange, data }

    return (
      <>
        <DropBox
          key={fetchParam}
          {...{ name: labelName, propertyName: fetchParam }}
          {...propsDropBox}
        />
      </>
    )
  }
}
