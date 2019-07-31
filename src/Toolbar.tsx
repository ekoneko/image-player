import React from 'react'
import { StyledToolbar, StyledToolbarGrid } from './Toolbar.style'
import { ToolbarButton } from './ToolbarButton'
import { RotateProvider } from './toolbar/RotateProvider'
import { ScaleProvider } from './toolbar/ScaleProvider'
import { NavigateProvider } from './toolbar/NavigateProvider'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from './consts'
import { Image } from './types/Image'

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
class WrappedToolbar extends React.PureComponent<ToolbarProps, ToolbarState> {
  render() {
    const { scale } = this.props
    return (
      <StyledToolbar>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.handlePrev}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.handleNext}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.handleRotateLeft}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.handleRotateRight}> </ToolbarButton>
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.handleScaleDown} disabled={scale <= MIN_SCALE_SIZE} />
        </StyledToolbarGrid>
        <StyledToolbarGrid>
          <ToolbarButton onClick={this.handleScaleUp} disabled={scale >= MAX_SCALE_SIZE} />
        </StyledToolbarGrid>
      </StyledToolbar>
    )
  }

  private handleRotateLeft = () => {
    const { rotate, onRotate } = this.props
    onRotate(rotate - 90)
  }

  private handleRotateRight = () => {
    const { rotate, onRotate } = this.props
    onRotate(rotate + 90)
  }

  private handleScaleUp = () => {
    const { scale, onScale } = this.props
    onScale(scale + 0.2)
  }

  private handleScaleDown = () => {
    const { scale, onScale } = this.props
    onScale(scale - 0.2)
  }

  private handlePrev = () => {
    const { index, imageList, onIndexChange } = this.props
    if (index > 0) {
      onIndexChange(index - 1)
    }
  }

  private handleNext = () => {
    const { index, imageList, onIndexChange } = this.props
    if (index < imageList.length - 1) {
      onIndexChange(index + 1)
    }
  }
}

export const Toolbar: React.SFC<{}> = (props) => {
  return (
    <NavigateProvider>
      {(index, imageList, { onIndexChange }) => (
        <RotateProvider>
          {(rotate, { onRotate }) => (
            <ScaleProvider>
              {(scale, { onScale }) => (
                <WrappedToolbar
                  rotate={rotate}
                  scale={scale}
                  index={index}
                  imageList={imageList}
                  onRotate={onRotate}
                  onScale={onScale}
                  onIndexChange={onIndexChange}
                />
              )}
            </ScaleProvider>
          )}
        </RotateProvider>
      )}
    </NavigateProvider>
  )
}
