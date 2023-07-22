import { useEffect, useState } from 'react'
import { fetchData } from '../../Hooks/fetchData'
import { handleSubmit, setHandleChange } from '../Handle/handle'
import DropBox from '../DropBoxes/DropBox'

const url = '/api/v1/client'
const clientFetchData = fetchData(url)
const apiDataInit = clientFetchData.get({
  url: '/data',
  params: {
    name: '',
    phone: '',
    email: '',
    date: ''
  }
})
// eslint-disable-next-line react/prop-types
export default function FormCuenta({ cuentaData, setCuentaData }) {
  const [apiData, setApiData] = useState(apiDataInit)

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const { name, phone, email } = cuentaData
    // verify that there is no other client with that data
    setApiData(
      clientFetchData.get({
        url: '/data',
        params: {
          name: name,
          phone: phone,
          email: email
        }
      })
    )
    return () => {}
  }, [cuentaData])

  const handleChange = setHandleChange({ values: cuentaData, setValues: setCuentaData })
  const { data } = apiData.read()

  const propsUserDropBox = {
    values: cuentaData,
    setValues: setCuentaData,
    apiData,
    handleChange,
    data
  }

  const props = {
    name: { name: 'Nombre', propertyName: 'name' },
    phone: { name: 'telefono', propertyName: 'phone' },
    email: { name: 'email', propertyName: 'email' },
    date: { name: 'date', propertyName: 'date', inputProps: { type: 'date' } }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="form-dates-of-clients">
        {Object.keys(props).map((e) => (
          <DropBox key={props[e].propertyName} {...props[e]} {...propsUserDropBox} />
        ))}
      </form>
    </>
  )
}
