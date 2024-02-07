import React, { useState } from 'react'
import Icon from '@/components/ui/Icon'
import Separator from '@/components/ui/Separator'

type Advice = { id: number; advice: string }

interface AdviceCardProps {
  entry: Advice
}

const getAdvice = async () => {
  const response = await fetch(`https://api.adviceslip.com/advice`)
  const {
    slip: { id, advice },
  } = await response.json()

  return { id, advice }
}

export const AdviceCard: React.FC<AdviceCardProps> = ({ entry }) => {
  //const { id, advice } = entry

  const [slip, setSlip] = useState(entry)
  const [isLoading, setIsLoading] = useState(false)

  const handleRandomize = async () => {
    setIsLoading(true)

    try {
      const newSlip = await getAdvice()
      setSlip(newSlip)
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  //   const {id, advice} = await getAdvice()
  return (
    <div className="bg-card flex flex-col justify-center gap-4 text-center pt-8 pb-10 px-6  max-w-[42ch] sm:w-[42ch] rounded-lg shadow-xl shadow-black/10 relative mb-4">
      <div className=" flex flex-col justify-start items-center gap-6 mb-4">
        {isLoading ? (
          <>
            <p className="text-primary uppercase font-medium text-xs tracking-[0.2em]">...Finding new Advice...</p>
            <Icon className="h-8 w-8 animate-spin-slow anima duration-1000 " name="Loader" size="48" />
          </>
        ) : (
          <>
            <p className="text-primary uppercase font-medium text-xs tracking-[0.2em] ">Advice #{slip.id + 1}</p>
            <p className="text-2xl font-bold">"{slip.advice}"</p>
          </>
        )}
      </div>
      <Separator />

      <button
        onClick={handleRandomize}
        className="bg-primary text-background rounded-full p-2 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] hover:bg-primary-hover transition-all flex justify-center items-center "
      >
        <Icon className="h-6 w-6" name="Dice5" size="48" />
      </button>
    </div>
  )
}

export default AdviceCard
