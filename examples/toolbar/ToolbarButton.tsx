import React from 'react'
import { StyledButton } from './Toolbar.style'

export interface ToolbarButtonProps {
  disabled?: boolean
  onClick?: () => void
}

export const ToolbarButton: React.SFC<ToolbarButtonProps> = (props) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
}
