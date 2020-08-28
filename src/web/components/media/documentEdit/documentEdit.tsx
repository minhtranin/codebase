import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Appearance, OrderDocumentDetails } from '../types'
import DocumentEditForm from './documentEditForm'

const mockDocData: OrderDocumentDetails = {
  appearance: Appearance.Branded,
  downloadUrl: '#testDocUrl',
  title: 'Lorem ipsum'
}

interface RouteParams {
  documentId: string
}

class DocumentEdit extends React.PureComponent<RouteComponentProps<RouteParams>> {
  render () {
    const { documentId } = this.props.match.params
    return (
      <>
        <DocumentEditForm
          data={mockDocData}
          onSubmit={(values: OrderDocumentDetails) => log.debug(documentId, values)}
        />
      </>
    )
  }
}

export default DocumentEdit
