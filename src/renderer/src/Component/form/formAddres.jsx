import { useEffect, useState } from 'react'
import { fetchData } from '../../Hooks/fetchData'
import DropBox from '../DropBoxes/DropBox'
import DropBoxUrl from '../DropBoxes/DropBoxURL'
import { handleSubmit, setHandleChange } from '../Handle/handle'
import { apiUrl } from '../const/url'
const url = apiUrl + '/addres'
const clientFetchData = fetchData(url)
const apiDataInit = clientFetchData.get({
  url: '/data',
  params: {
    cliente_id: '',
    street: '',
    noaddress: ''
  }
})

const urlVersion = '/api/v1'
const DropboxState = DropBoxUrl({
  url: `${urlVersion}/state`,
  fetchParam: 'state',
  labelName: 'Estado'
})
const DropboxColonia = DropBoxUrl({
  url: `${urlVersion}/colonia`,
  fetchParam: 'colonia',
  labelName: 'Colonia'
})
const DropboxCity = DropBoxUrl({
  url: `${urlVersion}/city`,
  fetchParam: 'city',
  labelName: 'Ciudad'
})
export default function FormAddres({ addresData, setAddresData }) {
  const [apiData, setApiData] = useState(apiDataInit)

  useEffect(() => {
    const { street, noaddress, cliente_id } = addresData
    // verify that there is no other client with that data
    setApiData(
      clientFetchData.get({
        url: '/data',
        params: {
          cliente_id: cliente_id,
          street: street,
          noaddress: noaddress
        }
      })
    )
    return () => {}
  }, [addresData])
  const { data } = apiData.read()
  const handleChange = setHandleChange({ values: addresData, setValues: setAddresData })
  // const addNewValues = setArrayValues({ data , values:addresData, setValues:setAddresData })

  const propsUserDropBox = { values: addresData, setValues: setAddresData, data, handleChange }
  const propsAddresDataUseState = { values: addresData, setValues: setAddresData }
  const props = {
    calle: { name: 'Calle', propertyName: 'street' },
    noaddress: { name: 'No.Casa', propertyName: 'noaddress' },
    betweenstreet: { name: 'Entre Calles', propertyName: 'betweenstreet' },
    referencia: { name: 'Ref', propertyName: 'referencia' },
    observation: { name: 'Obs', propertyName: 'observation' }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-dates-of-clients">
        {Object.keys(props).map((e) => (
          <DropBox key={props[e].propertyName} {...props[e]} {...propsUserDropBox} />
        ))}
        <DropboxState {...propsAddresDataUseState} />
        <DropboxColonia {...propsAddresDataUseState} />
        <DropboxCity {...propsAddresDataUseState} />
      </form>
    </>
  )
}
