import styled from 'styled-components'

export const StyledStage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  user-select: none;
`

export const StyledStageSwitchAnimateWrapper = styled.div`
  transition: transform 0.3s ease-in-out;
  height: 100%;
`

interface StyledImageContainerProps {
  useTransition?: boolean
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
  transition: ${({ useTransition }) => (useTransition ? 'all 0.3s ease-in-out' : 'none')};
`

interface StyledImageProps {
  useTransition?: boolean
}

export const StyledImage = styled.img<StyledImageProps>`
  max-width: 100%;
  max-height: 100%;
  font-size: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  transition: ${({ useTransition }) => (useTransition ? 'all 0.3s ease-in-out' : 'none')};
  transform-origin: center center;
`
