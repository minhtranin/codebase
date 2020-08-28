import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Button from '../../../common/buttons/basicButton'
import MediaDeleteBtn from '../mediaItemDeleteBtn'
import { MediaItem, MediaItemButtons, MediaItemInfo, MediaItemMain, MediaItemType } from '../styled'
import { OrderDocument } from '../types'

import { File } from 'styled-icons/boxicons-regular'
import { Edit } from 'styled-icons/boxicons-solid'

interface DocumentsListProps extends RouteComponentProps {
  document: OrderDocument
  onDelete: (id: OrderDocument['id']) => void
}

const DocumentsList: React.FunctionComponent<DocumentsListProps> = props => {
  const { document, match: { url } } = props
  const handleDelete = React.useCallback(() => props.onDelete(document.id), [])

  return (
    <>
      <MediaItem>
        <MediaItemType>
          <File size='30' />
          <span>{document.extension}</span>
        </MediaItemType>
        <MediaItemMain>
          <MediaItemInfo>
            <span>{document.title}</span>
            <span> {`${document.extension}, ${(document.size / 1024).toFixed(1)} MB`}</span>
          </MediaItemInfo>
          <MediaItemButtons>
            <Button
              buttonTheme='primary'
              icon={Edit}
              label='Edit'
              to={`${url}/document/${document.id}`}
            />
            <MediaDeleteBtn
              itemTitle={document.title}
              onDelete={handleDelete}
            />
          </MediaItemButtons>
        </MediaItemMain>
      </MediaItem>
    </>
  )
}

export default withRouter(DocumentsList)
