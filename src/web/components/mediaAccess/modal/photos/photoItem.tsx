import styled from '#veewme/web/common/styled-components'
import { OrderPhoto } from '#veewme/web/components/media/types'
import * as React from 'react'
import DownloadMenu from './photoDownloadMenu'

const Photo = styled.div`
  position: relative;
  width: 100%;
  border: 2px solid ${props => props.theme.colors.BORDER};
  border-radius: 4px;

  img {
    width: 100%;
    display: block;
  }
`

interface PhotoItemProps {
  photo: OrderPhoto
}

const PhotoItem: React.FunctionComponent<PhotoItemProps> = ({ photo }) => (
  <Photo>
    <img src={photo.thumbUrl} width='640' />
    <DownloadMenu />
  </Photo>
)

export default PhotoItem
