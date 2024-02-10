import React, { useState, useEffect } from 'react'
import Icon from '@/components/ui/Icon'
import Separator from '@/components/ui/Separator'
import { AnimatePresence, motion } from 'framer-motion'
import Card from './Card'
import { useGlobalAudioPlayer } from 'react-use-audio-player'
import { Skeleton } from './ui/Skeleton'

type Advice = { id: number; advice: string }

const variants = {
  show: {
    opacity: 1,

    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
  hide: {
    opacity: 0.3,
  },
}

interface AdviceCardProps {
  entry: Advice
}

const getAdvice = async (previousSlipId?: number) => {
  const response = await fetch(`https://api.adviceslip.com/advice`)
  const {
    slip: { id, advice },
  } = await response.json()

  if (id === previousSlipId) getAdvice(id)

  return { id, advice }
}

export const AdviceCard: React.FC<AdviceCardProps> = ({ entry }) => {
  const [slip, setSlip] = useState(entry)
  const [isLoading, setIsLoading] = useState(false)
  const player = useGlobalAudioPlayer()

  const handleRandomize = async () => {
    player.load('/sounds/dice.wav', {
      autoplay: true,
      initialVolume: 0.2,
    })

    setIsLoading(true)

    try {
      const newSlip = await getAdvice(slip.id)
      setSlip(newSlip)
    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  //   const {id, advice} = await getAdvice()
  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        animate={isLoading ? 'hide' : 'show'}
        initial="hidden"
        transition={{
          opacity: { ease: 'linear', opacity: 1 },
          layout: { duration: 0.3 },
        }}
        className="flex flex-col justify-center items-center w-full"
      >
        <Card>
          <motion.div className="flex flex-col justify-start items-center gap-6 mb-4">
            {isLoading ? (
              <>
                <Skeleton className="w-full sm:w-[20%] h-4 rounded-full" />
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-full sm:w-[50%] h-4 rounded-full" />
              </>
            ) : (
              <>
                <p className="text-primary uppercase font-medium text-xs tracking-[0.2em] ">Advice #{slip.id + 1}</p>
                <p className="text-2xl font-bold">"{slip.advice}"</p>
              </>
            )}
          </motion.div>
          <Separator />
          <div className="absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%]">
            <motion.button
              initial={{ scale: 1, rotate: 0 }}
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.1,
                },
              }}
              whileTap={{
                scale: 0.9,
                transition: {
                  duration: 0.2,
                },
              }}
              onClick={handleRandomize}
              className="bg-primary text-background rounded-full p-2 hover:bg-primary-hover transition-all flex justify-center items-center "
            >
              {isLoading ? (
                <Icon className="h-8 w-8 animate-spin duration-1000 " name="Dice5" size="48" />
              ) : (
                <Icon className="h-6 w-6" name="Dice5" size="48" />
              )}
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

export default AdviceCard
