/* eslint-disable react/prop-types */
import { Suspense, useState } from 'react'
import { handleSubmit, setNewValues } from '../Handle/handle'

export default function DropBox({
  name = 'DropBox',
  values,
  setValues,
  propertyName = '',
  data,
  handleChange,
  inputProps = { type: 'text' }
}) {
  const [selectedSpan, setSelectedSpan] = useState(-1)

  const { setChange, setSelectedData } = setNewValues({ values, setValues, propertyName })

  const keyforList = ({ code }) => {
    const size = data.length
    if (code === 'ArrowDown' && selectedSpan === -1) return setSelectedSpan(0)
    if (code === 'ArrowUp' && selectedSpan === -1) return setSelectedSpan(size - 1)

    if (!data[selectedSpan]) return
    const keyId = Object.keys(values).find((e) => propertyName + '_id' === e)
    const newkeyId = keyId
      ? { [keyId]: data[selectedSpan]['id'] ? data[selectedSpan]['id'] : true, id: '' }
      : {}
    const newData = { ...data[selectedSpan], ...newkeyId }
    // if keyId exist, add all newDates
    if (size === 0) return
    if (code === 'ArrowUp') return setSelectedSpan(selectedSpan > 0 ? selectedSpan - 1 : size - 1)
    if (code === 'ArrowDown') return setSelectedSpan(selectedSpan < size - 1 ? selectedSpan + 1 : 0)
    if (code === 'Enter') return setSelectedData({ data: newData, setSelectedSpan, size })
    // if (code === 'Tab') return setSelectedData({ data: newData, setSelectedSpan, size })
  }

  const isOnKeyDown = inputProps.type === 'date' ? {} : { onKeyDown: keyforList }

  return (
    <>
      <label className="label-form">
        <span className="label-name">{name}:</span>
        <div className="select-dropbox">
          <input
            className="select-dropbox-input"
            name={propertyName}
            {...inputProps}
            value={values[propertyName] || ''}
            onSubmit={handleSubmit}
            onChange={handleChange}
            id={propertyName + '-id'}
            {...isOnKeyDown}
          />
          <div className="select-container">
            <Suspense
              fallback={
                <span className="select-box" key={`suspenseid-${propertyName}`}>
                  Loading...
                </span>
              }
            >
              {data?.map((e, index) => (
                <span
                  className={`select-box ${selectedSpan === index ? 'select-mark' : ''}`}
                  key={e.id}
                  value={e[propertyName]}
                  onClick={setChange}
                >
                  {e[propertyName]}
                </span>
              ))}
            </Suspense>
          </div>
        </div>
      </label>
    </>
  )
}
