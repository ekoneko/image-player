import React from 'react'

export type Callback = (event: KeyboardEvent) => void

/**
 * short key rule:
 *  1. KeyboardEvent.key
 *    e.g: a
 *  2. modifier+key
 *    e.g: Shift+= (Do not use shift++)
 *    modifier list: Atl,Ctrl,Meta,Shift
 *    meta = fn on windows, meta = cmd on osx
 *  3. CmdOrCtrl+key
 *    equal to ctrl+key on windows and meta+key on osx
 */
export type ShortKey = string

interface HandlersMap {
  [key: string]: Array<{
    shiftKey: boolean
    altKey: boolean
    metaKey: boolean
    ctrlKey: boolean
    callback: Callback
  }>
}

export interface ShortcutsProviderProps {}
export interface ShortcutsProviderState {
  bindKeyDown: (key: ShortKey, callback: Callback) => void
  bindKeyPress: (key: ShortKey, keyDownCallback: Callback, keyUpCallback: Callback) => void
  unbindKeyDown: (key: ShortKey, callback: Callback) => void
  unbindKeyPress: (key: ShortKey, keyDownCallback: Callback, keyUpCallback: Callback) => void
}

const noop = () => {}

const defaultState = {
  bindKeyDown: noop,
  bindKeyPress: noop,
  unbindKeyDown: noop,
  unbindKeyPress: noop,
}
export const ShortcutsContext = React.createContext<ShortcutsProviderState>(defaultState)

export class ShortcutsProvider extends React.PureComponent<
  ShortcutsProviderProps,
  ShortcutsProviderState
> {
  private osx = navigator.platform.toLocaleLowerCase().indexOf('mac') > -1
  private keydownHandlers: HandlersMap = {}
  private keyupHandlers: HandlersMap = {}

  constructor(props: ShortcutsProviderProps) {
    super(props)
    this.state = {
      bindKeyDown: this.bindKeyDown,
      bindKeyPress: this.bindKeyPress,
      unbindKeyDown: this.unbindKeyDown,
      unbindKeyPress: this.unbindKeyPress,
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }
  render() {
    return (
      <ShortcutsContext.Provider value={this.state}>
        {this.props.children}
      </ShortcutsContext.Provider>
    )
  }
  private handleKeyDown = (event: KeyboardEvent) => {
    const { keydownHandlers } = this
    const eventKey = event.key.toLocaleLowerCase()
    if (!keydownHandlers[eventKey]) {
      return
    }
    this.keydownHandlers[eventKey].forEach((handler) => {
      if (
        handler.altKey === event.altKey &&
        handler.ctrlKey === event.ctrlKey &&
        handler.metaKey === event.metaKey &&
        handler.shiftKey === event.shiftKey
      ) {
        handler.callback(event)
      }
    })
  }
  private handleKeyUp = (event: KeyboardEvent) => {
    const { keyupHandlers } = this
    const eventKey = event.key.toLocaleLowerCase()
    if (!keyupHandlers[eventKey]) {
      return
    }
    keyupHandlers[eventKey].forEach((handler) => {
      if (
        handler.altKey === event.altKey &&
        handler.ctrlKey === event.ctrlKey &&
        handler.metaKey === event.metaKey &&
        handler.shiftKey === event.shiftKey
      ) {
        handler.callback(event)
      }
    })
  }

  private bindKeyDown = (shortKey: ShortKey, callback: Callback) => {
    this.bindKeyEvent('keydownHandlers', shortKey, callback)
  }

  private bindKeyPress = (
    shortKey: ShortKey,
    keyDownCallback: Callback,
    keyUpCallback: Callback,
  ) => {
    this.bindKeyEvent('keydownHandlers', shortKey, keyDownCallback)
    this.bindKeyEvent('keyupHandlers', shortKey, keyUpCallback)
  }

  private bindKeyEvent = (
    name: 'keydownHandlers' | 'keyupHandlers',
    key: ShortKey,
    callback: Callback,
  ) => {
    const formattedKey = this.formatKey(key)
    const handlerMap = this[name]
    const currentKeyHandlers = handlerMap[formattedKey.key] ? [...handlerMap[formattedKey.key]] : []
    currentKeyHandlers.push({
      shiftKey: formattedKey.shiftKey,
      altKey: formattedKey.altKey,
      metaKey: formattedKey.metaKey,
      ctrlKey: formattedKey.ctrlKey,
      callback,
    })
    this[name] = {
      ...handlerMap,
      [formattedKey.key]: currentKeyHandlers,
    }
  }

  private unbindKeyDown = (shortKey: ShortKey, callback: Callback) => {
    this.unbindKeyEvent('keydownHandlers', shortKey, callback)
  }

  private unbindKeyPress = (
    shortKey: ShortKey,
    keyDownCallback: Callback,
    keyUpCallback: Callback,
  ) => {
    this.unbindKeyEvent('keydownHandlers', shortKey, keyDownCallback)
    this.unbindKeyEvent('keyupHandlers', shortKey, keyUpCallback)
  }

  private unbindKeyEvent = (
    name: 'keydownHandlers' | 'keyupHandlers',
    shortKey: ShortKey,
    callback: Callback,
  ) => {
    const formattedKey = this.formatKey(shortKey)
    const handlerMap = this[name]
    const currentKeyHandlers = handlerMap[formattedKey.key]
    if (!currentKeyHandlers) {
      return
    }
    const index = currentKeyHandlers.findIndex((item) => item.callback === callback)
    if (index === -1) {
      return
    }
    this[name] = {
      ...handlerMap,
      [formattedKey.key]: currentKeyHandlers.filter((_, i) => i !== index),
    }
  }

  private formatKey(shortKey: ShortKey) {
    shortKey = shortKey.toLocaleLowerCase()
    const keys = shortKey.split('+')
    const lastKey = keys[keys.length - 1]
    const cmdOrCtrl = keys.indexOf('cmdorctrl') > -1

    return {
      altKey: keys.indexOf('alt') > -1,
      shiftKey: keys.indexOf('shift') > -1,
      metaKey: keys.indexOf('meta') > -1 || (cmdOrCtrl && this.osx),
      ctrlKey: keys.indexOf('ctrl') > -1 || (cmdOrCtrl && !this.osx),
      key: lastKey,
    }
  }
}

export function withShortcutsContext<OwnProps>(WrappedComponent: React.ComponentType<OwnProps>) {
  const SFC: React.ComponentType<OwnProps> = (props) => (
    <ShortcutsContext.Consumer>
      {(context) => <WrappedComponent {...context} {...props} />}
    </ShortcutsContext.Consumer>
  )
  SFC.displayName = 'withShortcutsContext'
  return SFC
}
