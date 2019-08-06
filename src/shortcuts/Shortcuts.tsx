import React from 'react'
import { withShortcutsContext, ShortcutsProvider } from './ShortcutsProvider'
import { KeyDown } from './KeyDown'
import { KeyPress } from './KeyPress'
import { NavigateProvider, NavigateHandlers } from '../stateProviders/NavigateProvider'
import { Image } from '../types/Image'

export interface ShortcutsProps extends NavigateHandlers {
  index: number
  imageList: Image[]
  onIndexChange: (index: number) => void
}
export interface ShortcutsState {}
class WrappedShortcuts extends React.PureComponent<ShortcutsProps, ShortcutsState> {
  render() {
    return (
      <ShortcutsProvider>
        <KeyDown shortKey="arrowLeft" callback={this.props.onNavigatePrev} />
        <KeyDown shortKey="arrowRight" callback={this.props.onNavigateNext} />
      </ShortcutsProvider>
    )
  }
}

const ShortcutsWithBind = withShortcutsContext<ShortcutsProps>(WrappedShortcuts)

export const Shortcuts: React.SFC<{}> = () => {
  return (
    <NavigateProvider>
      {(index, imageList, handlers) => (
        <ShortcutsWithBind index={index} imageList={imageList} {...handlers} />
      )}
    </NavigateProvider>
  )
}
Shortcuts.displayName = 'Shortcuts'
