import React from 'react'
import { withContext, ProviderState } from '../Provider'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../consts'

export interface ScaleHandlers {
  onScale: (scale: number) => void
  onScaleUp: () => void
  onScaleDown: () => void
}

export interface ScaleProviderProps {
  children: (scale: number, handlers: ScaleHandlers) => JSX.Element
}

class WrappedScaleProvider extends React.PureComponent<ScaleProviderProps & ProviderState, {}> {
  private handlers: ScaleHandlers = {} as any
  constructor(props: ScaleProviderProps & ProviderState) {
    super(props)
    this.handlers = {
      onScale: this.handleScaleUp,
      onScaleUp: this.handleScaleUp,
      onScaleDown: this.handleScaleDown,
    }
  }

  render() {
    const { scale } = this.props
    return this.props.children(scale, this.handlers)
  }

  private handleScale = (nextScale: number) => {
    const { updateState, width, height } = this.props
    const safeNextScale = Math.max(MIN_SCALE_SIZE, Math.min(MAX_SCALE_SIZE, nextScale))
    updateState({
      scale: safeNextScale,
      translateX: ((1 - safeNextScale) * width) / 2,
      translateY: ((1 - safeNextScale) * height) / 2,
      useTransition: true,
    })
  }

  private handleScaleUp = () => {
    const { scale } = this.props
    this.handleScale(scale + 0.2)
  }

  private handleScaleDown = () => {
    const { scale } = this.props
    this.handleScale(scale - 0.2)
  }
}
export const ScaleProvider = withContext<ScaleProviderProps>(WrappedScaleProvider)
