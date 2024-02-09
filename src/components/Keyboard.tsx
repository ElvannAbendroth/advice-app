import type { Cell } from '@/lib/types'
import { AnimatePresence } from 'framer-motion'

interface KeyboardProps {
  onKeyPress: (key: string) => void
  attemptedLetters: string[]
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, attemptedLetters }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['Back', 'Enter'],
  ]

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-1 sm:gap-2 p-4 rounded-md mx-auto select-none">
        {rows.map(row => (
          <div key={row[1]} className="flex justify-center gap-1">
            {row.map(key => (
              <button
                key={key}
                className={`p-2 sm:p-3 rounded-md shadow-md ${
                  attemptedLetters.includes(key)
                    ? 'bg-card/40 hover:bg-card/70 text-foreground/70'
                    : 'bg-card hover:bg-foreground/20'
                }`}
                onClick={() => onKeyPress(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </AnimatePresence>
  )
}
