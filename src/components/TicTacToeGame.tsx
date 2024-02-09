import { useEffect, useState } from 'react'
import Icon from '@/components/ui/Icon'
import Grid3x3 from '@/components/Grid3x3'

export type Cell = {
  cellNumber: number
  state: null | 'X' | 'O'
}

export const TicTacToeGame: React.FC<{}> = () => {
  const initialCells: Cell[] = [
    { cellNumber: 1, state: null },
    { cellNumber: 2, state: null },
    { cellNumber: 3, state: null },
    { cellNumber: 4, state: null },
    { cellNumber: 5, state: null },
    { cellNumber: 6, state: null },
    { cellNumber: 7, state: null },
    { cellNumber: 8, state: null },
    { cellNumber: 9, state: null },
  ]

  const [cells, setCells] = useState(initialCells)
  const [turn, setTurn] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<null | 'X' | 'O' | 'Null'>(null)

  const handleTurn = (index: number) => {
    if (winner) {
      resetBoard()
      return
    }
    const updatedCells = cells
    if (updatedCells[index].state != null) return
    if (turn === 'X') {
      updatedCells[index].state = 'X'
      setTurn('O')
    }
    if (turn === 'O') {
      updatedCells[index].state = 'O'
      setTurn('X')
    }

    setCells(updatedCells)
    checkWinner()
  }

  const resetBoard = () => {
    setCells(initialCells)
    setTurn('X')
    setWinner(null)
  }

  const checkWinner = () => {
    //Checks rows
    for (let index = 0; index < cells.length; index += 3) {
      const left = cells[index].state
      const middle = cells[index + 1].state
      const right = cells[index + 2].state

      if (left != null && left === middle && middle === right) {
        setWinner(left)
      }

      if (cells.filter(cell => cell.state === null).length === 0) setWinner('Null')
    }

    //Check cols
    for (let index = 0; index < 3; index += 1) {
      const top = cells[index].state
      const center = cells[index + 3].state
      const bottom = cells[index + 6].state

      if (top != null && top === center && center === bottom) {
        setWinner(top)
      }
    }

    //Check cross #1
    const topLeft = cells[0].state
    const centerMiddle = cells[4].state
    const bottomRight = cells[8].state
    if (topLeft != null && topLeft === centerMiddle && centerMiddle === bottomRight) {
      setWinner(topLeft)
    }

    // Check cross #2
    const topRight = cells[2].state
    const bottomLeft = cells[6].state
    if (topRight != null && topRight === centerMiddle && centerMiddle === bottomLeft) {
      setWinner(topRight)
    }
  }

  return (
    <div id="wrapper" className="w-full max-w-[32rem] grid grid-cols-1 gap-8">
      <div id="toolBar" className="flex gap-4 items-center flex-wrap">
        <div id="button-group" className="flex flex-nowrap">
          <button
            className={`py-2 px-4 rounded-bl-md rounded-tl-md ${
              turn === 'X' ? `bg-primary hover:bg-primary-hover text-background` : `bg-card hover:bg-foreground/20`
            } shadow-lg`}
            onClick={() => setTurn('X')}
          >
            X
          </button>
          <button
            className={`py-2 px-4 rounded-br-md rounded-tr-md ${
              turn === 'O' ? `bg-secondary hover:bg-secondary-hover text-background` : `bg-card hover:bg-foreground/20`
            } shadow-lg`}
            onClick={() => setTurn('O')}
          >
            O
          </button>
        </div>
        <button className="py-2 px-4 bg-card hover:bg-foreground/20 rounded-md" onClick={() => resetBoard()}>
          Reset Game
        </button>
        {winner && winner !== 'Null' && <p className="text-lg font-semibold">Congratulations, {winner} won!</p>}
        {winner === 'Null' && <p className="text-lg font-semibold">Null Game!</p>}
      </div>
      <Grid3x3 cells={cells} handleTurn={handleTurn} turn={turn} resetBoard={resetBoard} winner={winner} />
    </div>
  )
}

export default TicTacToeGame
