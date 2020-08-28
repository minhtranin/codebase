import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Grid from '../../../common/grid'
import { NavHashLink } from '../../../common/hashLink'
import SecondaryNavigation from '../../../common/secondaryNavigation'
import styled from '../../../common/styled-components'
import { OrderPanorama, PanoramaType } from '../types'
import PanoramaEditor from './panoramaEditor'

const mockPanoramaData: OrderPanorama = {
  date: '22/04/17',
  fileName: 'some-filename.jpg',
  hfov: 360,
  id: '1',
  initialHorizontalAngle: 20,
  initialVerticalAngle: 0,
  initialZoom: 90,
  thumbUrl: 'https://picsum.photos/640/480?image=1081',
  title: 'Lorem ipsum',
  type: PanoramaType.Spherical
}

const Heading = styled(Grid.Heading)`
  button {
    display: none;
  }
`

interface RouteParams {
  panoramaId: OrderPanorama['id']
}

class PanoramaEdit extends React.PureComponent<RouteComponentProps<RouteParams>> {
  handleSubmit = (values: OrderPanorama) => {
    log.debug('submit', values)
  }
  render () {
    const { panoramaId } = this.props.match.params
    return (
      <Grid.Wrapper>
        <Heading>
          <h1>Edit Panorama</h1>
        </Heading>
        <Grid.LeftDesktopAside>
          <SecondaryNavigation>
            <li><NavHashLink to='#starting'>Starting point</NavHashLink></li>
          </SecondaryNavigation>
        </Grid.LeftDesktopAside>
        <PanoramaEditor
          panorama={{
            ...mockPanoramaData,
            id: panoramaId
          }}
          onSubmit={this.handleSubmit}
        />
      </Grid.Wrapper>
    )
  }
}

export default PanoramaEdit
