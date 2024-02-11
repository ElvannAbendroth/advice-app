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

export function isCharacterRepeated(word: string, character: string): boolean {
  const count = word.split(character).length - 1
  return count > 1
}

type MemoizedFunction<T> = (...args: any[]) => T
export function memoize<T>(func: (...args: any[]) => T): MemoizedFunction<T> {
  const cache: Record<string, T> = {}

  return (...args: any[]): T => {
    const key = JSON.stringify(args)

    if (cache[key]) {
      return cache[key]
    }

    const result = func(...args)
    cache[key] = result

    return result
  }
}
