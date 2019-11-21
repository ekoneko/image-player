import styled from 'styled-components'

export const StyledStage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
`

export const StyledStageSwitchAnimateWrapper = styled.div`
  transition: transform 0.3s ease-in-out;
  height: 100%;
`

interface StyledImageContainerProps {
  useTransition?: boolean
  pinchTransition?: boolean
}

function getImageContainerTransition(props: StyledImageContainerProps) {
  const { useTransition, pinchTransition } = props
  if (useTransition) {
    return 'all 0.3s ease-in-out'
  }
  if (pinchTransition) {
    return 'all 0.1s linear'
  }
  return 'none'
}

export const StyledImageContainer = styled.div<StyledImageContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-origin: left top;
  position: absolute;
  transition: ${getImageContainerTransition};
`

interface StyledImageProps {
  useTransition?: boolean
}

export const StyledImage = styled.img<StyledImageProps>`
  max-width: 100%;
  max-height: 100%;
  font-size: 18px;
  transition: ${({ useTransition }) => (useTransition ? 'all 0.3s ease-in-out' : 'none')};
  transform-origin: center center;
`
