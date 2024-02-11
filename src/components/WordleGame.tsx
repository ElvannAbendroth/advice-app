import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { WordleGrid } from './WordleGrid'
import { getRandomItem } from '@/lib/utils'

const COLUMNS = 5
const ROWS = 6
const FIVE_LETTER_WORDS = ['mango', 'apple', 'grape', 'lemon', 'peach', 'olive', 'guava', 'melon', 'papaya']
const RANDOM_WORD = getRandomItem(FIVE_LETTER_WORDS).toUpperCase()

const WordleGame = () => {
  const initialGridData: any = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => null))

  const [grid, setGrid] = useState(initialGridData)
  const [colPointer, setColPointer] = useState<number>(0)
  const [rowPointer, setRowPointer] = useState<number>(0)
  const [attemptedLetters, setAttemptedLetters] = useState<string[]>([])
  const [word, setWord] = useState('GUAVA')
  // console.log('Word of the day:', word)

  const handleEnter = () => {
    //makes sure the pointers stay withing the grid
    if (rowPointer === ROWS || colPointer === COLUMNS + 1) return
    setRowPointer(rowPointer + (colPointer === COLUMNS ? 1 : 0))
    setColPointer(colPointer === COLUMNS ? 0 : colPointer)

    const newAttemptedLetters = [...new Set(grid[rowPointer])] as string[]
    setAttemptedLetters(newAttemptedLetters)

    //check if answer is correct here
  }

  const handleBack = () => {
    //makes sure the pointers stay withing the grid
    if (colPointer === COLUMNS + 1) return
    const newColPointer = colPointer < 0 ? colPointer - 1 : 0
    setColPointer(newColPointer)

    const updatedGrid = [...grid]
    updatedGrid[rowPointer][newColPointer] = null
    setGrid(updatedGrid)
  }

  const handleDefaultKeyPress = (key: string) => {
    //makes sure the pointers stay withing the grid
    if (colPointer === COLUMNS || key === ' ') return
    const oldColPointer = colPointer
    const newColPointer = colPointer + 1
    setColPointer(newColPointer)

    const updatedGrid = [...grid]
    updatedGrid[rowPointer][oldColPointer] = key.toUpperCase()
    setGrid(updatedGrid)
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
        handleDefaultKeyPress(key)
        break
    }
  }

  return (
    <div className=" w-full">
      <WordleGrid grid={grid} rowPointer={rowPointer} word={word} />
      <Keyboard onKeyPress={key => onKeyPress(key)} attemptedLetters={attemptedLetters} />
    </div>
  )
}

export default WordleGame
