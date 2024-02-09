import { AnimatePresence, motion } from 'framer-motion'
import type { CellData } from './WordleGame'
import { Fragment } from 'react'
import Icon from './ui/Icon'

interface WordleGridProps {
  cells: CellData[][]
  rowPointer: number
}

export const WordleGrid: React.FC<WordleGridProps> = ({ cells, rowPointer }) => {
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
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`relative flex items-center justify-center rounded-md p-1 sm:p-2 font-play border-2 border-card aspect-square text-2xl font-bold ${
                  rowIndex < rowPointer ? 'bg-card' : null
                } ${rowIndex === rowPointer ? 'border-foreground/30' : null}`}
              >
                {rowIndex === rowPointer && colIndex === 0 ? (
                  <Icon name="ChevronRight" className="absolute -left-8 sm:-left-12 text-foreground/50 animate-pulse" />
                ) : null}
                {cell}
              </div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
