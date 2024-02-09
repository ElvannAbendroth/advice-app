import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { WordleGrid } from './WordleGrid'

export type CellData = string | null

const WordleGame = () => {
  const initialGridData: CellData[] = Array.from({ length: 5 * 6 }, (_, index) => null)
  const [cells, setCells] = useState(initialGridData)
  const [colPointer, setColPointer] = useState(0)

  //console.log(initialGridData)

  const onKeyPress = (key: string) => {
    switch (key) {
      case 'Enter':
        // Handle Enter key
        break

      case 'Back':
        // Handle Back key
        break

      default:
        const updatedCells = [...cells]
        updatedCells[colPointer] = key
        setCells(updatedCells)
        setColPointer(colPointer + 1)
        console.log(updatedCells)
        break
    }
  }

  return (
    <div className=" w-full">
      <WordleGrid cells={cells} />
      <Keyboard onKeyPress={key => onKeyPress(key)} />
    </div>
  )
}

export default WordleGame
