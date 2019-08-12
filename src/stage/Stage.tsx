import React from 'react'
import { withContext, ProviderState } from '../Provider'
import {
  StyledStage,
  StyledImageContainer,
  StyledImage,
  StyledStageSwitchAnimateWrapper,
} from './Stage.style'
import classnames from 'classnames'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../consts'

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
  public switchAnimateRef = React.createRef<HTMLDivElement>()
  public containerRef = React.createRef<HTMLDivElement>()
  public state: StageState = {}

  private dragging: Dragging | null = null

  public componentDidMount() {
    if (this.containerRef.current) {
      this.containerRef.current.addEventListener('wheel', this.handleWheel)
    }

    if (this.wrapperRef.current) {
      const { width, height } = this.wrapperRef.current.getBoundingClientRect()
      this.props.updateState({ width, height })
    }
  }

  public getSnapshotBeforeUpdate(prevProps: StageProps & ProviderState) {
    if (prevProps.index !== this.props.index && prevProps.imageList === this.props.imageList) {
      if (this.containerRef.current && this.switchAnimateRef.current) {
        const cloneNode = this.containerRef.current.cloneNode(true) as HTMLElement
        if (this.props.index > prevProps.index) {
          this.switchAnimateRef.current.style.transition = 'none'
          this.switchAnimateRef.current.style.transform = 'translate(100%, 0)'
          cloneNode.style.left = '-100%'
          this.switchAnimateRef.current.insertBefore(cloneNode, this.containerRef.current)
        } else {
          this.switchAnimateRef.current.style.transition = 'none'
          this.switchAnimateRef.current.style.transform = 'translate(-100%, 0)'
          cloneNode.style.left = '100%'
          this.switchAnimateRef.current.appendChild(cloneNode)
        }
        return cloneNode
      }
    }
    return null
  }

  public componentDidUpdate(
    _prevProps: StageProps & ProviderState,
    _prevState: StageState,
    snapshot: HTMLElement | null,
  ) {
    if (snapshot) {
      // wait for dom rending over
      setTimeout(() => {
        if (this.switchAnimateRef.current) {
          this.switchAnimateRef.current.removeAttribute('style')
          // wait for animating over
          setTimeout(() => {
            if (document.body.contains(snapshot)) {
              // snapshot.remove()
            }
          }, 300)
        }
      }, 0)
    }
  }

  public render() {
    const { className, imageList, index, useTransition } = this.props
    const currentImage = imageList[index]
    return (
      <StyledStage className={classnames(className)} ref={this.wrapperRef}>
        <StyledStageSwitchAnimateWrapper ref={this.switchAnimateRef}>
          <StyledImageContainer
            ref={this.containerRef}
            style={this.getContainerStyle()}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseUp}
            useTransition={useTransition}
          >
            <StyledImage
              src={currentImage.src}
              alt=""
              onError={this.handleError}
              onLoad={this.handleLoad}
              draggable={false}
              style={this.getImageStyle()}
              useTransition={useTransition}
            />
          </StyledImageContainer>
        </StyledStageSwitchAnimateWrapper>
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
      useTransition: false,
    })
  }

  private handleMouseUp = () => {
    this.dragging = null
  }

  private handleWheel = (e: WheelEvent) => {
    // Prevent origin navigate gestures
    e.preventDefault()
    e.stopPropagation()
    if (e.ctrlKey || e.metaKey) {
      this.handleScale(e.x, e.y, e.deltaY)
    }
  }

  private handleScale = (x: number, y: number, delta: number) => {
    const rawScale = this.props.scale - delta / 100
    const scale = Math.max(MIN_SCALE_SIZE, Math.min(MAX_SCALE_SIZE, rawScale))
    const wrapperRect = this.wrapperRef.current!.getBoundingClientRect()
    const translateX =
      ((x - wrapperRect.left - this.props.translateX) / this.props.scale) *
        (this.props.scale - scale) +
      this.props.translateX
    const translateY =
      ((y - wrapperRect.top - this.props.translateY) / this.props.scale) *
        (this.props.scale - scale) +
      this.props.translateY
    this.props.updateState({
      scale,
      translateX,
      translateY,
      useTransition: false,
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
