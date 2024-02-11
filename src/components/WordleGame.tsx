import { motion } from 'framer-motion'
import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { WordleGrid } from './WordleGrid'
import { COLUMNS, ROWS } from '@/lib/config'
import { checkIfWordExists, getNewWord } from '@/lib/wordle'

interface WordleGameProps {
  word: string
}

const WordleGame: React.FC<WordleGameProps> = ({ word }) => {
  const initialGridData: any = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => null))

  const [grid, setGrid] = useState(initialGridData)
  const [pointer, setPointer] = useState({ col: 0, row: 0 })
  const [attemptedLetters, setAttemptedLetters] = useState<string[]>([])
  const [correctAnswer, setCorrectAnswer] = useState(word.toUpperCase())
  const [gameStatus, setGameStatus] = useState<'WON' | 'LOST' | null>(null)
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  const layout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Back', 'Enter'],
  ]

  const handleEnter = async () => {
    // Makes sure the pointers stay within the grid
    if (pointer.row === ROWS + 1 || pointer.col === COLUMNS + 1) return

    const isWord = await checkIfWordExists(grid[pointer.row].join(''))
    if (!isWord) return

    // Check if the guess is correct
    checkIfGuessCorrect()

    // Set pointer to next row and reset column pointer
    if (pointer.col === COLUMNS) {
      setPointer({ row: pointer.row + 1, col: 0 })
    } else {
      setPointer({ ...pointer, col: pointer.col + 1 })
    }

    // Update attempted letters for the current row
    const newAttemptedLetters = [...new Set(grid[pointer.row])] as string[]
    setAttemptedLetters(newAttemptedLetters)
  }
  const handleBack = () => {
    //makes sure the pointers stay withing the grid
    if (pointer.col === COLUMNS + 1) return
    const newColPointer = pointer.col > 0 ? pointer.col - 1 : 0

    setPointer({ ...pointer, col: newColPointer })

    const updatedGrid = [...grid]
    updatedGrid[pointer.row][newColPointer] = null
    setGrid(updatedGrid)
  }

  const handleDefaultKeyPress = (key: string) => {
    //makes sure the pointers stay withing the grid
    if (pointer.col === COLUMNS || key === ' ') return
    const oldColPointer = pointer.col
    const newColPointer = pointer.col + 1
    setPointer({ ...pointer, col: newColPointer })

    const updatedGrid = [...grid]
    updatedGrid[pointer.row][oldColPointer] = key.toUpperCase()
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
        if (gameStatus) return
        handleDefaultKeyPress(key)
        break
    }
  }

  const checkIfGuessCorrect = () => {
    const newGuessedWord = grid[pointer.row].join('')

    if (newGuessedWord === correctAnswer) {
      setGameStatus('WON')
    } else if (pointer.row === ROWS - 1) {
      setGameStatus('LOST')
    }
  }

  const resetGame = async () => {
    const newWord = await getNewWord()
    setIsShowAnswer(false)
    setCorrectAnswer(newWord)
    setGameStatus(null)
    setGrid(initialGridData)
    setPointer({ col: 0, row: 0 })
  }

  return (
    <div className=" flex flex-col items-center gap-2">
      <WordleGrid grid={grid} pointer={pointer} word={correctAnswer} />
      <Keyboard onKeyPress={key => onKeyPress(key)} attemptedLetters={attemptedLetters} layout={layout} />
      <div className="flex flex-col gap-4 items-center">
        {gameStatus === 'WON' && <p className="text-lg font-semibold">You Won!!!</p>}
        {gameStatus === 'LOST' && <p className="text-lg font-semibold">You lost, the word was {correctAnswer}</p>}
        {isShowAnswer && <p className="text-lg font-semibold">Answer: {correctAnswer}</p>}
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
