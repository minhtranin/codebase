import * as React from 'react'
import { OrderDocument } from '../types'
import DocumentItem from './documentItem'

interface DocumentsListProps {
  documents: OrderDocument[]
  onDelete: (id: OrderDocument['id']) => void
}

class DocumentsList extends React.PureComponent<DocumentsListProps> {
  render () {
    return (
      <div>
        {this.props.documents.map(doc => <DocumentItem key={doc.id} document={doc} onDelete={this.props.onDelete}/>)}
      </div>
    )
  }
}

export default DocumentsList
