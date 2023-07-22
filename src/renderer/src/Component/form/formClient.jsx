import { useEffect, useState } from 'react'
import { fetchData } from '../../Hooks/fetchData'
import DropBox from '../DropBoxes/DropBox'
import DropBoxUrl from '../DropBoxes/DropBoxURL'
import { handleSubmit, setHandleChange } from '../Handle/handle'

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

const urlVersion = '/api/v1'
const DropboxCobrador = DropBoxUrl({
  url: `${urlVersion}/cobrador`,
  fetchParam: 'cobrador',
  labelName: 'Cobrador'
})
const Dropboxstatus = DropBoxUrl({
  url: `${urlVersion}/status`,
  fetchParam: 'status',
  labelName: 'Status'
})
const DropboxVendedora = DropBoxUrl({
  url: `${urlVersion}/vendedora`,
  fetchParam: 'vendedora',
  labelName: 'Vendedora'
})

// eslint-disable-next-line react/prop-types
export default function FormClient({ userData, setUserData }) {
  const [apiData, setApiData] = useState(apiDataInit)

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const { name, phone, email } = userData
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
  }, [userData])

  const handleChange = setHandleChange({ values: userData, setValues: setUserData })
  const { data } = apiData.read()

  const propsUserDropBox = { values: userData, setValues: setUserData, apiData, handleChange, data }
  const propsUserDataUseState = { values: userData, setValues: setUserData }
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
        <DropboxCobrador {...propsUserDataUseState} />
        <Dropboxstatus {...propsUserDataUseState} />
        <DropboxVendedora {...propsUserDataUseState} />
      </form>
    </>
  )
}
