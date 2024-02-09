import type { Cell } from '@/components/TicTacToeGame'

type Grid3x3Props = {
  handleTurn: (index: number) => void
  resetBoard: () => void
  cells: Cell[]
  turn: 'X' | 'O'
}

export const Grid3x3 = ({ handleTurn, cells, resetBoard, turn }: Grid3x3Props) => {
  return (
    <div className="grid grid-cols-3 gap-0 select-none">
      {cells.map((cell, index) => (
        <div
          key={index}
          className={`flex items-center justify-center border-radium-lg p-1 sm:p-2 font-play ${
            index % 3 !== 2 ? '  border-r-[6px] sm:border-r-[8px] border-card' : ''
          } ${index < 6 ? '  border-b-[6px] sm:border-b-[8px] border-card' : ''}`}
          onClick={() => handleTurn(index)}
        >
          {cell.state === null && (
            <div className=" flex justify-center items-center w-full h-full aspect-w-1 aspect-square hover:bg-card cursor-pointer rounded-md text-5xl sm:text-9xl text-foreground/0 hover:text-transparent/20">
              <div>{turn === 'X' ? 'X' : 'O'}</div>
            </div>
          )}
          {cell.state === 'X' && (
            <span className=" flex justify-center items-center w-full h-full aspect-w-1 aspect-square  cursor-pointer rounded-md text-5xl sm:text-9xl text-primary">
              X
            </span>
          )}

          {cell.state === 'O' && (
            <div className=" flex justify-center items-center w-full h-full aspect-w-1 aspect-square  cursor-pointer rounded-md text-5xl sm:text-9xl text-secondary">
              O
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Grid3x3
