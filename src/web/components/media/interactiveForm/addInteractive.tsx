import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { OrderInteractiveDetails } from '../types'
import InteractiveForm from './interactiveForm'

class AddInteractive extends React.PureComponent<RouteComponentProps> {
  render () {
    return (
      <InteractiveForm
        onSubmit={(values: OrderInteractiveDetails) => log.debug(values)}
      />
    )
  }
}

export default AddInteractive
