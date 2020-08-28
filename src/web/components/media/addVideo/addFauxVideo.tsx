import * as log from '#veewme/web/common/log'
import * as React from 'react'
import FauxVideoForm from '../videoForms/fauxVideoForm'

interface AddFauxVideoProps {
  onSubmitSuccess: () => void
}
class AddFauxVideo extends React.PureComponent<AddFauxVideoProps> {
  render () {
    return (
      <FauxVideoForm
        onSubmitSuccess={() => this.props.onSubmitSuccess()}
        onSubmit={values => log.debug('form submitted', values)}
      />
    )
  }
}

export default AddFauxVideo
