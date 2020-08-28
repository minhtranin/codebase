import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from '../../../common/styled-components'
import { Header, ListTitle, ListWrapper } from '../styled'
import { OrderPanorama, PanoramaType } from '../types'
import PanoramasList from './panoramasList'
import PanoramasUploader from './panoramasUploader'

const mockOrderPanoramas: OrderPanorama[] = [{
  date: '06/23/18',
  fileName: 'some-filename.jpg',
  hfov: 360,
  id: '1',
  initialHorizontalAngle: 0,
  initialVerticalAngle: 0,
  initialZoom: 40,
  thumbUrl: 'https://picsum.photos/640/480?image=1081',
  title: 'Lorem ipsum',
  type: PanoramaType.Spherical
}, {
  date: '06/23/18',
  fileName: 'some-filename.jpg',
  hfov: 360,
  id: '2',
  initialHorizontalAngle: 0,
  initialVerticalAngle: 0,
  initialZoom: 40,
  thumbUrl: 'https://picsum.photos/640/480?image=1040',
  title: 'Panorama title',
  type: PanoramaType.Spherical
}, {
  date: '06/23/18',
  fileName: 'some-filename.jpg',
  hfov: 360,
  id: '3',
  initialHorizontalAngle: 0,
  initialVerticalAngle: 0,
  initialZoom: 40,
  thumbUrl: 'https://picsum.photos/640/480?image=1078',
  title: 'Another panorama',
  type: PanoramaType.Spherical
}, {
  date: '06/23/18',
  fileName: 'some-filename.jpg',
  hfov: 360,
  id: '4',
  initialHorizontalAngle: 0,
  initialVerticalAngle: 0,
  initialZoom: 40,
  thumbUrl: 'https://picsum.photos/640/480?image=1031',
  title: 'Some test caption',
  type: PanoramaType.Spherical
}, {
  date: '06/23/18',
  fileName: 'some-filename.jpg',
  hfov: 360,
  id: '5',
  initialHorizontalAngle: 0,
  initialVerticalAngle: 0,
  initialZoom: 40,
  thumbUrl: 'https://picsum.photos/640/480?image=946',
  title: '',
  type: PanoramaType.Spherical
}]

const UploadedCount = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.LABEL_TEXT};

  span {
    font-weight: 500;
    color: ${props => props.theme.colors.TEXT_SELECTED};
  }
`

interface PanoramasState {
  panoramas: OrderPanorama[]
}

// When integrated with Apollo list of panoramas can be stored in apollo cache instead of component state
class Panoramas extends React.PureComponent<RouteComponentProps, PanoramasState> {
  // if list of panoramas  is stored in Apollo cache state can be removed
  state: PanoramasState = {
    panoramas: mockOrderPanoramas
  }

  handleAddFile = (panorama: OrderPanorama) => {
    this.setState(prevState => ({
      panoramas: [...prevState.panoramas, panorama]
    }))
  }

  handleOrderPanoramasUpdate = (id: OrderPanorama['id'], payload: Partial<OrderPanorama>) => {
    // here update request will be sent
    log.debug('update', id, payload)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    const updatedOrderPanoramas = this.state.panoramas.map(panorama => {
      if (id === panorama.id) {
        return {
          ...panorama,
          ...payload
        }
      } else {
        return panorama
      }
    })

    this.setState({
      panoramas: updatedOrderPanoramas
    })
  }

  handleOrderPanoramasDelete = (id: OrderPanorama['id']) => {
    log.debug('delete', id)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    this.setState(prevState => ({
      panoramas: prevState.panoramas.filter(panorama => id !== panorama.id)
    }))
  }

  render () {
    return (
      <>
        <PanoramasUploader onFileUploaded={this.handleAddFile} />
        <ListWrapper>
          <Header>
            <ListTitle>Panoramas</ListTitle>
            <UploadedCount>Uploaded: <span>{this.state.panoramas.length}</span></UploadedCount>
          </Header>
          <PanoramasList
            panoramas={this.state.panoramas}
            onUpdate={this.handleOrderPanoramasUpdate}
            onDelete={this.handleOrderPanoramasDelete}
          />
        </ListWrapper>
      </>
    )
  }
}

export default Panoramas
