import MsgSvg from '#veewme/web/assets/svg/msg.svg'
import Button from '#veewme/web/common/buttons/basicButton'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { ServicesConfig, ServiceType } from '../common'

const StyledPrice = styled.h4<{ serviceType: ServiceType }> `
  display: inline-block;
  font-weight: 600;
  font-size: 26px;
  color: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]};
`

const StyledFooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`

const StyledBackFooterContent = styled(StyledFooterContent)`
  justify-content: center;
`

const StyledIcon = styled(props => <props.icon className={props.className} />)`
  width: 24px;
  height: 20px;
  fill: ${props => props.theme.colors.BUTTON}
`

const StyledFlipBackButton = styled(props => <Button {...props} />)`
  &:hover {
    color: ${props => props.theme.colors[ServicesConfig[props.serviceType as ServiceType].color]} !important;
    border-color: ${props => props.theme.colors[ServicesConfig[props.serviceType as ServiceType].color]} !important;
  }
`

interface ServiceCardFooterContentProps {
  serviceType: ServiceType
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface ServiceCardFrontFooterContentProps extends ServiceCardFooterContentProps {
  price: string
}

export const ServiceCardFrontFooterContent: React.FunctionComponent<ServiceCardFrontFooterContentProps> = props => (
  <StyledFooterContent>
    <StyledPrice serviceType={props.serviceType}>{props.price}</StyledPrice>
    <StyledIcon icon={MsgSvg} />
  </StyledFooterContent>
)

export const ServiceCardBackFooterContent: React.FunctionComponent<ServiceCardFooterContentProps> = props => {
  return (
    <StyledBackFooterContent>
      <StyledFlipBackButton label='Flip to front' onClick={props.onClick} serviceType={props.serviceType} />
    </StyledBackFooterContent>
  )
}
