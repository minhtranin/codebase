import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Appearance, OrderInteractiveDetails } from '../types'
import InteractiveForm from './interactiveForm'

const mockData: OrderInteractiveDetails = {
  appearance: Appearance.Always,
  embeddedCode: '',
  label: 'Lorem ipsum',
  url: 'www.example.com'
}

interface RouteParams {
  interactiveId: string
}

class EditInteractive extends React.PureComponent<RouteComponentProps<RouteParams>> {
  render () {
    const { interactiveId } = this.props.match.params

    return (
      <InteractiveForm
        data={mockData}
        onSubmit={(values: OrderInteractiveDetails) => log.debug(interactiveId, values)}
      />
    )
  }
}

export default EditInteractive
