import React from 'react'
import { render } from 'react-dom'
import { Provider, Stage } from '../src'

const imageList = [
  {
    src: 'http://attach.bbs.miui.com/forum/201209/14/193232tqoez8te5emgmf5q.jpg',
  },
]

render(
  <Provider imageList={imageList}>
    <Stage />
  </Provider>,
  document.getElementById('root'),
)
