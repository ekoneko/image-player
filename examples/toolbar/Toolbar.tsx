import React from 'react'
import { StyledToolbar, StyledToolbarGrid } from './Toolbar.style'
import { ToolbarButton } from './ToolbarButton'
import {
  RotateProvider,
  RotateHandlers,
  ScaleProvider,
  ScaleHandlers,
  NavigateProvider,
  NavigateHandlers,
} from '../../src'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../../src/consts'
import { Image } from '../../src/types/Image'
import ICON_MINUS from '../assets/minus.svg'
import ICON_PLUS from '../assets/plus.svg'
import ICON_ROTATE_LEFT from '../assets/rotate-l.svg'
import ICON_ROTATE_RIGHT from '../assets/rotate-r.svg'
import ICON_PREV from '../assets/prev.svg'
import ICON_NEXT from '../assets/next.svg'

export interface ToolbarProps {
  scale: number
  rotate: number
  index: number
  imageList: Image[]
  onScale: (scale: number) => void
  onRotate: (rotate: number) => void
  onIndexChange: (index: number) => void
}
export interface ToolbarState {}

interface Handles extends NavigateHandlers, RotateHandlers, ScaleHandlers {}

class WrappedToolbar extends React.PureComponent<ToolbarProps & Handles, ToolbarState> {
  render() {
    const { scale } = this.props
    return (
      <StyledToolbar>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onNavigatePrev}>
            <img src={ICON_PREV} />
          </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onNavigateNext}>
            <img src={ICON_NEXT} />
          </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onRotateLeft}>
            <img src={ICON_ROTATE_LEFT} />
          </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onRotateRight}>
            <img src={ICON_ROTATE_RIGHT} />
          </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onScaleDown} disabled={scale <= MIN_SCALE_SIZE}>
            <img src={ICON_MINUS} />
          </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onScaleUp} disabled={scale >= MAX_SCALE_SIZE}>
            <img src={ICON_PLUS} />
          </ToolbarButton>
        </StyledToolbarGrid>
      </StyledToolbar>
    )
  }
}

export const Toolbar: React.SFC<{}> = (props) => {
  return (
    <NavigateProvider>
      {(index, imageList, navigateHandlers) => (
        <RotateProvider>
          {(rotate, rotateHandlers) => (
            <ScaleProvider>
              {(scale, scaleHandlers) => (
                <WrappedToolbar
                  rotate={rotate}
                  scale={scale}
                  index={index}
                  imageList={imageList}
                  {...scaleHandlers}
                  {...navigateHandlers}
                  {...rotateHandlers}
                />
              )}
            </ScaleProvider>
          )}
        </RotateProvider>
      )}
    </NavigateProvider>
  )
}
Toolbar.displayName = 'Toolbar'
