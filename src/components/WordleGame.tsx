import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { WordleGrid } from './WordleGrid'
import { COLUMNS, ROWS } from '@/lib/config'
import { checkIfWordExists, getNewWord } from '@/lib/wordle'

interface WordleGameProps {
  wordFromAPI: string
}

const WordleGame: React.FC<WordleGameProps> = ({ wordFromAPI }) => {
  const initialGridData: any = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => null))

  const [grid, setGrid] = useState(initialGridData)
  const [colPointer, setColPointer] = useState<number>(0)
  const [rowPointer, setRowPointer] = useState<number>(5)
  const [attemptedLetters, setAttemptedLetters] = useState<string[]>([])
  const [word, setWord] = useState(wordFromAPI.toUpperCase())
  const [win, setWin] = useState<'WON' | 'LOST' | null>(null)
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const layout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Back', 'Enter'],
  ]

  const handleEnter = async () => {
    //makes sure the pointers stay withing the grid
    if (rowPointer === ROWS + 1 || colPointer === COLUMNS + 1) return

    const isWord = await checkIfWordExists(grid[rowPointer].join(''))
    if (!isWord) return
    checkIfGuessCorrect()

    //set pointer to next row
    if (rowPointer < COLUMNS + 1) setRowPointer(rowPointer + 1)
    // setRowPointer(rowPointer + (colPointer === COLUMNS ? 1 : 0))
    setColPointer(colPointer === COLUMNS ? 0 : colPointer)

    const newAttemptedLetters = [...new Set(grid[rowPointer])] as string[]
    setAttemptedLetters(newAttemptedLetters)
  }

  const handleBack = () => {
    //makes sure the pointers stay withing the grid
    if (colPointer === COLUMNS + 1) return
    const newColPointer = colPointer > 0 ? colPointer - 1 : 0

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

  const onKeyPress = async (key: string) => {
    switch (key) {
      case 'Enter':
        await handleEnter()
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

  const resetGame = async () => {
    const newWord = await getNewWord()
    setIsShowAnswer(false)
    setWord(newWord)
    setWin(null)
    setGrid(initialGridData)
    setColPointer(0)
    setRowPointer(0)
  }

  return (
    <div className=" flex flex-col items-center gap-2">
      <WordleGrid grid={grid} rowPointer={rowPointer} word={word} colPointer={colPointer} />
      <Keyboard onKeyPress={key => onKeyPress(key)} attemptedLetters={attemptedLetters} layout={layout} />
      <div className="flex flex-col gap-4 items-center">
        {win === 'WON' && <p className="text-lg font-semibold">You Won!!!</p>}
        {win === 'LOST' && <p className="text-lg font-semibold">You lost, the word was {word}</p>}
        {isShowAnswer && <p className="text-lg font-semibold">Answer: {word}</p>}
        <div className="flex gap-2">
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
            onClick={() => setIsShowAnswer(true)}
          >
            Show Answer
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default WordleGame
