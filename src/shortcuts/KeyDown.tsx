import React from 'react'
import {
  ShortcutsProviderState,
  ShortKey,
  Callback,
  withShortcutsContext,
} from './ShortcutsProvider'

export interface KeyDownProps {
  shortKey: ShortKey
  callback: Callback
}
export interface KeyDownState {}
class WrappedKeyDown extends React.PureComponent<
  KeyDownProps & ShortcutsProviderState,
  KeyDownState
> {
  componentDidMount() {
    console.log('keydown', this.props)
    const { shortKey, callback } = this.props
    this.props.bindKeyDown(shortKey, callback)
  }
  componentWillUnmount() {
    const { shortKey, callback } = this.props
    this.props.unbindKeyDown(shortKey, callback)
  }
  render() {
    return null
  }
}

export const KeyDown = withShortcutsContext<KeyDownProps>(WrappedKeyDown)
