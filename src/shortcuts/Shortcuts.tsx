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

export const WrappedShortcuts: React.SFC<ShortcutsProps> = (props) => {
  return (
    <ShortcutsProvider>
      <KeyDown shortKey="arrowLeft" callback={props.onNavigatePrev} />
      <KeyDown shortKey="arrowRight" callback={props.onNavigateNext} />
      {props.children}
    </ShortcutsProvider>
  )
}

const ShortcutsWithBind = withShortcutsContext<ShortcutsProps>(WrappedShortcuts)

export const Shortcuts: React.SFC<{}> = (props) => {
  return (
    <NavigateProvider>
      {(index, imageList, handlers) => (
        <ShortcutsWithBind index={index} imageList={imageList} {...handlers}>
          {props.children}
        </ShortcutsWithBind>
      )}
    </NavigateProvider>
  )
}
Shortcuts.displayName = 'Shortcuts'
