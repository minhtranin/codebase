import IconButton from '#veewme/web/common/buttons/iconButton'
import { MediaItem, MediaItemInfo, MediaItemMain, MediaItemType } from '#veewme/web/components/media/styled'
import { OrderInteractive, OrderInteractiveDetails } from '#veewme/web/components/media/types'
import copy from 'copy-to-clipboard'
import * as React from 'react'
import { IconButtons } from '../styled'

import { Play } from 'styled-icons/boxicons-regular'
import { Code } from 'styled-icons/boxicons-regular'
import { Link } from 'styled-icons/material'

export type InteractiveItemData = OrderInteractive & Pick<OrderInteractiveDetails, 'url' | 'embeddedCode'>

interface InteractiveItemProps {
  interactive: InteractiveItemData
}

const InteractiveItem: React.FunctionComponent<InteractiveItemProps> = ({ interactive }) => (
  <MediaItem key={interactive.id}>
    <MediaItemType>
      <Play size='60' />
    </MediaItemType>
    <MediaItemMain>
      <MediaItemInfo>
        <span>{interactive.title}</span>
        <span>Interactive</span>
      </MediaItemInfo>
      <IconButtons>
        <IconButton
          castAs='button'
          Icon={Link}
          size='big'
          type='button'
          onClick={() => copy(interactive.url)}
        />
        <IconButton
          castAs='button'
          Icon={Code}
          size='big'
          type='button'
          onClick={() => copy(interactive.embeddedCode)}
        />
      </IconButtons>
    </MediaItemMain>
  </MediaItem>
)

export default InteractiveItem
