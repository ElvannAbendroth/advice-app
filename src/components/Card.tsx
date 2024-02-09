import { cn } from '@/lib/utils'
import React from 'react'
import { motion } from 'framer-motion'

// interface CardProps extends React.HTMLProps<HTMLDivElement> {}

export const Card: React.FC<any> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn([
        'bg-card flex flex-col justify-center gap-4 text-center pt-8 pb-10 px-6 rounded-lg shadow-xl shadow-black/10 relative mb-4 min-h-[200px] max-w-[42ch] w-full md:min-w-[42ch]',
        className,
      ])}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
