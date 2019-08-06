import React from 'react'
import {
  ShortcutsProviderState,
  ShortKey,
  Callback,
  withShortcutsContext,
} from './ShortcutsProvider'

export interface KeyPressProps {
  shortKey: ShortKey
  keyDownCallback: Callback
  keyUpCallback: Callback
}
export interface KeyPressState {}
class WrappedKeyPress extends React.PureComponent<
  KeyPressProps & ShortcutsProviderState,
  KeyPressState
> {
  componentDidMount() {
    const { shortKey, keyDownCallback, keyUpCallback } = this.props
    this.props.bindKeyPress(shortKey, keyDownCallback, keyUpCallback)
  }
  componentWillUnmount() {
    const { shortKey, keyDownCallback, keyUpCallback } = this.props
    this.props.unbindKeyPress(shortKey, keyDownCallback, keyUpCallback)
  }
  render() {
    return null
  }
}

export const KeyPress = withShortcutsContext<KeyPressProps>(WrappedKeyPress)
