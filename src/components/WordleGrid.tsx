import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'
import Icon from './ui/Icon'
import { cn } from '@/lib/utils'
import type { GridCell } from '@/lib/types'

interface WordleGridProps {
  grid: GridCell[][]
  rowPointer: number
  word: string
}

export const WordleGrid: React.FC<WordleGridProps> = ({ grid, rowPointer, word }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-5 gap-2 select-none justify-center max-w-96 mx-auto"
      >
        {grid.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((letter, colIndex) => {
              const isPreviousRow = rowIndex < rowPointer
              const isCurrentRow = rowIndex === rowPointer
              const isLetterInWord = isPreviousRow && typeof letter === 'string' && word.includes(letter)
              const isLetterAtSameIndexAsLetter =
                isPreviousRow && typeof letter === 'string' && word.charAt(colIndex) === letter

              return (
                <div
                  key={colIndex}
                  className={cn(
                    'relative flex items-center justify-center rounded-md p-1 sm:p-2 font-play border-2 border-card aspect-square text-2xl font-bold',
                    isPreviousRow && isLetterInWord && isLetterAtSameIndexAsLetter && 'bg-primary text-background',
                    isPreviousRow && isLetterInWord && !isLetterAtSameIndexAsLetter && 'bg-secondary text-background',
                    isCurrentRow && 'border-foreground/30'
                  )}
                >
                  {isCurrentRow && colIndex === 0 ? (
                    <Icon
                      name="ChevronRight"
                      className="absolute -left-6 sm:-left-12 text-foreground/50 animate-pulse"
                    />
                  ) : null}
                  {letter}
                </div>
              )
            })}
          </Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
