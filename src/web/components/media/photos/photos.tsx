import * as log from '#veewme/web/common/log'
import arrayMove from 'array-move'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { RouteComponentProps } from 'react-router-dom'
import SendEmail from '../mediaEmailModal'
import { generateMockPhoto, mockOrderPhotos } from '../mockPhotosData'
import { Header, ListTitle, ListWrapper, Subtitle, UploaderHolder } from '../styled'
import { OrderPhoto, Sort } from '../types'
import Uploader from '../uploader'
import BannerForm from './bannerTypeForm'
import DownloadDropdown from './download'
import PhotosList from './photosList'

import { CloudUpload } from 'styled-icons/boxicons-solid'

interface PhotosState {
  photos: OrderPhoto[]
  slideshow: boolean
}

// When integrated with Apollo list of photos can be stored in apollo cache instead of component state
class Photos extends React.PureComponent<RouteComponentProps, PhotosState> {
  // if list of photos  is stored in Apollo cache state can be removed
  state: PhotosState = {
    photos: mockOrderPhotos,
    slideshow: false
  }

  handleOrderPhotosUpdate = (ids: Array<OrderPhoto['id']>, payload: Partial<OrderPhoto>) => {
    // here update request will be sent
    log.debug('update', ids, payload)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    const updatedOrderPhotos = this.state.photos.map(photo => {
      if (ids.find(id => id === photo.id)) {
        return {
          ...photo,
          ...payload
        }
      } else {
        return photo
      }
    })

    this.setState({
      photos: updatedOrderPhotos
    })
  }

  handleOrderPhotosDelete = (ids: Array<OrderPhoto['id']>) => {
    log.debug('delete', ids)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    this.setState(prevState => ({
      photos: prevState.photos.filter(photo => !ids.includes(photo.id))
    }))
  }

  handleSort = (sort: Sort) => {
    log.debug('sort', sort)
  }

  handleDragSort = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    this.setState(({ photos }) => ({
      photos: arrayMove(photos, oldIndex, newIndex)
    }))
  }

  handleAddFile = (photo: OrderPhoto) => {
    this.setState(prevState => ({
      photos: [...prevState.photos, photo]
    }))
  }

  render () {
    return (
      <ListWrapper>
        <UploaderHolder>
          <div>
            <Header>
              <ListTitle>
                Upload Photos
                <Subtitle>Drag & drop or click to upload</Subtitle>
              </ListTitle>
              <DownloadDropdown />
              <SendEmail label='Photo(s) Added' type='photo' />
            </Header>
            <Uploader
              server={{
                process: (_fieldName, file, _metadata, load, error, progress, abort) => {
                  /*
                   Here will be server upload handling
                   https://pqina.nl/filepond/docs/patterns/api/server/#advanced
                  */

                  // Mock upload
                  // TODO: remove when integrated with backend
                  const uploadError = false // helps quickly test upload error
                  setTimeout(() => {
                    progress(true, 100, 100)
                    if (!uploadError) {
                      load()
                      const mockFile = generateMockPhoto(file)
                      this.handleAddFile(mockFile)
                    } else {
                      error('Some error message')
                    }
                  }, 700)

                   // Should expose an abort method so the request can be cancelled
                  return {
                    abort: () => {
                      // This function is entered if the user has tapped the cancel button
                      // Call custom abort method e.g. request.abort()
                      // and let FilePond know the request has been cancelled
                      abort()
                    }
                  }
                },
                revert: null
              }}
              acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
              labelIdle={`${renderToString(<CloudUpload size='70' />)} <span class="filepond--label-action"> </span>`}
            />
          </div>
          <BannerForm
            onChange={values => {
              log.debug(values)
              this.setState({
                slideshow: values.slideshow
              })
            }}
          />
        </UploaderHolder>
        <PhotosList
          photos={this.state.photos}
          onUpdate={this.handleOrderPhotosUpdate}
          onDelete={this.handleOrderPhotosDelete}
          onSort={this.handleSort}
          onSortEnd={this.handleDragSort}
          axis='xy'
          useDragHandle
          showBannerSettings={this.state.slideshow}
        />
      </ListWrapper>
    )
  }
}

export default Photos
