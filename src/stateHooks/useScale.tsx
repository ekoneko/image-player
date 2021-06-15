import React from 'react'
import { ProviderContext } from '../Provider'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../consts'

export function useScale() {
  const { scale, width, height, updateState } = React.useContext(ProviderContext)
  function handleScale(nextScale: number) {
    const safeNextScale = Math.max(MIN_SCALE_SIZE, Math.min(MAX_SCALE_SIZE, nextScale))
    updateState({
      scale: safeNextScale,
      translateX: ((1 - safeNextScale) * width) / 2,
      translateY: ((1 - safeNextScale) * height) / 2,
      useTransition: true,
    })
  }

  function handleScaleUp() {
    handleScale(scale + 0.2)
  }

  function handleScaleDown() {
    handleScale(scale - 0.2)
  }
  return {
    scale,
    onScale: handleScale,
    onScaleUp: handleScaleUp,
    onScaleDown: handleScaleDown,
  }
}
