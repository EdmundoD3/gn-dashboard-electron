
function handleSubmit(evt) {
  evt.preventDefault();
}

const redirectsToTheNextPartOfTheForm = ({propertyName}) => {
  const userDataId = ['name', 'lastname', 'phone', 'email', 'date', 'vendedora']
  const addresDataId = ['street', 'noaddress', 'betweenstreet', 'referencia', 'observation', 'city']
  const userId = userDataId.find((e) => propertyName === e) ?
    userDataId[userDataId.length - 1] :
    addresDataId.find((e) => propertyName === e) ?
      addresDataId[addresDataId.length - 1] : propertyName;
  window.location = `#${userId}-id`;
}
const setNewValue = ({ values, setValues }) => {
  return ({ value, propertyName }) => {
    const newValues = {
      ...values,
      [propertyName]: String(value),
    };
    setValues(newValues);
  }
}

const setArrayValues = ({ data, values, setValues }) => {
  const newValues = Object.keys(data).reduce(
    (previosValue, propertyName) => {
      return !!data[propertyName] ? {
        ...previosValue,
        [propertyName]: String(data[propertyName])
      } : { ...previosValue }
    }, { ...values })
  setValues(newValues)
}

const setNewValues = ({ values, setValues, propertyName }) => {
  const setNewValue = ({ value }) => {
    const newValues = {
      ...values,
      [propertyName]: value,
    };
    setValues(newValues);
  }
  return {
    setNewValue,
    setChange: (evt) => {
      const value = evt.target.innerText
      const newValues = {
        ...values,
        [propertyName]: String(value),
      };
      setValues(newValues);
    },
    setSelectedData: ({ data, setSelectedSpan, size }) => {
      const selectedData = { name: propertyName, value: data[propertyName] }

      setSelectedSpan(0)
      // when there is no more data, the selected data will auto fill the other data
      if (size === 1) {
        setArrayValues({ data, values, setValues })
        redirectsToTheNextPartOfTheForm({propertyName})

        return
      }
      setNewValue({ ...selectedData })
      return
    }
  }
}

const setHandleChange = ({ values, setValues }) =>
  (evt) => {
    evt.preventDefault()
    const { name, value } = evt.target;
    const newValues = {
      ...values,
      [name]: String(value),
    };
    setValues(newValues);
  }


export { handleSubmit, setNewValues, setNewValue, setHandleChange, setArrayValues }