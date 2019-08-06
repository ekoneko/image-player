import React from 'react'
import { withContext, ProviderState } from '../Provider'

export interface RotateHandlers {
  onRotate: (rotate: number) => void
  onRotateLeft: () => void
  onRotateRight: () => void
}

export interface RotateProviderProps {
  children: (rotate: number, handlers: RotateHandlers) => JSX.Element
}

class WrappedRotateProvider extends React.PureComponent<RotateProviderProps & ProviderState, {}> {
  private handlers: RotateHandlers = {} as any
  constructor(props: RotateProviderProps & ProviderState) {
    super(props)
    this.handlers = {
      onRotate: this.handleRotate,
      onRotateLeft: this.handleRotateLeft,
      onRotateRight: this.handleRotateRight,
    }
  }

  render() {
    const { rotate } = this.props
    return this.props.children(rotate, this.handlers)
  }

  private handleRotate = (nextRotate: number) => {
    this.props.updateState({ rotate: nextRotate })
  }

  private handleRotateLeft = () => {
    const { rotate } = this.props
    this.handleRotate(rotate - 90)
  }

  private handleRotateRight = () => {
    const { rotate } = this.props
    this.handleRotate(rotate + 90)
  }
}
export const RotateProvider = withContext<RotateProviderProps>(WrappedRotateProvider)
