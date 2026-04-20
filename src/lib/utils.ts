import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIncome(manYen: number): string {
  if (manYen >= 10000) {
    const oku = (manYen / 10000).toFixed(1)
    return `${oku}億円`
  }
  if (manYen >= 1000) {
    const sen = (manYen / 1000).toFixed(1)
    return `${sen}千万円`
  }
  return `${manYen}万円`
}

export function formatIncomeShort(manYen: number): string {
  if (manYen >= 10000) return `${(manYen / 10000).toFixed(1)}億`
  if (manYen >= 1000) return `${(manYen / 1000).toFixed(1)}千万`
  return `${manYen}万`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
