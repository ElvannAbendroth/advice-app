import { memoize } from './utils'

export type Highlight = 'green' | 'yellow' | 'gray' | null

const getRowCellTypeNoMemo = (guess: string, correctAnswer: string): Highlight[] => {
  let result = Array(guess.length).fill('gray')

  // Override greens
  for (let col = 0; col < guess.length; col++) {
    if (guess[col] === correctAnswer[col]) {
      result[col] = 'green'
    }
  }

  // Yellow everything that's in word but not in correct place
  for (let col = 0; col < guess.length; col++) {
    if (result[col] === 'green') {
      continue
    }
    if (correctAnswer.indexOf(guess[col]) >= 0) {
      result[col] = 'yellow'
    }
  }

  // Override extra yellows back to gray
  for (let col = 0; col < guess.length; col++) {
    if (result[col] !== 'yellow') {
      continue
    }
    const letter = guess[col]
    const appearsInCorrectAnswer = correctAnswer.split('').filter(l => l === letter).length
    const appearsGreen = result.filter((r, rIndex) => r === 'green' && correctAnswer[rIndex] === letter).length
    const appearsYellowBeforeThis = result.filter(
      (r, rIndex) => r === 'yellow' && guess[rIndex] === letter && rIndex < col
    ).length
    if (appearsGreen + appearsYellowBeforeThis >= appearsInCorrectAnswer) {
      result[col] = 'gray'
    }
  }

  return result
}

export const getRowCellType = memoize(getRowCellTypeNoMemo)
