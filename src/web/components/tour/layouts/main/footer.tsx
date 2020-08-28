import * as log from '#veewme/web/common/log'
import styled from '#veewme/web/common/styled-components'
import React, { FunctionComponent } from 'react'
import { Tour } from '../../types'
import { TourContext } from '.'
import ContactModal from './contactForm'
import { Container } from './styled'

import { MapMarkerAlt } from 'styled-icons/fa-solid'
import { Email, Print } from 'styled-icons/material'

const FooterBottom = styled.div<{ mainColor: string }>`
  padding: 25px 0;
  background: ${props => props.mainColor};
  color: #fff;
  font-size: 12px;
  text-align: center;
`

const FooterTop = styled.div`
  padding: 20px 0;
  background: ${props => props.theme.colors.TOUR_FOOTER};

  ${Container} {
    display: flex;
    justify-content: flex-end;

    @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
      justify-content: center;
    }
  }
`

const FooterImgWrapper = styled.a`
  display: block;
  margin: 15px auto 20px;
  background: #fff;
  width: 150px;
  height: 65px;
  color: #bbb;
  text-align: center;
  line-height: 65px;
`

const Wrapper = styled.footer`
  flex: 0 0 auto;
`

const StyledLink = styled.div<{ href?: string, target?: string }>`
  flex: 0 0 auto;
  padding: 13px;
  margin-left: 20px;
  text-align: center;
  background: ${props => props.theme.colors.DARK_GREY};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.75);
  font-size: 10px;
  transition: color .5s;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  div {
    margin-top: 3px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    padding: 10px;
    height: 70px;
    min-width: 70px;
    font-size: 9px;
  }

`

interface FooterProps {
  tour: Tour
}

const Footer: FunctionComponent<FooterProps> = ({ tour }) => {
  const [ contactFormVisible, toggleContactForm ] = React.useState<boolean>(false)
  const mainColor = React.useContext(TourContext).mainColor

  return (
    <Wrapper >
      <FooterTop>
        <Container>
          <StyledLink onClick={() => log.debug('Map clicked')}>
            <MapMarkerAlt size='34'/>
            <div>MAP</div>
          </StyledLink>
          <StyledLink onClick={() => toggleContactForm(true)}>
            <Email size='34'/>
            <div>CONTACT</div>
          </StyledLink>
          <StyledLink as='a' href={tour.brochureUrl} target='_blank'>
            <Print size='34'/>
            <div>BROCHURE</div>
          </StyledLink>
        </Container>
      </FooterTop>
      <FooterBottom mainColor={mainColor}>
        <Container>
          <div>Professional Media Services by</div>
          <FooterImgWrapper href='' target='_blank'>Here will be logo</FooterImgWrapper>
          <div>All tour media are copyright of their respective owners.</div>
        </Container>
      </FooterBottom>
      <ContactModal modalVisible={contactFormVisible} toggleModal={() => toggleContactForm(false)}/>
    </Wrapper>
  )
}
export default Footer
