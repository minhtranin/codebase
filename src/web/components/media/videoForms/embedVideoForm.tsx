import Panel from '#veewme/web/common/panel'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import TextareaField from '../../../common/formikFields/textareaField'
import { Appearance, EmbedVideo } from '../types'
import Footer from './formFooter'
import { EmbedCodeSection } from './styled'
import VideoBasicDetails from './videoBasicDetails'

interface CustomProps {
  onSubmit: (values: EmbedVideo) => void
}

export type FormValues = EmbedVideo

type EmbedVideoViewProps = FormikProps<FormValues> & CustomProps

class EmbedVideoView extends React.Component<EmbedVideoViewProps, {}> {
  render () {
    return (
      <Form>
        <Panel heading='Video Embed'>
          <VideoBasicDetails />
          <EmbedCodeSection>
            <div>
              <Field
                name={nameof<FormValues>('embeddedCode')}
                component={TextareaField}
                placeholder='Paste embed code here'
                rows={8}
              />
            </div>
            <div>
              <h5>Note!</h5>
              <p>
                Embed code will display the video directly from the third party provider.
                Please make sure the code you embed is valid html markup.
                Usually, embed codes will include an iframe tag.
              </p>
            </div>
          </EmbedCodeSection>
        </Panel>
        <Footer />
      </Form>
    )
  }
}

const initialData: EmbedVideo = {
  appearance: Appearance.Always,
  embeddedCode: '',
  label: '',
  theaterMode: false
}

const EmbedVideoForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },
  mapPropsToValues: () => ({
    ...initialData
  })
})(EmbedVideoView)

export default EmbedVideoForm
