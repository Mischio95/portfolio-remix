'use client'

import { useEffect, useState, useCallback } from 'react'

export function useWheelScroll(itemCount: number, containerRef: React.RefObject<HTMLElement>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()

    if (isAnimating) return

    const threshold = 10 // Scorrimento minimo per cambiare slide

    if (Math.abs(e.deltaY) < threshold) return

    setIsAnimating(true)

    if (e.deltaY > 0 && currentIndex < itemCount - 1) {
      setCurrentIndex(prev => prev + 1)
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }

    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }, [currentIndex, itemCount, isAnimating])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleScroll, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll, containerRef])

  return currentIndex
}