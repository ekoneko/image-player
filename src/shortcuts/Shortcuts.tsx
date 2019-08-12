import React from 'react'
import { withShortcutsContext, ShortcutsProvider } from './ShortcutsProvider'

export interface ShortcutsProps {}

export const WrappedShortcuts: React.SFC<ShortcutsProps> = (props) => {
  return <ShortcutsProvider>{props.children}</ShortcutsProvider>
}

export const Shortcuts = withShortcutsContext<ShortcutsProps>(WrappedShortcuts)
Shortcuts.displayName = 'Shortcuts'
