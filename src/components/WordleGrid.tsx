import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'
import Icon from '@/components/ui/Icon'
import { cn, memoize } from '@/lib/utils'
import type { GridCell } from '@/lib/types'
import { getRowCellType, type Highlight } from '@/lib/wordle'
import { ROWS } from '@/lib/config'

interface WordleGridProps {
  grid: GridCell[][]
  rowPointer: number
  word: string
}

// const memoizedCompare = memoize(compare)

export const WordleGrid: React.FC<WordleGridProps> = ({ grid, rowPointer, word }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-5 gap-2 select-none justify-center max-w-72 sm:max-w-96 mx-auto w-full"
      >
        {grid.map((row, rowIndex) => {
          const shouldBeHighlighted = rowIndex < rowPointer || rowPointer === ROWS
          const highlights: Highlight[] = shouldBeHighlighted
            ? getRowCellType(grid[rowIndex].join(''), word)
            : Array(word.length).fill(null)
          const isCurrentRow = rowIndex === rowPointer

          return (
            <Fragment key={rowIndex}>
              {row.map((letter, colIndex) => {
                return (
                  <div
                    id={`letter-cell-${rowIndex + 1}-${colIndex + 1}`}
                    key={colIndex}
                    className={cn(
                      'relative flex items-center justify-center rounded-md p-1 sm:p-2 font-play border-2 border-card aspect-square text-2xl font-bold',
                      shouldBeHighlighted && 'bg-card text-foreground',
                      shouldBeHighlighted && highlights[colIndex] === 'green' && 'bg-primary text-background',
                      shouldBeHighlighted && highlights[colIndex] === 'yellow' && 'bg-accent text-background'
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
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}
