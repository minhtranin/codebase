import * as log from '#veewme/web/common/log'
import * as React from 'react'
import mockData from './mockData'
import Form, { FormValues } from './newOrderForm'
import SubmitModal from './submitModal'

interface NewOrderState {
  completed: boolean
}

class NewOrder extends React.PureComponent<{}, NewOrderState> {
  state: NewOrderState = {
    completed: false
  }

  handleSubmit = (values: FormValues) => {
    log.debug('Submit', values)
    this.toggleCompleted()
  }

  toggleCompleted = () => {
    this.setState(prevState => ({
      completed: !prevState.completed
    }))
  }

  render () {
    // form data will be loaded from server
    return (
      <>
        <Form onSubmit={this.handleSubmit} {...mockData} />
        <SubmitModal
          isOpen={this.state.completed}
          // TODO add links
          invoiceLink='#'
          propertiesListLink='#'
          onToggle={this.toggleCompleted}
        />
      </>
    )
  }
}

export default NewOrder
