import Button from '#veewme/web/common/buttons/basicButton'
import * as log from '#veewme/web/common/log'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { FilePondErrorDescription, FilepondFile } from 'react-filepond'
import { nameof } from '../../../../lib/util'
import SelectField, { OptionValue } from '../../../common/formikFields/selectField'
import ThumbsCarousel from '../thumbsCarousel'
import { VideoCategory } from '../types'
import Uploader from '../uploader'
import { FormValues, HostedVideoViewProps } from './hostedVideoForm'

// mock initialData
import { mockOrderPhotos } from '../mockPhotosData'

const StyledPanel = styled(Panel)`
  margin-top: 20px;
`

const VideoSection = styled.div`
  display: flex;
`

const thumbsWidth = '240px'

const ThumbsWrapper = styled.div`
  width: ${thumbsWidth};
  height: 180px;
  margin-bottom: 10px;
  padding-left: 0
  flex: 0 0 auto;
  background: #eee;
`

const VideoRightColumn = styled.div`
  display: flex;
  padding-left: 15px;
  flex-direction: column;
  max-width: calc(100% - ${thumbsWidth});

  h4,
  h5 {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 15px;
    color: ${props => props.theme.colors.LABEL_TEXT};
  }

  h4 {
    width: calc(100% - 30px);
    margin-bottom: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: -20px;
    font-size: 16px;
    color: ${props => props.theme.colors.FIELD_TEXT};
  }

  p {
    flex: 1 0 auto;
    font-size: 13px;
    color: ${props => props.theme.colors.LABEL_TEXT};
  }

  & > div {
    display: flex;
    justify-content: flex-end;
  }
`

const RemoveVideoBtn = styled.span`
  height: 20px;
  font-size: 40px;
  line-height: 20px;
  color: ${props => props.theme.colors.ALERT};
  cursor: pointer;
  align-self: flex-end;
`

const CategoryWrapper = styled.div`
  margin: 5px 0;
  align-self: flex-start;
  width: 100%;
  max-width: 280px;

  & > div {
    width: 100%;
  }
`

const CategoryOptions: Array<OptionValue<VideoCategory>> = [{
  label: 'Video Category: Property (default)',
  value: VideoCategory.Property
}, {
  label: 'Video Category: Neighbourhood',
  value: VideoCategory.Neighbourhood
}]

interface UploadVideoProps extends HostedVideoViewProps {}

class UploadVideo extends React.Component<UploadVideoProps, {}> {
  uploaderRef = React.createRef<Uploader>()

  moveDroppedFileToForm = (file: FilepondFile) => {
    this.uploaderRef.current && this.uploaderRef.current.removeFile(file.id)
    this.props.setFieldValue('file', file.file)
  }

  startFileUploadAndFormSubmission = () => {
    const fileItem = this.props.values.file
    fileItem && this.uploaderRef.current && this.uploaderRef.current.addFile(fileItem, { edited: true })
    log.debug('Form submission and video upload started')
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
      this.moveDroppedFileToForm(file)
    }, 500)
  }

  render () {
    return (
      <StyledPanel>
        <Uploader
          allowMultiple={false}
          ref={this.uploaderRef}
          instantUpload={false}
          acceptedFileTypes={['video/mp4', 'video/quicktime']}
          onaddfile={this.handleAddFile}
          server={{
            process: (_fieldName, _file, _metadata, load, _error, progress, abort) => {
              // For more 'extended' example of process method see '../photos/photos'

              // Mock upload
              // TODO: remove when integrated with backend
              setTimeout(() => {
                progress(true, 100, 100)
                load()
                // when video is uploaded send rest of the form data (it works this way in the old app)
                // (alternatively form data can be sent along with video in single request)
                this.props.submitForm()
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
        <div>
          {this.props.values.file && (
            <VideoSection>
              <ThumbsWrapper>
                <ThumbsCarousel
                  onSlideChange={id => this.props.setFieldValue('thumbId', id)}
                  photos={mockOrderPhotos}
                />
              </ThumbsWrapper>
              <VideoRightColumn>
                <RemoveVideoBtn onClick={() => this.props.setFieldValue('file', undefined)}>&times;</RemoveVideoBtn>
                <h4>{this.props.values.file && this.props.values.file.name}</h4>
                <h5>Note!</h5>
                <p>
                  When file upload has completed you can exit. Transcoding will begin in the background.
                  An email notification will be sent to you when completed. (Upload size limit 600 MB, file type: .mp4, .mov)
                </p>
                <CategoryWrapper>
                  <Field
                    name={nameof<FormValues>('category')}
                    component={SelectField}
                    options={CategoryOptions}
                  />
                </CategoryWrapper>
                <div>
                  <Button buttonTheme='action' full label='Start upload' size='small' onClick={() => this.startFileUploadAndFormSubmission()}/>
                </div>
              </VideoRightColumn>
            </VideoSection>
          )}
        </div>
      </StyledPanel>
    )
  }
}

export default UploadVideo
