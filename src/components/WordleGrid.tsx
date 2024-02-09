import { AnimatePresence, motion } from 'framer-motion'
import type { CellData } from './WordleGame'
import { Fragment } from 'react'
import Icon from './ui/Icon'
import { cn } from '@/lib/utils'

interface WordleGridProps {
  cells: CellData[][]
  rowPointer: number
  word: string
}

export const WordleGrid: React.FC<WordleGridProps> = ({ cells, rowPointer, word }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-5 gap-2 select-none justify-center max-w-96 mx-auto"
      >
        {cells.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((cell, colIndex) => {
              const isPreviousRow = rowIndex < rowPointer
              const isCurrentRow = rowIndex === rowPointer
              const isCellInWord = isPreviousRow && typeof cell === 'string' && word.includes(cell)
              const isCellAtSameIndexAsLetter =
                isPreviousRow && typeof cell === 'string' && colIndex === word.indexOf(cell)

              return (
                <div
                  key={colIndex}
                  className={cn(
                    'relative flex items-center justify-center rounded-md p-1 sm:p-2 font-play border-2 border-card aspect-square text-2xl font-bold',
                    isPreviousRow && isCellInWord && isCellAtSameIndexAsLetter && 'bg-primary text-background',
                    isPreviousRow && isCellInWord && !isCellAtSameIndexAsLetter && 'bg-secondary text-background',
                    isCurrentRow && 'border-foreground/30'
                  )}
                >
                  {isCurrentRow && colIndex === 0 ? (
                    <Icon
                      name="ChevronRight"
                      className="absolute -left-6 sm:-left-12 text-foreground/50 animate-pulse"
                    />
                  ) : null}
                  {cell}
                </div>
              )
            })}
          </Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
