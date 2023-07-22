import { useState } from 'react'

import { Colonia } from '../data/models/Colonia'

const handleKeyDown = ({ e, focusedIndex, setFocusedIndex, setValue, maxNumber = 2 }) => {
  const { key } = e
  if (key === 'ArrowDown')
    setFocusedIndex(Number(focusedIndex) + 1 > maxNumber ? 0 : Number(focusedIndex) + 1)
  if (key === 'ArrowUp')
    setFocusedIndex(Number(focusedIndex) - 1 < 0 ? maxNumber : Number(focusedIndex) - 1)
  // reset search complete
  if (key === 'Escape') setValue('')
  if (key === 'Enter') setValue(array[focusedIndex])
}

const array = ['gato', 'toncha', 'pata']

// eslint-disable-next-line react/prop-types
export default function InputMine({ value = '', setValue, database = Colonia.getByName }) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const handleChange = async (event) => {
    event.preventDefault()

    setValue(event.target.value)
    console.log(await database(value))
  }
  const handleKey = (e) => handleKeyDown({ e, focusedIndex, setFocusedIndex, setValue, array })
  return (
    <>
      <label className="label label-input-text" onKeyDown={handleKey}>
        colonia {focusedIndex}
        <input
          type="text"
          placeholder="Ingrese el Nombre del Postre que desea Buscar"
          value={value}
          onChange={handleChange}
        />
        <div className="list-result">
          {array.map((e, index) => (
            <span
              key={e}
              onClick={() => {
                setValue(e)
                setFocusedIndex(index)
              }}
              className={focusedIndex === index ? 'focused-index' : ''}
            >
              {e}
            </span>
          ))}
        </div>
      </label>
      <input type="submit" value="Submit" />
    </>
  )
}
