import * as log from '#veewme/web/common/log'
import * as React from 'react'
import UrlVideoForm from '../videoForms/urlVideoForm'

class AddUrlVideo extends React.PureComponent {
  render () {
    return (
      <UrlVideoForm
        onSubmit={values => log.debug(values)}
      />
    )
  }
}

export default AddUrlVideo
