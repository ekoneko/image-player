import React from 'react'
import { withContext, ProviderState } from '../Provider'
import { Image } from '../types/Image'

export interface NavigateHandlers {
  onIndexChange: (index: number) => void
  onNavigatePrev: () => void
  onNavigateNext: () => void
}

export interface NavigateProviderProps {
  children: (index: number, imageList: Image[], handlers: NavigateHandlers) => JSX.Element
}

class WrappedNavigateProvider extends React.PureComponent<
  NavigateProviderProps & ProviderState,
  {}
> {
  private handlers: NavigateHandlers = {} as any
  constructor(props: NavigateProviderProps & ProviderState) {
    super(props)
    this.handlers = {
      onIndexChange: this.handleIndexChange,
      onNavigatePrev: this.handleNavigatePrev,
      onNavigateNext: this.handleNavigateNext,
    }
  }
  render() {
    const { index, imageList } = this.props
    return this.props.children(index, imageList, this.handlers)
  }

  handleIndexChange = async (nextIndex: number) => {
    const currentImage = this.props.imageList[nextIndex]
    if (currentImage) {
      if (currentImage.src) {
        await this.preload(currentImage.src)
      }
    }
    this.props.updateState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      index: nextIndex,
      useTransition: false,
    })
  }

  handleNavigatePrev = () => {
    const { index } = this.props
    if (index > 0) {
      this.handleIndexChange(index - 1)
    }
  }

  handleNavigateNext = () => {
    const { index, imageList } = this.props
    if (index < imageList.length - 1) {
      this.handleIndexChange(index + 1)
    }
  }

  preload = (src: string) => {
    const img = document.createElement('img')
    return new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = src
    })
  }
}
export const NavigateProvider = withContext<NavigateProviderProps>(WrappedNavigateProvider)
