import React from 'react'
import { StyledToolbar, StyledToolbarGrid } from './Toolbar.style'
import { ToolbarButton } from './ToolbarButton'
import { useRotate, useScale, useNavigate } from '../../src'
import { MIN_SCALE_SIZE, MAX_SCALE_SIZE } from '../../src/consts'
import ICON_MINUS from '../assets/minus.svg'
import ICON_PLUS from '../assets/plus.svg'
import ICON_ROTATE_LEFT from '../assets/rotate-l.svg'
import ICON_ROTATE_RIGHT from '../assets/rotate-r.svg'
import ICON_PREV from '../assets/prev.svg'
import ICON_NEXT from '../assets/next.svg'

export const Toolbar: React.FC = () => {
  const { onNavigatePrev, onNavigateNext } = useNavigate()
  const { scale, onScaleDown, onScaleUp } = useScale()
  const { rotate, onRotateLeft, onRotateRight } = useRotate()
  return (
    <StyledToolbar>
      <StyledToolbarGrid>
        <ToolbarButton onClick={onNavigatePrev}>
          <img src={ICON_PREV} />
        </ToolbarButton>
      </StyledToolbarGrid>
      <StyledToolbarGrid>
        <ToolbarButton onClick={onNavigateNext}>
          <img src={ICON_NEXT} />
        </ToolbarButton>
      </StyledToolbarGrid>
      <StyledToolbarGrid>
        <ToolbarButton onClick={onRotateLeft}>
          <img src={ICON_ROTATE_LEFT} />
        </ToolbarButton>
      </StyledToolbarGrid>
      <StyledToolbarGrid>
        <ToolbarButton onClick={onRotateRight}>
          <img src={ICON_ROTATE_RIGHT} />
        </ToolbarButton>
      </StyledToolbarGrid>
      <StyledToolbarGrid>
        <ToolbarButton onClick={onScaleDown} disabled={scale <= MIN_SCALE_SIZE}>
          <img src={ICON_MINUS} />
        </ToolbarButton>
      </StyledToolbarGrid>
      <StyledToolbarGrid>
        <ToolbarButton onClick={onScaleUp} disabled={scale >= MAX_SCALE_SIZE}>
          <img src={ICON_PLUS} />
        </ToolbarButton>
      </StyledToolbarGrid>
    </StyledToolbar>
  )
}
