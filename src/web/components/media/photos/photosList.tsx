import Slideshow from '#veewme/web/common/slideshow'
import * as React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import SelectablePhoto, { SelectablePhotoProps } from '../../../common/selectablePhoto'
import styled from '../../../common/styled-components'
import { PhotosMainListWrapper, TooltipContent } from '../styled'
import { OrderPhoto, PhotosSelection, Sort } from '../types'
import Toolbar from './toolbar'

const ListWrapper = styled.section``

const PhotoWrapper = styled.div``

const Hint = styled.p`
  margin-bottom: 15px;
  font-size: 13px;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

const PhotoItem: React.FunctionComponent<SelectablePhotoProps> = props => {
  return (
    <PhotoWrapper>
      <SelectablePhoto {...props} />
    </PhotoWrapper>
  )
}

const SortablePhoto = SortableElement(PhotoItem)

interface PhotosListProps {
  photos: OrderPhoto[]
  onUpdate: (ids: Array<OrderPhoto['id']>, payload: Partial<OrderPhoto>) => void
  onDelete: (ids: Array<OrderPhoto['id']>) => void
  onSort: (sort: Sort) => void
  showBannerSettings: boolean
}

interface PhotosListState {
  photosSelection: PhotosSelection
  previewIndex: number
  slideshowVisible: boolean
}

class PhotosList extends React.PureComponent<PhotosListProps, PhotosListState> {
  state: PhotosListState = {
    photosSelection: {},
    previewIndex: 0,
    slideshowVisible: false
  }

  get selectedPhotosIds () {
    return Object.keys(this.state.photosSelection).filter(id => this.state.photosSelection[id])
  }

  handleSelect = (ids: Array<OrderPhoto['id']>, selected: boolean) => {
    const photosSelectionCopy = {
      ...this.state.photosSelection
    }
    ids.forEach(id => (photosSelectionCopy[id] = selected))
    this.setState({
      photosSelection: photosSelectionCopy
    })
  }

  handleSelectAll = (selected: boolean) => {
    const allIds = this.props.photos.map(photo => photo.id)
    this.handleSelect(allIds, selected)
  }

  handleUpdateSelected = (payload: Partial<OrderPhoto>) => {
    this.props.onUpdate(this.selectedPhotosIds, payload)
  }

  handleDeleteSelected = () => {
    this.handleDelete(this.selectedPhotosIds)
  }

  handleDelete = (ids: Array<OrderPhoto['id']>) => {
    this.props.onDelete(ids)
    const photosSelectionCopy = { ...this.state.photosSelection }
    Object.keys(photosSelectionCopy)
      .filter(id => ids.includes(id))
      .forEach(id => {
        delete photosSelectionCopy[id]
      })
    this.setState({
      photosSelection: photosSelectionCopy
    })
  }

  render () {
    return (
      <ListWrapper>
        <Toolbar
          photos={this.props.photos}
          photosSelection={this.state.photosSelection}
          onSelectAll={this.handleSelectAll}
          onUpdateSelected={this.handleUpdateSelected}
          onDeleteSelected={this.handleDeleteSelected}
          onSort={this.props.onSort}
        />
        <Hint>
          Select (star) up to 25 photos to appear on the Property Site/Tour Overview. Starred photos will appear in the order displayed here.
          If you don't select any, the default of first 8 will appear.
        </Hint>
        <PhotosMainListWrapper>
          {
            this.props.photos.map((photo, index) => {
              const photoSelected = this.state.photosSelection[photo.id]
              return (
                <SortablePhoto
                  key={photo.id}
                  index={index}
                  extended={true}
                  thumbUrl={photo.thumbUrl}
                  fullUrl={photo.fullUrl}
                  checked={photoSelected}
                  showBannerSettings={this.props.showBannerSettings}
                  onDelete={() => this.handleDelete([photo.id])}
                  onUpdate={(payload: Partial<OrderPhoto>) => this.props.onUpdate([photo.id], payload)}
                  onSelect={() => this.handleSelect([photo.id], !photoSelected)}
                  star={photo.star}
                  hidden={photo.hidden}
                  toolbarInfo={<TooltipContent><span>File name: {photo.fileName}</span> <span>Upload date: {photo.date}</span></TooltipContent>}
                  title={photo.title}
                  onPreview={url => this.setState({
                    previewIndex: this.props.photos.findIndex(p => p.fullUrl === url),
                    slideshowVisible: true
                  })}
                />
              )
            })
          }
        </PhotosMainListWrapper>
        {this.state.slideshowVisible && <Slideshow
          autoPlay={false}
          visible={this.state.slideshowVisible}
          photos={this.props.photos}
          currentPhotoIndex={this.state.previewIndex}
          handleClose={() => this.setState(prev => ({
            slideshowVisible:  !prev.slideshowVisible
          }))}
        />
        }
      </ListWrapper>
    )
  }
}

export default SortableContainer(PhotosList)
