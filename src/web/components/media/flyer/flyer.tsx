import { FlyerLayoutName } from '#veewme/gen/graphqlTypes'
import * as React from 'react'
import { flyerLayoutPhotosCount } from '../../../common/flyerIcons'
import styled from '../../../common/styled-components'
import Gallery from '../photosGallery'
import { OrderPhoto } from '../types'
import SelectedFlyerPanel from './selectedFlyerPanel'

// TODO: temp mock data
import { mockOrderPhotos } from '../mockPhotosData'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 250px) auto;
  grid-column-gap: 30px;
}
`

interface FlyerProps {}

interface FlyerState {
  photos: OrderPhoto[]
  flyerLayoutName: FlyerLayoutName
}

class Flyer extends React.PureComponent<FlyerProps, FlyerState> {
  // When integrated with Apollo data can be stored in apollo cache instead of component state
  state: FlyerState = {
    flyerLayoutName: 'FEATURED2MINOR6',
    photos: mockOrderPhotos
  }

  handlePhotoSelection = (ids: Array<OrderPhoto['id']>) => {
    const updatedPhotos = this.state.photos.map(photo => {
      const photoSelected = ids.indexOf(photo.id) > 0
      return {
        ...photo,
        inFlyer: photoSelected
      }
    })
    this.setState({
      photos: updatedPhotos
    })
  }

  handleLayoutSelect = (value: FlyerLayoutName) => {
    this.setState({
      flyerLayoutName: value
    })
  }

  render () {
    const { flyerLayoutName, photos } = this.state
    const availablePhotosToSelectCount = flyerLayoutPhotosCount[flyerLayoutName]

    return (
      <Wrapper>
        <SelectedFlyerPanel
          currentLayoutName={flyerLayoutName}
          availablePhotosToSelectCount={availablePhotosToSelectCount}
          onLayoutSelect={this.handleLayoutSelect}
        />

        <Gallery
          photos={photos}
          title='Select Photo For The Flyer'
          maxCount={availablePhotosToSelectCount}
          selectedCountLabel='selected out of'
          showMaxLabel={false}
          ofCount={availablePhotosToSelectCount}
          onChange={value => this.handlePhotoSelection(value)}
        />
      </Wrapper>
    )
  }
}

export default Flyer
