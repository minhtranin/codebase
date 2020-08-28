import Panel from '#veewme/web/common/panel'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
// import InputField from '../../../common/formikFields/inputField'
import SwitchField from '../../../common/formikFields/switchField'
import InlineHelp from '../../../common/inlineHelp'
import styled from '../../../common/styled-components'
import { Appearance, HostedVideo, VideoCategory } from '../types'
import VideoBasicDetails from './videoBasicDetails'
import VideoUpload from './videoUpload'

const OverviewSwitcherHolder = styled.div`
  display: flex;
  align-items: center;

  label {
      margin-right: 10px;
  }

`
const OverviewSwitcher: React.FunctionComponent = () => {
  return (
    <OverviewSwitcherHolder>
      <Field
        component={SwitchField}
        label='Overview Video'
        name={nameof<HostedVideo>('overview')}
        labelFirst
      />
      <InlineHelp
        text='Overview video lorem ipsum'
      />
    </OverviewSwitcherHolder>
  )
}

interface CustomProps {
  onSubmit: (values: HostedVideo) => void
  onSubmitSuccess: () => void
}

export type FormValues = HostedVideo

export type HostedVideoViewProps = FormikProps<FormValues> & CustomProps

class HostedVideoView extends React.Component<HostedVideoViewProps, {}> {
  render () {
    return (
      <Form>
        <Panel
          heading='Video Hosted'
          headingPlacedComponent={<OverviewSwitcher />}
        >
          <VideoBasicDetails />
        </Panel>
        <VideoUpload {...this.props}/>
      </Form>
    )
  }
}

const initialData: HostedVideo = {
  appearance: Appearance.Always,
  category: VideoCategory.Property,
  label: '',
  overview: false,
  theaterMode: false
}

const HostedVideoForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
    props.onSubmitSuccess()
  },
  mapPropsToValues: () => ({
    ...initialData
  })
})(HostedVideoView)

export default HostedVideoForm
