import Cliente from './Cliente.js'
import Addres from './Addres.js'
import Cuenta from './Cuenta.js'
import Compra from './Compra.js'

const Nota = {
  post: async ({ cliente = {}, addres = {}, cuenta = {}, compra = [] }) => {
    const clienteDates = clienteDate(cliente)
    const addresDates = addresDate(addres)
    const cuentaDates = cuentaDate(cuenta)
    const compraDates = compraDate(compra)

    const msErr =
      (!clienteDates ? 'name is not found ' : '') +
      (!addresDates ? 'addres dates is not ok ' : '') +
      (!cuentaDates ? 'clienteID in cuenta is not ok ' : '') +
      (!compraDates ? 'compra is not ok' : '')

    if (!clienteDates || !cuentaDates || !addresDates || !compraDates) {
      console.log('mensaje:', msErr)
      return { error: msErr }
    }

    const resClient = await Cliente.post(clienteDates)
    const clienteId = resClient[0].id
    const resAddres = await Addres.post({ ...addresDates, clienteId })
    const resCuenta = await Cuenta.post({ ...cuentaDates, clienteId })
    const cuentaId = resCuenta[0].id
    const resCompra = await Compra.postArray({ compra: compraDates, cuentaId })

    return { client: resClient, addres: resAddres, cuenta: resCuenta, compra: resCompra }
  }
}

export default Nota

const addresDate = ({
  street = '',
  noAddress = '',
  betweenstreet = '',
  referencia = '',
  observation = '',
  stateId = '0',
  coloniaId = '0',
  cityId = '0'
}) => {
  return {
    street: valueExist(street),
    noAddress: valueExist(noAddress),
    betweenstreet: valueExist(betweenstreet),
    referencia: valueExist(referencia),
    observation: valueExist(observation),
    stateId: valueExist(stateId),
    coloniaId: valueExist(coloniaId),
    cityId: valueExist(cityId)
  }
}

const clienteDate = ({
  name,
  lastName = '0',
  email = '0',
  phone = '0',
  date = '0',
  comments = '0',
  cobradorId,
  statusId,
  mongodbId = '0',
  vendedoraId
}) => {
  if (!name) return false
  return {
    name,
    lastName: valueExist(lastName),
    email: valueExist(email),
    phone: valueExist(phone),
    date: valueExist(date),
    comments: valueExist(comments),
    cobradorId: valueExist(cobradorId),
    statusId: valueExist(statusId),
    mongodbId: valueExist(mongodbId),
    vendedoraId: valueExist(vendedoraId)
  }
}

const cuentaDate = ({
  total,
  abono,
  date,
  contadoDate,
  ischange = '0',
  noCuenta,
  isActive = '1'
}) => {
  return {
    total: valueExist(total),
    abono: valueExist(abono),
    date: valueExist(date),
    contadoDate: valueExist(contadoDate),
    ischange: valueExist(ischange),
    noCuenta: valueExist(noCuenta),
    isActive: valueExist(isActive)
  }
}

const compraDate = (compra = []) => {
  const strCompra = compra.map(({ productosId, cuentaId, cantidad }) => ({
    productosId: productosId.toString(),
    cuentaID: cuentaId.toString(),
    cantidad: cantidad.toString()
  }))

  const comp = strCompra.reduce((pv, { productosId, cantidad }) => {
    return !productosId || !cantidad || pv
  }, false)

  return comp ? false : strCompra
}

const valueExist = (val) => (!val ? '0' : val)
