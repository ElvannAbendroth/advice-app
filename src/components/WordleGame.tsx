import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { WordleGrid } from './WordleGrid'
import { getRandomItem } from '@/lib/utils'

const COLUMNS = 5
const ROWS = 6
const FIVE_LETTER_WORDS = ['mango', 'apple', 'grape', 'lemon', 'kiwi', 'peach', 'olive', 'guava', 'melon', 'papaya']

export type CellData = string | null
const word = getRandomItem(FIVE_LETTER_WORDS).toUpperCase()
console.log(word)

const WordleGame = () => {
  const initialGridData: any = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => null))

  const [cells, setCells] = useState(initialGridData)
  const [colPointer, setColPointer] = useState<number>(0)
  const [rowPointer, setRowPointer] = useState<number>(0)
  const [attemptedLetters, setAttemptedLetters] = useState<string[]>([])

  const handleEnter = () => {
    if (rowPointer === ROWS || colPointer === COLUMNS + 1) return

    const newAttemptedLetters = [...new Set(cells[rowPointer])] as string[]
    setAttemptedLetters(newAttemptedLetters)

    setRowPointer(rowPointer + (colPointer === COLUMNS ? 1 : 0))
    setColPointer(colPointer === COLUMNS ? 0 : colPointer)
  }

  const handleBack = () => {
    if (colPointer === COLUMNS + 1) return

    const newColPointer = Math.max(0, colPointer - 1)
    const updatedCells = [...cells]
    updatedCells[rowPointer][newColPointer] = null

    setColPointer(newColPointer)
    setCells(updatedCells)
  }

  const handleDefault = (key: string) => {
    if (colPointer === COLUMNS || key === ' ') return

    const updatedCells = [...cells]
    updatedCells[rowPointer][colPointer] = key.toUpperCase()

    setCells(updatedCells)
    setColPointer(colPointer + 1)
  }

  const onKeyPress = (key: string) => {
    switch (key) {
      case 'Enter':
        handleEnter()
        break

      case 'Back':
        handleBack()
        break

      default:
        handleDefault(key)
        break
    }
  }

  return (
    <div className=" w-full pt-12">
      <WordleGrid cells={cells} rowPointer={rowPointer} word={word} />
      <Keyboard onKeyPress={key => onKeyPress(key)} attemptedLetters={attemptedLetters} />
    </div>
  )
}

export default WordleGame
