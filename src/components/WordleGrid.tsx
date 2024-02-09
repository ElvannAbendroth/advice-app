import { AnimatePresence, motion } from 'framer-motion'
import type { CellData } from './WordleGame'

interface WordleGridProps {
  cells: CellData[]
}

export const WordleGrid: React.FC<WordleGridProps> = ({ cells }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-5 gap-2 select-none justify-center max-w-96  mx-auto"
      >
        {cells.map((cell, index) => (
          <div
            id="cell"
            key={index}
            className={`flex items-center justify-center border-radius-lg p-1 sm:p-2 font-play border-2 border-card aspect-square text-2xl font-bold`}
          >
            {cell}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
