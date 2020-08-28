import * as React from 'react'
import { OrderInteractive } from '../types'
import InteractiveItem from './interactiveItem'

interface InteractivesListProps {
  interactives: OrderInteractive[]
  onDelete: (id: OrderInteractive['id']) => void
}

class InteractivesList extends React.PureComponent<InteractivesListProps> {
  render () {
    return (
      <div>
        {this.props.interactives.map(interactive => <InteractiveItem key={interactive.id} interactive={interactive} onDelete={this.props.onDelete}/>)}
      </div>
    )
  }
}

export default InteractivesList
