import { AnimatePresence, motion } from 'framer-motion'
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
  const [word, setWord] = useState(RANDOM_WORD)
  const [win, setWin] = useState<'WON' | 'LOST' | null>(null)
  // console.log('Word of the day:', word)
  const layout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Back', 'Enter'],
  ]

  const handleEnter = () => {
    checkIfGuessCorrect()
    //makes sure the pointers stay withing the grid
    if (rowPointer === ROWS || colPointer === COLUMNS + 1) return
    setRowPointer(rowPointer + (colPointer === COLUMNS ? 1 : 0))
    setColPointer(colPointer === COLUMNS ? 0 : colPointer)

    const newAttemptedLetters = [...new Set(grid[rowPointer])] as string[]
    setAttemptedLetters(newAttemptedLetters)
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
    console.log(key)
    switch (key) {
      case 'Enter':
        handleEnter()
        break

      case 'Back':
        handleBack()
        break

      case 'Backspace':
        handleBack()
        break

      default:
        if (win) return
        handleDefaultKeyPress(key)
        break
    }
  }

  const checkIfGuessCorrect = () => {
    const newGuessedWord = grid[rowPointer].join('')

    if (newGuessedWord === word) {
      setWin('WON')
    } else if (rowPointer === ROWS - 1) {
      setWin('LOST')
    }
  }

  const resetGame = () => {
    setWin(null)
    setGrid(initialGridData)
    setColPointer(0)
    setRowPointer(0)
    setWord(RANDOM_WORD)
  }

  return (
    <div className=" flex flex-col items-center gap-2">
      <WordleGrid grid={grid} rowPointer={rowPointer} word={word} />
      <Keyboard onKeyPress={key => onKeyPress(key)} attemptedLetters={attemptedLetters} layout={layout} />
      <div className="flex flex-col gap-4 items-center">
        {win === 'WON' && <p className="text-lg font-semibold">You Won!!!</p>}
        {win === 'LOST' && <p className="text-lg font-semibold">You lost, the word was {word}</p>}
        <motion.button
          initial={{ scale: 1, rotate: 0 }}
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.1,
            },
          }}
          whileTap={{
            scale: 0.95,
            transition: {
              duration: 0.2,
            },
          }}
          className="py-2 px-4 bg-card hover:bg-foreground/20 rounded-md"
          onClick={() => resetGame()}
        >
          Reset Game
        </motion.button>
      </div>
    </div>
  )
}

export default WordleGame
