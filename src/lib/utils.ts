import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomItem(array: any[]) {
  if (array.length === 0) {
    return null // Return null for an empty array
  }

  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
