import React from 'react'
import { Image } from './types/Image'

export interface ProviderProps {
  imageList: Image[]
  defaultIndex?: number
  index?: number
  onChange?: (e: { index: number }) => void
}
export interface ProviderState {
  imageList: Image[]
  index: number
  rotate: number
  scale: number
  translateX: number
  translateY: number
  width: number
  height: number
  useTransition: boolean
  pinchTransition: boolean
  updateState: (nextState: Partial<ProviderState>) => void
}

const defaultState: ProviderState = {
  imageList: [],
  index: 0,
  rotate: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
  width: 0,
  height: 0,
  useTransition: false,
  pinchTransition: false,
  updateState: () => {},
}

export const ProviderContext = React.createContext<ProviderState>(defaultState)

export class Provider extends React.PureComponent<ProviderProps, ProviderState> {
  constructor(props: ProviderProps) {
    super(props)
    this.state = {
      imageList: props.imageList,
      index: props.index || props.defaultIndex || defaultState.index,
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      width: 0,
      height: 0,
      useTransition: false,
      pinchTransition: false,
      updateState: this.updateState,
    }
  }

  static getDerivedStateFromProps(props: ProviderProps, state: ProviderState) {
    let needUpdate = false
    const nextState: Partial<ProviderState> = {}
    if (props.imageList !== state.imageList) {
      nextState.imageList = props.imageList
      needUpdate = true
    }
    if (typeof props.index !== 'undefined' && props.index !== state.index) {
      nextState.index = props.index
      needUpdate = true
    }
    if (needUpdate) {
      return nextState
    } else {
      return null
    }
  }

  render() {
    return (
      <ProviderContext.Provider value={this.state}>{this.props.children}</ProviderContext.Provider>
    )
  }

  private updateState = (nextState: ProviderState) => {
    const changeKeys: Array<keyof ProviderState> = ['index']
    if (this.props.onChange) {
      if (
        changeKeys.reduce<boolean>((pre, cur) => {
          return (
            pre || (typeof nextState[cur] !== 'undefined' && nextState[cur] !== this.state[cur])
          )
        }, false)
      ) {
        this.props.onChange({
          index: typeof nextState.index !== 'undefined' ? nextState.index : this.state.index,
        })
      }
    }
    this.setState(nextState)
  }
}

export function withContext<OwnProps>(WrappedComponent: React.ComponentType<OwnProps>) {
  const SFC: React.ComponentType<OwnProps> = (props) => (
    <ProviderContext.Consumer>
      {(context) => <WrappedComponent {...context} {...props} />}
    </ProviderContext.Consumer>
  )
  SFC.displayName = 'withProvider'
  return SFC
}
