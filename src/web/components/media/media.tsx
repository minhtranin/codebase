import { privateUrls } from '#veewme/lib/urls'
import { HCardAddress } from '#veewme/web/common/hCard'
import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { OptionValue, Select } from '../../common/formikFields/selectField'
import styled from '../../common/styled-components'
import TabsBar from '../../common/tabsBar'
import AddVideo from './addVideo/addVideo'
import DocumentEdit from './documentEdit/documentEdit'
import Documents from './documents/documents'
import Flyer from './flyer/flyer'
import AddInteractive from './interactiveForm/addInteractive'
import EditInteractive from './interactiveForm/editInteractive'
import Interactives from './interactives/interactives'
import PanoramaEdit from './panoramaEdit/panoramaEdit'
import Panoramas from './panoramas/panoramas'
import Photos from './photos/photos'
import { DefaultMedia } from './types'
import Videos from './videos/videos'

const pageHorizontalPadding = '35px'
const MediaContainer = styled.section`
  padding: 0 ${pageHorizontalPadding} 70px ${pageHorizontalPadding};
  width: 100%;
`

const MediaTabsBar = styled(TabsBar)``

const MediaHeader = styled.header`
  background-color: white;
  display: flex;
  margin: 0 -${pageHorizontalPadding};
  padding: 35px;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${props => props.theme.colors.BUTTON_BORDER};
  color: ${props => props.theme.colors.LABEL_TEXT};
  font-size: 14px;
  h2 {
    margin-right: 7px;
    font-size: 14px;
  }
`

const TabsHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 15px 0 45px 0;

  header {
    flex: 1 0 auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    margin-bottom: 25px;

    header {
      width: 100%;
    }
  }
`

const DefaultMediaHolder = styled.div`
  width: 350px;
  height: 70px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  border-bottom: 3px solid ${props => props.theme.colors.BUTTON_BORDER};

  & > div {
    width: 100%;
    flex: 1 0 auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    border-bottom: 0 none;
  }
`

const DefaultMediaOptions: Array<OptionValue<DefaultMedia>> = [{
  label: 'Video (Start in Video navigation tab)',
  value: DefaultMedia.Video
}, {
  label: 'Interactive (Start in Interactive navigation tab)',
  value: DefaultMedia.Interactive
}, {
  label: 'Overview (Default)',
  value: DefaultMedia.Overview
}]

const MediaWrappedInTabs: React.FunctionComponent<RouteComponentProps> = props => {
  const orderMediaUrl = props.match.url

  return (
    <MediaContainer>
      <MediaHeader>
        <h2>Media Management</h2>
        <HCardAddress
          address={{
            city: 'Plymouth',
            state: 'MI',
            street: '127 Ford',
            zip: '49180'
          }}
        />
      </MediaHeader>
      <TabsHolder>
        <MediaTabsBar
          tabs={[
            { label: 'Photos', to: `${orderMediaUrl}/photos` },
            { label: 'Video', to: `${orderMediaUrl}/video` },
            { label: 'Interactive', to: `${orderMediaUrl}/interactive` },
            { label: 'Panoramas', to: `${orderMediaUrl}/panoramas` },
            { label: 'Documents', to: `${orderMediaUrl}/documents` },
            { label: 'Flyer', to: `${orderMediaUrl}/flyer` }
          ]}
        />
        <DefaultMediaHolder>
          <Select
            name=''
            placeholder='Select alternate default media to display'
            options={DefaultMediaOptions}
            onChange={option => log.debug(option)}
          />
        </DefaultMediaHolder>
      </TabsHolder>
      <Switch>
        <Route exact path={privateUrls.media} render={({ match }) => <Redirect to={`${match.url}/photos`} />}/>
        <Route exact path={privateUrls.photos} component={Photos}/>
        <Route path={privateUrls.documents} component={Documents}/>
        <Route path={privateUrls.flyer} component={Flyer}/>
        <Route path={privateUrls.panoramas} component={Panoramas}/>
        <Route path={privateUrls.interactive} component={Interactives}/>
        <Route path={privateUrls.video} component={Videos}/>
      </Switch>
    </MediaContainer>
  )
}

const Media: React.FunctionComponent<RouteComponentProps> = () => (
  <Switch>
    <Route path={privateUrls.addVideo} component={AddVideo} />
    <Route path={privateUrls.editDocument} component={DocumentEdit} />
    <Route path={privateUrls.addInteractive} component={AddInteractive} />
    <Route path={privateUrls.editInteractive} component={EditInteractive} />
    <Route path={privateUrls.editPanorama} component={PanoramaEdit} />
    <Route path={privateUrls.media} component={MediaWrappedInTabs}/>
  </Switch>
)

export default withRouter(Media)
