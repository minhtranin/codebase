import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Header, ListTitle, ListWrapper } from '../styled'
import { OrderDocument } from '../types'
import Uploader from '../uploader'
import DocumentsList from './documentsList'

// temp import TODO: remove when integrated with backend
import { guidGenerator } from '#veewme/web/common/util'

/*
 Fake data and mock methods
 TODO: remove when integrdated with backend
*/
const generateMockServerResponse = (): OrderDocument => ({
  extension: 'doc',
  id: guidGenerator(),
  size: 3456,
  title: 'New mock file'
})

const mockOrderDocuments: OrderDocument[] = [{
  extension: 'doc',
  id: '1',
  size: 2245,
  title: 'Archive'
}, {
  extension: 'xls',
  id: '2',
  size: 3567,
  title: 'Very important document'
}, {
  extension: 'doc',
  id: '3',
  size: 2056,
  title: 'Document #1'
}, {
  extension: 'pdf',
  id: '4',
  size: 5432,
  title: 'Document pdf'
}, {
  extension: 'xls',
  id: '5',
  size: 1024,
  title: 'Document'
}, {
  extension: 'doc',
  id: '6',
  size: 2056,
  title: 'Report 2019'
}, {
  extension: 'doc',
  id: '7',
  size: 1546,
  title: 'Test document name'
}]

interface DocumentsState {
  documents: OrderDocument[]
}

// When integrated with Apollo list of documents can be stored in apollo cache instead of component state
class Documents extends React.PureComponent<RouteComponentProps, DocumentsState> {
  state: DocumentsState = {
    documents: mockOrderDocuments
  }

  handleOrderDocumentsDelete = (id: OrderDocument['id']) => {
    log.debug('delete', id)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    this.setState(prevState => ({
      documents: prevState.documents.filter(doc => doc.id !== id)
    }))
  }

  handleAddFile = (document: OrderDocument) => {
    this.setState(prevState => ({
      documents: [...prevState.documents, document]
    }))
  }

  render () {
    return (
      <ListWrapper>
        <Header>
          <ListTitle>Documents</ListTitle>
        </Header>
        <Uploader
          server={{
            process: (_fieldName, _file, _metadata, load, _error, _progress, abort) => {
              // For more 'extended' example of process method see '../photos/photos'

              // Mock upload
              // TODO: remove when integrated with backend
              setTimeout(() => {
                load()
                const mockResponse = generateMockServerResponse()
                this.handleAddFile(mockResponse)
              }, 1200)

              return {
                abort: () => {
                  abort()
                }
              }
            },
            revert: null
          }}
          acceptedFileTypes={[
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/pdf'
          ]}
        />
        <DocumentsList
          documents={this.state.documents}
          onDelete={this.handleOrderDocumentsDelete}
        />
      </ListWrapper>
    )
  }
}

export default Documents
