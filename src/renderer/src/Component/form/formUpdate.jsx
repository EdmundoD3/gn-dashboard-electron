import { useEffect, useState } from 'react'
import FormClient from './formClient'
import NormalButton from '../Buttons/normalButton'
import FormAddres from './formAddres'
import { recoveringId, setIdValues } from '../../Hooks/fetchOneData'
import { fetchApi } from '../../Hooks/fetch'
import FormCuenta from './formCuenta'

const initUserData = {
  id: '',
  name: '',
  phone: '',
  date: '',
  email: '',
  comments: '',
  cobrador: '',
  cobrador_id: '',
  status: '',
  status_id: '',
  vendedora: '',
  vendedora_id: '',
  isChange: 1,
  idMdb: ''
}

const initAddresData = {
  id: '',
  cliente_id: '',
  street: '',
  noaddress: '',
  betweenstreet: '',
  referencia: '',
  observation: '',
  state_id: '',
  state: '',
  colonia_id: '',
  colonia: '',
  city_id: '',
  city: '',
  ischange: 1
}

const initCuentaData = {
  id: '',
  cliente_id: '',
  total: '',
  abono: '',
  date: '',
  contado_date: '',
  ischange: 1,
  no_cuenta: '',
  is_active: 1
}

// eslint-disable-next-line react/prop-types
const AddNewData = ({ newDates = [] }) => {
  return (
    <div>
      Se agregaran estos:
      {newDates.map((e) => (
        <div key={'newDates-' + e}>{e}</div>
      ))}
    </div>
  )
}
const possibleNewDates = (data = {}) => {
  const possibleNewData = ['cobrador', 'status', 'vendedora', 'state', 'colonia', 'city']
  return possibleNewData.filter((e) => typeof data[e + '_id'] === 'boolean')
}

export default function FormUpdate() {
  const [isActive, setIsActive] = useState(false)
  // const [newDates, setNewDates] = useState([])
  const [userData, setUserData] = useState({ ...initUserData })
  const [addresData, setAddresData] = useState({ ...initAddresData })
  const [cuentaData, setCuentaData] = useState({ ...initCuentaData })

  useEffect(() => {
    if (userData['id']) setAddresData({ ...addresData, cliente_id: userData['id'] })
    return () => {}
  }, [userData])

  const newDates = possibleNewDates({ ...userData, ...addresData })

  const postData = () => {
    recoveringId({ requiredData: ['cobrador', 'status', 'vendedora'] }).then(
      setIdValues({ values: userData, setValues: setUserData }).reFillingId
    )

    recoveringId({ requiredData: ['state', 'colonia', 'city'] }).then(
      setIdValues({ values: addresData, setValues: setAddresData }).reFillingId
    )
    const requiredData = ['name', 'cobrador', 'date', 'status', 'vendedora']
    const isUpdate = requiredData.reduce((p, c) => !userData[c + '_id'] && p, true)
    console.log(isUpdate, userData)

    const postBody = { cliente: userData, addres: addresData, cuenta: {}, compra: [] }
    console.log(postBody)
    const postRes = async () =>
      await fetchApi({ url: 'api/v1/nota/', method: 'POST', body: postBody })
    console.log(postRes())
    alert('seActualizo')
  }
  console.log(addresData, userData)
  const buttonParams = { name: 'button', params: { className: 'button', onClick: postData } }
  return (
    <>
      <FormClient {...{ userData, setUserData }} />
      <FormAddres {...{ addresData, setAddresData, userData }} />
      <FormCuenta {...{ cuentaData, setCuentaData }} />
      <NormalButton {...buttonParams} />
      {isActive && <AddNewData newDates={newDates} />}
    </>
  )
}
