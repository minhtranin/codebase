import { publicUrls } from '#veewme/lib/urls'
import { rgbaToString } from '#veewme/web/common/formikFields/colorField'
import styled from '#veewme/web/common/styled-components'
import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Tour } from '../../types'
import { TourContext } from '.'
import Footer from './footer'
import Header from './header'
import Overview from './overview'
import Photos from './photos'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 105px;
  min-height: 100vh;

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    padding-top: 48px;
  }

  main {
    flex: 1 0 auto;
    padding: 20px 0;
  }
`

interface LayoutProps {
  tour: Tour
}

const Layout: FunctionComponent<LayoutProps> = props => {
  const mainColor = rgbaToString(props.tour.mainColor)
  const contextData = {
    mainColor
  }

  return (
    <TourContext.Provider value={contextData}>
      <Wrapper>
        <Header tour={props.tour} />
        <Switch>
          <Route exact path={publicUrls.tour} render={() => <Overview tour={props.tour} />} />
          <Route
            path={publicUrls.tourPhotos}
            render={() => (
              <Photos
                photos={props.tour.photos}
                slideshowAudioSrc={props.tour.slideshowAudioSrc}
              />
            )}
          />
          <Route
            path={publicUrls.tourVideo}
            render={({ match }) => (
              <span>Video will be there {match.params.id}</span>
            )}
          />
        </Switch>
        <Footer tour={props.tour} />
      </Wrapper>
    </TourContext.Provider>
  )
}
export default Layout
