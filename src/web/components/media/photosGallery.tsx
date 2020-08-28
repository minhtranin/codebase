import * as React from 'react'
import Panel from '../../common/panel'
import SelectablePhoto from '../../common/selectablePhoto'
import styled from '../../common/styled-components'
import { OrderPhoto } from './types'

const GalleryContainer = styled.div<{ responsive?: boolean }>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;

  ${props => props.responsive && `
    @media (max-width: ${props.theme.breakpoints.BREAKPOINT_FHD}) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: ${props.theme.breakpoints.BREAKPOINT_XL}) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ${props.theme.breakpoints.BREAKPOINT_LG}) {
        grid-template-columns: repeat(2, 1fr);
    }
  `}

  ${props => !props.responsive && `
      grid-template-columns: repeat(auto-fill, 205px) !important;
      align-content: space-around;
      justify-content: center;
  `}
`

const PhotosQuantity = styled.span`
  font-weight: 600;
`

const SelectionWarning = styled.div<{ error?: boolean }>`
  margin: -10px 0 15px 0;
  min-height: 17px;
  font-size: 13px;
  ${props => props.error && `color: ${props.theme.colors.ALERT};`}
`

interface PhotosSelection {
  [photoId: string]: boolean
}

interface PhotosGalleryProps {
  photos: OrderPhoto[]
  title: string
  maxCount: number,
  ofCount?: number,
  onChange: (ids: Array<OrderPhoto['id']>) => void
  selectedCountLabel?: string
  showMaxLabel?: boolean
}

const PhotosGallery: React.FunctionComponent<PhotosGalleryProps> = ({
  maxCount,
  onChange,
  photos,
  selectedCountLabel = 'of',
  showMaxLabel = true,
  ofCount,
  title
}) => {
  const [ photosSelection, updatePhotosSelection ] = React.useState<PhotosSelection>({})
  const selectedIds = React.useMemo(() => Object.keys(photosSelection).filter(id => photosSelection[id]), [photosSelection])
  const selectedCount = selectedIds.length
  const limitReached = selectedCount === maxCount
  const limitExceeded = selectedCount > maxCount
  const allPhotosCount = photos.length
  const ofCountValue = ofCount ? ofCount : allPhotosCount

  const selectPhoto = (id: OrderPhoto['id']) => {
    const updatedValue = (limitReached || limitExceeded) ? false : !photosSelection[id]
    const photosSelectionCopy = {
      ...photosSelection,
      [id]: updatedValue
    }
    updatePhotosSelection(photosSelectionCopy)
  }

  React.useEffect(() => {
    onChange(selectedIds)
  }, [photosSelection])

  const excessPhotosCount = selectedCount - maxCount
  const limitWarning = `Maximum photos limit reached. More photos can't be selected.`
  const limitError = `
    Too many photos selected for a given flyer layout.
    Please unselect ${excessPhotosCount} ${excessPhotosCount === 1 ? 'photo' : 'photos'}.
  `

  return (
    <Panel
      heading={title}
      headingPlacedComponent={(
        <div>
          <PhotosQuantity>{selectedCount} </PhotosQuantity>
          {selectedCountLabel} {ofCountValue} {showMaxLabel && `(${maxCount} maximum)`}
        </div>
      )}
    >
      <SelectionWarning error={limitExceeded}>
        {limitReached && limitWarning}
        {limitExceeded && limitError}
      </SelectionWarning>
      <GalleryContainer>
        {
          photos.map(photo =>
            <SelectablePhoto
              key={photo.id}
              thumbUrl={photo.thumbUrl}
              checked={photosSelection[photo.id]}
              onSelect={() => selectPhoto(photo.id)}
            />
          )
        }
      </GalleryContainer>
    </Panel>
  )
}

export default PhotosGallery
