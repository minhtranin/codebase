import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Button from '../../../common/buttons/basicButton'
import SendEmail from '../mediaEmailModal'
import { Header, ListTitle, ListWrapper } from '../styled'
import { OrderInteractive } from '../types'
import InteractivesList from './interactivesList'

import { Plus } from 'styled-icons/fa-solid'

/*
 Fake data
 TODO: remove when integrdated with backend
*/
const mockOrderInteractives: OrderInteractive[] = [{
  id: '1',
  title: 'Interactive'
}, {
  id: '2',
  title: 'Lorem Ipsum'
}, {
  id: '3',
  title: 'Item #1'
}, {
  id: '4',
  title: 'Interactive #3'
}]

interface InteractivesState {
  interactives: OrderInteractive[]
}

// When integrated with Apollo list of interactives can be stored in apollo cache instead of component state
class Interactives extends React.PureComponent<RouteComponentProps, InteractivesState> {
  state: InteractivesState = {
    interactives: mockOrderInteractives
  }

  handleOrderInteractiveDelete = (id: OrderInteractive['id']) => {
    log.debug('delete', id)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    this.setState(prevState => ({
      interactives: prevState.interactives.filter(interactive => interactive.id !== id)
    }))
  }

  render () {
    const { match: { url } } = this.props
    return (
      <ListWrapper>
        <Header>
          <ListTitle inline={true}>
            Interactives
            <Button
              buttonTheme='action'
              full={true}
              icon={Plus}
              to={`${url}/add`}
            />
          </ListTitle>
          <SendEmail label='Interactive Content Added' type='interactive' />
        </Header>
        <InteractivesList
          interactives={this.state.interactives}
          onDelete={this.handleOrderInteractiveDelete}
        />
      </ListWrapper>
    )
  }
}

export default Interactives
