import React from 'react'
import { ProviderContext } from '../Provider'

function preload(src: string) {
  const img = document.createElement('img')
  return new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
}

export function useNavigate() {
  const { index, imageList, updateState } = React.useContext(ProviderContext)
  async function handleIndexChange(nextIndex: number) {
    const currentImage = imageList[nextIndex]
    if (currentImage) {
      if (currentImage.src) {
        await preload(currentImage.src)
      }
    }
    updateState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotate: 0,
      index: nextIndex,
      useTransition: false,
    })
  }
  function handleNavigatePrev() {
    if (index > 0) {
      handleIndexChange(index - 1)
    }
  }
  function handleNavigateNext() {
    if (index < imageList.length - 1) {
      handleIndexChange(index + 1)
    }
  }

  return {
    index, imageList,
    onIndexChange: handleIndexChange,
    onNavigatePrev: handleNavigatePrev,
    onNavigateNext: handleNavigateNext
  }
}
