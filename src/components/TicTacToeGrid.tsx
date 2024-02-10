import type { Cell } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

type TicTactToeGridProps = {
  handleTurn: (index: number) => void
  resetBoard: () => void
  cells: Cell[]
  turn: 'X' | 'O'
  winner: 'X' | 'O' | 'Null' | null
}

export const TicTactToeGrid = ({ handleTurn, cells, resetBoard, winner, turn }: TicTactToeGridProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-3 gap-0 select-none"
      >
        {cells.map((cell, index) => (
          <div
            id="cell"
            key={index}
            className={`flex items-center justify-center border-radium-lg p-1 sm:p-2 font-play ${
              index % 3 !== 2 ? '  border-r-[6px] sm:border-r-[8px] border-card' : ''
            } ${index < 6 ? '  border-b-[6px] sm:border-b-[8px] border-card' : ''}`}
            onClick={() => handleTurn(index)}
          >
            {cell.state === null && (
              <div
                className={`flex justify-center items-center w-full h-full aspect-w-1 aspect-square rounded-md text-5xl sm:text-9xl text-foreground/0  transition-all ${
                  winner === null && 'cursor-pointer hover:text-transparent/20 hover:bg-card'
                }`}
              >
                <div className="animate-bounce-sm ease-in-out">{turn === 'X' ? 'X' : 'O'}</div>
              </div>
            )}
            {cell.state === 'X' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=" flex justify-center items-center w-full h-full aspect-w-1 aspect-square  cursor-pointer rounded-md text-5xl sm:text-9xl text-primary"
              >
                X
              </motion.span>
            )}
            {cell.state === 'O' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -300 }}
                className=" flex justify-center items-center w-full h-full aspect-w-1 aspect-square  cursor-pointer rounded-md text-5xl sm:text-9xl text-secondary"
              >
                O
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default TicTactToeGrid
