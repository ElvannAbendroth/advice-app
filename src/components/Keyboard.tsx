import { AnimatePresence } from 'framer-motion'

interface KeyboardProps {
  onKeyPress: (key: string) => void
  attemptedLetters: string[]
  layout: string[][]
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, attemptedLetters, layout }) => {
  return (
    <AnimatePresence>
      <div className="flex flex-col gap-1 sm:gap-2 px-4 py-2 sm:py-4  rounded-md mx-auto select-none">
        {layout.map(key => (
          <div key={key[1]} className="flex justify-center gap-1">
            {key.map(key => (
              <button
                id="keyboard-key"
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
