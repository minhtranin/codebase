import styled from '#veewme/web/common/styled-components'
import { guidGenerator } from '#veewme/web/common/util'
import * as React from 'react'
import ReactTooltip from 'react-tooltip'

const StyledTooltip = styled(ReactTooltip)`
  &.type-dark {
    background-color: ${props => props.theme.colors.BUBBLE_BACKGROUND} !important;
    padding: 6px 12px;
    border-radius: 25px;
    font-size: 10px;
  }
  &.place-top {
    &:after {
      border-top-color: ${props => props.theme.colors.BUBBLE_BACKGROUND} !important;
    }
  }
  &.place-left {
    &:after {
      border-left-color: ${props => props.theme.colors.BUBBLE_BACKGROUND} !important;
    }
  }
  &.place-right {
    &:after {
      border-right-color: ${props => props.theme.colors.BUBBLE_BACKGROUND} !important;
    }
  }
  &.place-bottom {
    &:after {
      border-bottom-color: ${props => props.theme.colors.BUBBLE_BACKGROUND} !important;
    }
  }
`

interface TooltippedProps {
  delayShow?: number
  delayHide?: number
  tooltip: React.ReactNode
  children: JSX.Element
}

const Tooltipped: React.FunctionComponent<TooltippedProps> = props => {
  const tooltipId = guidGenerator()

  return (
    <>
      {React.cloneElement<{ 'data-tip': boolean, 'data-for': string }>(
        props.children,
        {
          'data-for': tooltipId,
          'data-tip': true,
          ...props.children.props
        }
      )}
      <StyledTooltip
        id={tooltipId}
        effect='solid'
        place='bottom'
        delayShow={props.delayShow}
        delayHide={props.delayHide}
      >
        {props.tooltip}
      </StyledTooltip>
    </>
  )
}

export default Tooltipped
