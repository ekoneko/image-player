import React from 'react'
import { withContext, ProviderState } from '../Provider'

interface RotateHandlers {
  onRotate: (rotate: number) => void
}

export interface RotateProviderProps {
  children: (rotate: number, handlers: RotateHandlers) => JSX.Element
}

const WrappedRotateProvider: React.SFC<RotateProviderProps & ProviderState> = (props) => {
  const { rotate, updateState } = props
  const onRotate = (nextRotate: number) => {
    updateState({ rotate: nextRotate })
  }
  return props.children(rotate, { onRotate })
}

export const RotateProvider = withContext<RotateProviderProps>(WrappedRotateProvider)
