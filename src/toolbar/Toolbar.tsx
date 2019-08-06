import React from 'react'
import { StyledToolbar, StyledToolbarGrid } from './Toolbar.style'
import { ToolbarButton } from './ToolbarButton'
import { RotateProvider, RotateHandlers } from '../stateProviders/RotateProvider'
import { ScaleProvider, ScaleHandlers } from '../stateProviders/ScaleProvider'
import { NavigateProvider, NavigateHandlers } from '../stateProviders/NavigateProvider'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../consts'
import { Image } from '../types/Image'

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
          <ToolbarButton onClick={this.props.onNavigatePrev}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onNavigateNext}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onRotateLeft}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onRotateRight}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onScaleDown} disabled={scale <= MIN_SCALE_SIZE} />
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.props.onScaleUp} disabled={scale >= MAX_SCALE_SIZE} />
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
