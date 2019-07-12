import React from 'react'
import { withContext, ProviderState } from './Provider'
import { StyledStage, StyledImageContainer, StyledImage } from './Stage.style'
import classnames from 'classnames'

export interface StageProps {
  className?: string
}
export interface StageState {}

interface Dragging {
  startX: number
  startY: number
  originX: number
  originY: number
}

class WrappedStage extends React.PureComponent<StageProps & ProviderState, StageState> {
  static displayName = 'Stage'

  public wrapperRef = React.createRef<HTMLDivElement>()
  public containerRef = React.createRef<HTMLDivElement>()
  public state: StageState = {}

  private dragging: Dragging | null = null

  public componentDidMount() {
    if (this.containerRef.current) {
      this.containerRef.current.addEventListener('wheel', this.handleWheel)
    }
  }

  public render() {
    const { className, imageList, index } = this.props
    const currentImage = imageList[index]
    return (
      <StyledStage className={classnames(className)} ref={this.wrapperRef}>
        <StyledImageContainer
          ref={this.containerRef}
          style={this.getContainerStyle()}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseUp}
        >
          <StyledImage
            src={currentImage.src}
            alt=""
            onError={this.handleError}
            onLoad={this.handleLoad}
            draggable={false}
            style={this.getImageStyle()}
            useTransition
          />
        </StyledImageContainer>
      </StyledStage>
    )
  }

  private handleLoad = () => {
    // TODO: ready state
  }

  private handleError = () => {
    // TODO: what to do if load failed
  }

  private handleMouseDown = (e: React.MouseEvent) => {
    this.dragging = {
      startX: e.clientX,
      startY: e.clientY,
      originX: this.props.translateX,
      originY: this.props.translateY,
    }
  }

  private handleMouseMove = (e: React.MouseEvent) => {
    if (!this.dragging) {
      return
    }
    const translateX = this.dragging.originX + e.clientX - this.dragging.startX
    const translateY = this.dragging.originY + e.clientY - this.dragging.startY
    this.props.updateState({
      translateX: translateX,
      translateY: translateY,
    })
  }

  private handleMouseUp = () => {
    this.dragging = null
  }

  private handleWheel = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    const scale = Math.max(0.25, Math.min(3, this.props.scale - e.deltaY / 100))
    const wrapperRect = this.wrapperRef.current!.getBoundingClientRect()
    const translateX =
      ((e.x - wrapperRect.left - this.props.translateX) / this.props.scale) *
        (this.props.scale - scale) +
      this.props.translateX
    const translateY =
      ((e.y - wrapperRect.top - this.props.translateY) / this.props.scale) *
        (this.props.scale - scale) +
      this.props.translateY
    this.props.updateState({
      scale,
      translateX,
      translateY,
    })
  }

  private getContainerStyle = () => {
    const { scale, translateX, translateY } = this.props
    return {
      transform: `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`,
    }
  }

  private getImageStyle = () => {
    const { rotate } = this.props
    return {
      transform: `rotate(${rotate}deg)`,
    }
  }
}

export const Stage = withContext<StageProps>(WrappedStage)
