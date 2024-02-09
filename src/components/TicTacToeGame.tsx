import { useState } from 'react'
import TicTactToeGrid from '@/components/TicTacToeGrid'
import { useGlobalAudioPlayer } from 'react-use-audio-player'
import { motion } from 'framer-motion'
import type { Cell, Player, Winner } from '@/lib/types'

export const TicTacToeGame: React.FC<{}> = () => {
  const initialCells: Cell[] = [
    { state: null },
    { state: null },
    { state: null },
    { state: null },
    { state: null },
    { state: null },
    { state: null },
    { state: null },
    { state: null },
  ]

  const [cells, setCells] = useState(initialCells)
  const [turn, setTurn] = useState<Player>('X')
  const [winner, setWinner] = useState<Winner>(null)
  const player = useGlobalAudioPlayer()

  const handleTurn = (index: number) => {
    if (winner) {
      resetBoard()
      return
    }

    const updatedCells = cells
    if (updatedCells[index].state != null) return
    if (turn === 'X') {
      player.load(`/sounds/marker-1.wav`, {
        autoplay: true,
        initialVolume: 0.1,
      })
      updatedCells[index].state = 'X'
      setTurn('O')
    }
    if (turn === 'O') {
      player.load(`/sounds/marker-2.wav`, {
        autoplay: true,
        initialVolume: 0.1,
      })
      updatedCells[index].state = 'O'
      setTurn('X')
    }

    setCells(updatedCells)
    checkWinner()
  }

  const resetBoard = () => {
    player.load('/sounds/erase-3.wav', {
      autoplay: true,
      initialVolume: 0.3,
    })
    setCells(initialCells)
    setTurn('X')
    setWinner(null)
  }

  const checkWinner = () => {
    let winner = null
    //Checks rows
    for (let index = 0; index < cells.length; index += 3) {
      const left = cells[index].state
      const middle = cells[index + 1].state
      const right = cells[index + 2].state

      if (left != null && left === middle && middle === right) {
        winner = left
      }

      if (cells.filter(cell => cell.state === null).length === 0) setWinner('Null')
    }

    //Check cols
    for (let index = 0; index < 3; index += 1) {
      const top = cells[index].state
      const center = cells[index + 3].state
      const bottom = cells[index + 6].state

      if (top != null && top === center && center === bottom) {
        winner = top
      }
    }

    //Check cross
    const topLeft = cells[0].state
    const centerMiddle = cells[4].state
    const bottomRight = cells[8].state
    const topRight = cells[2].state
    const bottomLeft = cells[6].state

    if (topLeft != null && topLeft === centerMiddle && centerMiddle === bottomRight) {
      winner = topLeft
    }

    if (topRight != null && topRight === centerMiddle && centerMiddle === bottomLeft) {
      winner = topRight
    }
    if (winner != null) {
      setWinner(winner)
      player.load('/sounds/click.wav', {
        autoplay: true,
        initialVolume: 0.2,
      })
    }
  }

  const handleSwitchTurn = (newTurn: Player) => {
    player.load('/sounds/button-1.wav', {
      autoplay: true,
      initialVolume: 0.5,
    })
    setTurn(newTurn)
  }

  return (
    <div id="wrapper" className="w-full max-w-[32rem] grid grid-cols-1 gap-8">
      <div id="toolBar" className="flex gap-4 items-center flex-wrap">
        <div id="button-group" className="flex flex-nowrap">
          <motion.button
            initial={{ scale: 1, rotate: 0 }}
            whileTap={{
              scale: 0.9,
              transition: {
                duration: 0.2,
              },
            }}
            className={`py-2 px-4 rounded-bl-md rounded-tl-md ${
              turn === 'X' ? `bg-primary hover:bg-primary-hover text-background` : `bg-card hover:bg-foreground/20`
            } shadow-lg`}
            onClick={() => handleSwitchTurn('X')}
          >
            X
          </motion.button>
          <motion.button
            initial={{ scale: 1, rotate: 0 }}
            whileTap={{
              scale: 0.9,
              transition: {
                duration: 0.2,
              },
            }}
            className={`py-2 px-4 rounded-br-md rounded-tr-md ${
              turn === 'O' ? `bg-secondary hover:bg-secondary-hover text-background` : `bg-card hover:bg-foreground/20`
            } shadow-lg`}
            onClick={() => handleSwitchTurn('O')}
          >
            O
          </motion.button>
        </div>
        <motion.button
          initial={{ scale: 1, rotate: 0 }}
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.1,
            },
          }}
          whileTap={{
            scale: 0.95,
            transition: {
              duration: 0.2,
            },
          }}
          className="py-2 px-4 bg-card hover:bg-foreground/20 rounded-md"
          onClick={() => resetBoard()}
        >
          Reset Game
        </motion.button>
        {winner && winner !== 'Null' && <p className="text-lg font-semibold">Congratulations, {winner} won!</p>}
        {winner === 'Null' && <p className="text-lg font-semibold">Null Game!</p>}
      </div>
      <TicTactToeGrid cells={cells} handleTurn={handleTurn} turn={turn} resetBoard={resetBoard} winner={winner} />
    </div>
  )
}

export default TicTacToeGame
