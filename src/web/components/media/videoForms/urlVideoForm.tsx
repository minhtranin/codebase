import Panel from '#veewme/web/common/panel'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import InputField from '../../../common/formikFields/inputField'
import { Appearance, UrlVideo } from '../types'
import Footer from './formFooter'
import { EmbedCodeSection } from './styled'
import VideoBasicDetails from './videoBasicDetails'

interface CustomProps {
  onSubmit: (values: UrlVideo) => void
}

export type FormValues = UrlVideo

type UrlVideoViewProps = FormikProps<FormValues> & CustomProps

class UrlVideoView extends React.Component<UrlVideoViewProps, {}> {
  render () {
    return (
      <Form>
        <Panel heading='Video URL'>
          <VideoBasicDetails />
          <EmbedCodeSection>
            <div>
              <Field
                name={nameof<FormValues>('url')}
                component={InputField}
              />
              <span>
                Please provide URL to the mp4 video file here.
              </span>
            </div>
            <div>
              <h5>Note!</h5>
              <p>
                This must be a direct URL linking to a video file, not a page containing a video (like YouTube, Vimeo, etc.).
              </p>
            </div>
          </EmbedCodeSection>
        </Panel>
        <Footer />
      </Form>
    )
  }
}

const initialData: UrlVideo = {
  appearance: Appearance.Always,
  label: '',
  theaterMode: false,
  url: ''
}

const UrlVideoForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },
  mapPropsToValues: () => ({
    ...initialData
  })
})(UrlVideoView)

export default UrlVideoForm
