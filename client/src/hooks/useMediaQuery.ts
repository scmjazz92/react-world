import React, { useEffect, useState } from 'react'
import { BreakpoinstName, breakpoints } from '../lib/mediaQuery'
import throttle from '../lib/throttle'

const useMediaQuery = () => {
  const [size, setSize] = useState<number>(window.innerWidth)

  const getDevice = (size: number) =>
    Object.entries(breakpoints).reduce((acc, [name, point]) => {
      if (point <= size) {
        acc = name as BreakpoinstName
      }
      return acc
    }, ('' || 'mobile') as BreakpoinstName)

  const isMobile = breakpoints.tablet >= window.innerWidth

  const handleResize = () => {
    setSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', throttle(handleResize, 300))
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    device: getDevice(size),
    isMobile,
  }
}

export default useMediaQuery
