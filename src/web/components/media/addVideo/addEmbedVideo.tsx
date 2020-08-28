import * as log from '#veewme/web/common/log'
import * as React from 'react'
import EmbedVideoForm from '../videoForms/embedVideoForm'

class AddEmbedVideo extends React.PureComponent {
  render () {
    return (
      <EmbedVideoForm
        onSubmit={values => log.debug(values)}
      />
    )
  }
}

export default AddEmbedVideo
