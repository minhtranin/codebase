import * as log from '#veewme/web/common/log'
import { guidGenerator } from '#veewme/web/common/util'
import * as React from 'react'
import { FilePondErrorDescription, FilepondFile } from 'react-filepond'
import { Header, ListTitle, ListWrapper } from '../styled'
import { OrderPanorama, PanoramaToUpload } from '../types'
import Uploader from '../uploader'
import UploadList from './uploadList'

interface PanoramasUploaderProps {
  onFileUploaded: (panorama: OrderPanorama) => void
}

interface PanoramasUploaderState {
  files: FilepondFile[]
}

class PanoramasUploader extends React.PureComponent<PanoramasUploaderProps, PanoramasUploaderState> {
  state: PanoramasUploaderState = {
    files: []
  }

  uploaderRef = React.createRef<Uploader>()

  resetFiles = () => {
    this.setState({
      files: []
    })
  }

  moveDroppedFileToList = (file: FilepondFile) => {
    this.uploaderRef.current && this.uploaderRef.current.removeFile(file.id)
    this.setState(prevState => ({
      files: [
        ...prevState.files,
        file
      ]
    }))
  }

  moveFilesWithMetadataToUploader = (items: PanoramaToUpload[]) => {
    items.forEach(item => {
      const metadata = {
        edited: true,
        hfov: item.hfov,
        type: item.type
      }
      const fileItem = this.state.files.find(file => file.id === item.id)
      fileItem && this.uploaderRef.current && this.uploaderRef.current.addFile(fileItem.file, metadata)
    })
    this.resetFiles()
  }

  handleAddFile = (error: FilePondErrorDescription, file: FilepondFile) => {
    if (error) {
      return
    }
    // if 'edited' metadata prop exists it means that item has been already edited and should be uploaded to server
    // Otherwise, file has been just dropped and should be just shown on items list where can be edited
    const fileMetadata = file.getMetadata('edited')
    if (fileMetadata) {
      this.uploaderRef.current && this.uploaderRef.current.startUploadingFile(file.id)
      return
    }

    // delay removing file from filepond to avoid items 'flickering'
    setTimeout(() => {
      this.moveDroppedFileToList(file)
    }, 500)
  }

  render () {
    return (
      <ListWrapper>
        <Header>
          <ListTitle>Upload Panoramas</ListTitle>
        </Header>
        <Uploader
          ref={this.uploaderRef}
          instantUpload={false}
          acceptedFileTypes={['image/png', 'image/jpeg']}
          onaddfile={this.handleAddFile}
          server={{
            process: (_fieldName, file, metadata, load, _error, _progress, abort) => {
              // For more 'extended' example of process method see '../photos/photos'

              // Mock upload
              // TODO: remove when integrated with backend
              setTimeout(() => {
                load()
                log.debug(metadata)

                // just mock data
                this.props.onFileUploaded({
                  date: '22/09/19',
                  fileName: 'some-name.jpg',
                  hfov: metadata && metadata.type.hfov,
                  id: guidGenerator(),
                  initialHorizontalAngle: 0,
                  initialVerticalAngle: 0,
                  initialZoom: 40,
                  thumbUrl: URL.createObjectURL(file),
                  title: '',
                  type: metadata && metadata.type
                })
              }, 1000)

              return {
                abort: () => {
                  abort()
                }
              }
            },
            revert: null
          }}
        />
        {
          !!this.state.files.length && (
            <UploadList
              files={this.state.files}
              onSubmit={this.moveFilesWithMetadataToUploader}
              handleCancel={this.resetFiles}
            />
          )
        }
      </ListWrapper>
    )
  }
}

export default PanoramasUploader
