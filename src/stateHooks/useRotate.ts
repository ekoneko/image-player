import React from 'react'
import { ProviderContext } from '../Provider'

export function useRotate() {
  const { rotate, updateState } = React.useContext(ProviderContext)

  function handleRotate(nextRotate: number) {
    updateState({ rotate: nextRotate, useTransition: true })
  }
  function handleRotateLeft() {
    handleRotate(rotate - 90)
  }
  function handleRotateRight() {
    handleRotate(rotate + 90)
  }

  return {
    rotate,
    onRotate: handleRotate,
    onRotateLeft: handleRotateLeft,
    onRotateRight: handleRotateRight
  }
}
