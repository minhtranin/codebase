import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import TabContainer from '../tabContainer'
import Item, { DocumentItemData } from './docItem'

/*
 Fake data and mock methods
 TODO: remove when integrdated with backend
*/
const mockOrderDocuments: DocumentItemData[] = [{
  downloadUrl: '',
  extension: 'doc',
  id: '1',
  size: 2245,
  title: 'Archive'
}, {
  downloadUrl: '',
  extension: 'xls',
  id: '2',
  size: 3567,
  title: 'Very important document'
}, {
  downloadUrl: '',
  extension: 'doc',
  id: '3',
  size: 2056,
  title: 'Document #1'
}, {
  downloadUrl: '',
  extension: 'pdf',
  id: '4',
  size: 5432,
  title: 'Document pdf'
}, {
  downloadUrl: '',
  extension: 'xls',
  id: '5',
  size: 1024,
  title: 'Document'
}, {
  downloadUrl: '',
  extension: 'doc',
  id: '6',
  size: 2056,
  title: 'Report 2019'
}, {
  downloadUrl: '',
  extension: 'doc',
  id: '7',
  size: 1546,
  title: 'Test document name'
}]

const DocumentsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  padding: 0 15px 0 0;

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_FHD}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

interface DocumentsListProps {
  documents: DocumentItemData[]
}

const DocumentsList: React.FunctionComponent<DocumentsListProps> = props => (
  <Scrollbars
    autoHeight={true}
    autoHeightMax={`calc(85vh - 245px)`}
    autoHide={false}
    autoHeightMin='250px'
  >
    <DocumentsWrapper>
      {props.documents.map(doc => <Item key={doc.id} document={doc} />)}
    </DocumentsWrapper>
  </Scrollbars>
)

interface DocumentsContainerProps {
  orderId?: string
}

const DocumentsContainer: React.FunctionComponent<DocumentsContainerProps> = () => (
  <TabContainer>
    <DocumentsList documents={mockOrderDocuments} />
  </TabContainer>
)

export default DocumentsContainer
