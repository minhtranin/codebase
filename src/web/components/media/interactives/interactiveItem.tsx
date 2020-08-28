import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Button from '../../../common/buttons/basicButton'
import MediaDeleteBtn from '../mediaItemDeleteBtn'
import { MediaItem, MediaItemButtons, MediaItemInfo, MediaItemMain, MediaItemType } from '../styled'
import { OrderInteractive } from '../types'

import { Play } from 'styled-icons/boxicons-regular'
import { Edit } from 'styled-icons/boxicons-solid'

interface InteractivesListProps extends RouteComponentProps {
  interactive: OrderInteractive
  onDelete: (id: OrderInteractive['id']) => void
}

const InteractivesList: React.FunctionComponent<InteractivesListProps> = props => {
  const { interactive, match: { url } } = props
  const handleDelete = React.useCallback(() => props.onDelete(interactive.id), [])

  return (
    <MediaItem key={interactive.id}>
      <MediaItemType>
        <Play size='60' />
      </MediaItemType>
      <MediaItemMain>
        <MediaItemInfo>
          <span>{interactive.title}</span>
          <span>Interactive</span>
        </MediaItemInfo>
        <MediaItemButtons>
          <Button
            buttonTheme='primary'
            icon={Edit}
            label='Edit'
            to={`${url}/interactive/${interactive.id}`}
          />
          <MediaDeleteBtn
            itemTitle={interactive.title}
            onDelete={handleDelete}
          />
        </MediaItemButtons>
      </MediaItemMain>
    </MediaItem>
  )
}

export default withRouter(InteractivesList)
