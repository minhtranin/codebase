import * as log from '#veewme/web/common/log'
import * as React from 'react'
import HostedVideoForm from '../videoForms/hostedVideoForm'

interface AddHostedVideoProps {
  onSubmitSuccess: () => void
}
class AddHostedVideo extends React.PureComponent<AddHostedVideoProps> {
  render () {
    return (
      <HostedVideoForm
        onSubmitSuccess={() => this.props.onSubmitSuccess()}
        onSubmit={values => log.debug('form submitted', values)}
      />
    )
  }
}

export default AddHostedVideo
