import { useEffect, useState } from 'react'
import DropBox from './DropBox'
import { fetchData } from '../../Hooks/fetchData'

const url = '/api/v1/cobrador/'
const apiDataInit = fetchData({
  url,
  params: {
    cobrador: ''
  }
})

export default function StatusDropbox() {
  const [apiData, setApiData] = useState(apiDataInit)
  const [userData, setUserData] = useState({
    cobrador: ''
  })

  useEffect(() => {
    const { cobrador } = userData
    setApiData(
      fetchData({
        url,
        params: {
          cobrador: cobrador
        }
      })
    )
    return () => {}
  }, [userData])

  function handleChange(evt) {
    const { name, value } = evt.target
    const newValues = {
      ...userData,
      [name]: value
    }
    setUserData(newValues)
  }

  // `status_id` INTEGER NOT NULL,\
  // `ischange` INTEGER NOT NULL DEFAULT 1,\
  // `id_mdb` TEXT NULL,\
  // `vendedora_id` INTEGER NOT NULL,\
  const propsUserDropBox = { values: userData, setValues: setUserData, handleChange, apiData }
  const props = {
    name: { name: 'Cobrador', propertyName: 'cobrador' }
  }
  return (
    <>
      {Object.keys(props).map((e) => (
        <DropBox key={props[e].propertyName} {...props[e]} {...propsUserDropBox} />
      ))}
    </>
  )
}
