import React from 'react'
import { withContext, ProviderState } from '../Provider'
import { Image } from '../types/Image'

interface NavigateHandlers {
  onIndexChange: (index: number) => void
}

export interface NavigateProviderProps {
  children: (index: number, imageList: Image[], handlers: NavigateHandlers) => JSX.Element
}

const WrappedNavigateProvider: React.SFC<NavigateProviderProps & ProviderState> = (props) => {
  const { index, imageList } = props
  const onIndexChange = (nextIndex: number) => {
    props.updateState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      index: nextIndex,
      useTransition: false,
    })
  }
  return props.children(index, imageList, { onIndexChange })
}

export const NavigateProvider = withContext<NavigateProviderProps>(WrappedNavigateProvider)
