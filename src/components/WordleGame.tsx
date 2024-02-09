import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { WordleGrid } from './WordleGrid'

const columns = 5
const rows = 6

export type CellData = string | null

const WordleGame = () => {
  const initialGridData: any = Array.from({ length: rows }, () => Array.from({ length: columns }, () => null))
  const [cells, setCells] = useState(initialGridData)
  const [colPointer, setColPointer] = useState<number>(0)
  const [rowPointer, setRowPointer] = useState<number>(0)
  const [attemptedLetters, setAttemptedLetters] = useState<string[]>([])

  const onKeyPress = (key: string) => {
    const updatedCells = [...cells]
    switch (key) {
      case 'Enter':
        if (rowPointer === rows) return
        if (colPointer === columns) {
          setRowPointer(rowPointer + 1)
          setColPointer(0)
        }

        let newAttemptedLetters = attemptedLetters
        cells[rowPointer].forEach((key: string) => {
          if (!newAttemptedLetters.includes(key)) {
            newAttemptedLetters.push(key)
          }
        })
        setAttemptedLetters(newAttemptedLetters)

        break

      case 'Back':
        // Handle Back key
        if (colPointer === columns + 1) return
        const newColPointer = colPointer > 0 ? colPointer - 1 : 0

        updatedCells[rowPointer][newColPointer] = null
        setColPointer(newColPointer)
        break

      default:
        if (colPointer === columns) return
        updatedCells[rowPointer][colPointer] = key
        setCells(updatedCells)
        setColPointer(colPointer + 1)

        // if (!attemptedLetters.includes(key)) {
        //   setAttemptedLetters([...attemptedLetters, key])
        // }
        break
    }
  }

  return (
    <div className=" w-full">
      <WordleGrid cells={cells} rowPointer={rowPointer} />
      <Keyboard onKeyPress={key => onKeyPress(key)} attemptedLetters={attemptedLetters} />
    </div>
  )
}

export default WordleGame
