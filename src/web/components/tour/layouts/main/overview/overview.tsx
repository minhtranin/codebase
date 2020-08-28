// import { publicUrls } from '#veewme/lib/urls'
import styled from '#veewme/web/common/styled-components'
import React, { FunctionComponent } from 'react'
import { Tour } from '../../../types'
import { Container } from '../styled'
import Banner from './banner'
import BannerKenburns from './bannerKenburns'
import ContactBox from './contactBox'
import Description from './description'

// TODO needed just for demo. Remove in future
import { NavLink } from 'react-router-dom'

const DemoLinks = () => (
  <Container style={{ padding: '20px 0' }}>
    <p style={{ margin: '15px 0' }}>Links to different layout versions (with different config)</p>
    <NavLink to='/tour/1/l/l1'>Demo 1 (Price in header)</NavLink><br/>
    <NavLink to='/tour/2/l/l1'>Demo 2 (Call agent in header and Kenburns banner)</NavLink><br/>
    <NavLink to='/tour/3/l/l1'>Demo 3 (Logo in header)</NavLink>
  </Container>
)

const Wrapper = styled(Container).attrs({
  as: 'main'
})`
  display: flex;

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

interface OverviewProps {
  tour: Tour
}

const Overview: FunctionComponent<OverviewProps> = props => {
  let BannerComponent = <Banner photos={props.tour.bannerPhotos} customBanner={props.tour.customBanner} title={props.tour.title} />
  if (props.tour.bannerType === 'KENBURNS') {
    BannerComponent = <BannerKenburns photos={props.tour.bannerPhotos} title={props.tour.title} audioSrc={props.tour.slideshowAudioSrc} />
  }
  return (
    <>
      {BannerComponent}
      <Wrapper>
        <Description tour={props.tour} />
        <ContactBox contactPerson={props.tour.contactPerson} />
      </Wrapper>
      <DemoLinks />
    </>
  )
}
export default Overview
