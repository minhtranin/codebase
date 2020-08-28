import styled from '#veewme/web/common/styled-components'
import { OrderPhoto } from '#veewme/web/components/media/types'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import TabContainer from '../tabContainer'
import PhotoItem from './photoItem'

import { mockOrderPhotos } from '#veewme/web/components/media/mockPhotosData'

const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  padding: 0 15px 0 0;

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_FHD}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ZipLink = styled.div`
  position: absolute;
  top: 24px;
  right: 10px;

  a {
    color: ${props => props.theme.colors.FIELD_TEXT};
    font-weight: 500;
    font-size: 16px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    position: unset;
    margin: -7px 0 15px 0;
  }
`

interface PhotosListProps {
  photos: OrderPhoto[]
}

const PhotosList: React.FunctionComponent<PhotosListProps> = props => (
  <Scrollbars
    autoHeight={true}
    autoHeightMax={`calc(85vh - 245px)`}
    autoHide={false}
    autoHeightMin='250px'
  >
    <PhotosWrapper>
    {props.photos.map(photo => (<PhotoItem photo={photo} key={photo.id} />))}
    </PhotosWrapper>
  </Scrollbars>
)

interface PhotosContainerProps {
  orderId?: string
}

const PhotosContainer: React.FunctionComponent<PhotosContainerProps> = () => (
  <TabContainer>
    <>
      <ZipLink>
        <a href='#'>Zip File Help</a>
      </ZipLink>
      <PhotosList photos={mockOrderPhotos} />
    </>
  </TabContainer>
)

export default PhotosContainer
