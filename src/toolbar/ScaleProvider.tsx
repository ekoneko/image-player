import React from 'react'
import { withContext, ProviderState } from '../Provider'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../consts'

interface ScaleHandlers {
  onScale: (scale: number) => void
}

export interface ScaleProviderProps {
  children: (scale: number, handlers: ScaleHandlers) => JSX.Element
}

const WrappedScaleProvider: React.SFC<ScaleProviderProps & ProviderState> = (props) => {
  const { scale, updateState, width, height } = props
  const onScale = (nextScale: number) => {
    const safeNextScale = Math.max(MIN_SCALE_SIZE, Math.min(MAX_SCALE_SIZE, nextScale))
    updateState({
      scale: safeNextScale,
      translateX: ((1 - safeNextScale) * width) / 2,
      translateY: ((1 - safeNextScale) * height) / 2,
      useTransition: true,
    })
  }
  return props.children(scale, { onScale })
}

export const ScaleProvider = withContext<ScaleProviderProps>(WrappedScaleProvider)
