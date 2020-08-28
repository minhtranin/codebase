import { UnreachableCaseError } from '#veewme/lib/error'
import styled from '#veewme/web/common/styled-components'
import React, { FunctionComponent } from 'react'
import { Tour } from '../../types'
import { TourContext } from '.'
import Menu, { HamburgerMenu } from './menu'
import { Container } from './styled'

import { Phone, PurchaseTag } from 'styled-icons/boxicons-solid'

const TopWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`

const HeaderStyled = styled.header`
  background-color: rgba(255, 255, 255, 0.93);
  box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.3);
  color: ${props => props.theme.colors.FIELD_TEXT};
  z-index: 3;
}

  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 19px;
    line-height: 1.2em;
    height: 65px;

    @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
      height: 48px;
      font-size: 15px;

  }
`

const Address = styled.div`
  max-width: 200px;
  line-height: 1.1em;
`

const RightComponentWrapper = styled.div`
  & > div {
    display: none;

    @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
      display: block;
    }
  }
`

const ImageWrapper = styled.div`
  display: flex;
  height: 100%;

  img {
    align-self: center;
  }
`

const PriceStyled = styled.div<{
  mirrorIcon?: boolean
  mainColor: string
}>`
  font-size: 24px;

  svg {
    fill: ${props => props.mainColor};
    ${props => props.mirrorIcon && 'transform: scale(-1, 1);'}
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    font-size: 18px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`

const Currency = styled.span`
  font-size: 22px;
  margin-left: 10px;

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    margin-left: 5px;
    font-size: 18px;
  }
`

const HintText = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 400;
  text-align: right;
  color: ${props => props.theme.colors.FIELD_TEXT};

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    font-size: 11px;
  }
`

const Price: React.FunctionComponent<{
  price: Tour['price']
  mainColor: string
}> = ({ mainColor, price }) => (
  <PriceStyled mirrorIcon mainColor={mainColor}>
    <div>
      <PurchaseTag size='24'/>
      <span><Currency>$</Currency>{`${price}`}</span>
      <HintText>Residential Home</HintText>
    </div>
  </PriceStyled>
)

const Call: React.FunctionComponent<{
  phone: Tour['agentPhone']
  mainColor: string
}> = ({ mainColor, phone }) => (
  <PriceStyled mainColor={mainColor}>
    <div>
      <Phone size='26'/>
      {phone}
      <HintText>Call agent</HintText>
    </div>
  </PriceStyled>
)

const Logo: React.FunctionComponent<{ url: Tour['headerLogoUrl'] }> = ({ url }) => (
  <ImageWrapper><img src={url} alt='logo' /></ImageWrapper>
)

interface HeaderProps {
  tour: Tour
}

const Header: FunctionComponent<HeaderProps> = ({ tour }) => {
  const mainColor = React.useContext(TourContext).mainColor

  let rightComponent: JSX.Element
  switch (tour.headerRightComponent) {
    case 'Price':
      rightComponent = <Price mainColor={mainColor} price={tour.price} />
      break
    case 'Logo':
      rightComponent = <Logo url={tour.headerLogoUrl} />
      break
    case 'Call':
      rightComponent = <Call mainColor={mainColor} phone={tour.agentPhone} />
      break
    default:
      throw new UnreachableCaseError(tour.headerRightComponent)
  }

  return (
    <TopWrapper>
      <HeaderStyled>
        <Container>
          <Address>{tour.address}</Address>
          <RightComponentWrapper>
            {rightComponent}
            <HamburgerMenu tour={tour} />
          </RightComponentWrapper>
        </Container>
      </HeaderStyled>
      <Menu tour={tour}/>
    </TopWrapper>
  )
}
export default Header
