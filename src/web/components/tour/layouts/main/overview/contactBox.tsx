import Button from '#veewme/web/common/buttons/basicButton'
import styled from '#veewme/web/common/styled-components'
import React, { FunctionComponent } from 'react'
import { TourContext } from '..'
import { Tour } from '../../../types'
import ContactModal from '../contactForm'

import { FacebookF, LinkedinIn } from 'styled-icons/fa-brands'
import { GlobeAmericas } from 'styled-icons/fa-solid'

const Wrapper = styled.div<{ mainColor: string }>`
  flex: 1 0 auto;

  h3 {
    margin: 10px 0;
    color: ${props => props.theme.colors.LABEL_TEXT};
    font-size: 20px;
    font-weight: 400;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    flex: 0 0 auto;
    margin-top: 20px;

    h3 {
      text-align: center;
    }
  }
`

const MiddleHolder = styled.div`
  display: flex;
  padding-bottom: 10px;

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    display: block;
    text-align: center;
  }
`

const MiddleRightHolder = styled.div`
  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    padding-left: 10px
  }
`

const Name = styled.div`
  font-size: 18px;
  padding-bottom: 1px;
`

const DetailsRow = styled.div`
  font-size: 12px;
  padding-bottom: 1px;
  color: ${props => props.theme.colors.DARK_GREY};
`

const Title = styled(DetailsRow)`
  margin-bottom: 7px;
`

const ImageHolder = styled.div`
  flex: 0 0 150px;
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
  background: #eee;
  border-radius: 5px;

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    margin: 0 auto 10px;
  }
`

const Links = styled.div`
  padding-top: 6px;
`

const Link = styled.a`
  display: inline-flex;
  width: 30px
  height: 30px;
  margin-right: 4px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  ${props => !props.href && 'display: none;'}

  svg {
    color: #fff;
  }

  &:hover {
    opacity: 0.8;
  }
`

const FacebookLink = styled(Link)`
  background: ${props => props.theme.colors.FACEBOOK};
`

const WebsiteLink = styled(Link)<{ color: string }>`
  background: ${props => props.color};
`

const LinkedinLink = styled(Link)`
  background: ${props => props.theme.colors.LINKEDIN};
`

const CustomButton = styled(props => <Button {...props}/>)<{ color: string }>`
  background-color: ${props => props.color} !important;
  border-color: ${props => props.color} !important;

  &:first-child {
    margin-right: 7px;
  }

  &:hover {
    opacity: 0.8;
  }
`

interface ContactBoxProps {
  contactPerson: Tour['contactPerson']
}

const ContactBox: FunctionComponent<ContactBoxProps> = ({ contactPerson }) => {
  const mainColor = React.useContext(TourContext).mainColor
  const [ contactFormVisible, toggleContactForm ] = React.useState<boolean>(false)

  return (
    <Wrapper mainColor={mainColor}>
      <h3>Contact</h3>
      <MiddleHolder className='h-card'>
        {/* TODO: replace with image */}
        <ImageHolder className='u-photo'/>
        <MiddleRightHolder>
          <Name className='p-name'>{contactPerson.name}</Name>
          <Title className='p-job-title'>
            {contactPerson.title}
          </Title>
          <DetailsRow className='p-org'>{contactPerson.company}</DetailsRow>
          <DetailsRow className='p-tel'>Office: {contactPerson.officeNumber}</DetailsRow>
          <DetailsRow className='p-tel'>Fax: {contactPerson.faxNumber}</DetailsRow>
          <DetailsRow className='p-tel'>Mobile: {contactPerson.mobile}</DetailsRow>
          <Links>
            <WebsiteLink className='u-url' href={contactPerson.websiteUrl} color={mainColor}>
              <GlobeAmericas size='16' />
            </WebsiteLink>
            <FacebookLink className='u-url' href={contactPerson.facebookUrl}>
              <FacebookF size='18' />
            </FacebookLink>
            <LinkedinLink className='u-url' href={contactPerson.linkedinUrl}>
              <LinkedinIn size='17' />
            </LinkedinLink>
          </Links>
        </MiddleRightHolder>
      </MiddleHolder>
      <div>
        <CustomButton color={mainColor} to='#' label='More properties' buttonTheme='info' full />
        <CustomButton color={mainColor} onClick={() => toggleContactForm(true)} label='Contact Me' buttonTheme='info' full />
      </div>
      <ContactModal modalVisible={contactFormVisible} toggleModal={() => toggleContactForm(false)}/>
    </Wrapper>
  )
}
export default ContactBox
