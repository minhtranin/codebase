import IconButton from '#veewme/web/common/buttons/iconButton'
import * as log from '#veewme/web/common/log'
import styled from '#veewme/web/common/styled-components'
import { OrderVideo } from '#veewme/web/components/media/types'
import * as React from 'react'
import { IconButtons } from '../styled'

import { Code, Download } from 'styled-icons/boxicons-regular'
import { Link } from 'styled-icons/material'

const VideoItemWrapper = styled.div`
  border: 2px solid ${props => props.theme.colors.BORDER};
  border-radius: 4px;
  margin: 10px 0;
`

const VideoData = styled.div`
  flex: 1 0 auto;

  div {
    margin-right: 15px;
  }

  span {
    display: block;
    padding-top: 2px;
    text-transform: capitalize;
    font-size: 13px;
    font-weight: 500;
    color: ${props => props.theme.colors.LABEL_TEXT};

    &:first-child {
      padding-top: 0;
      font-size: 14px;
      color: ${props => props.theme.colors.FIELD_TEXT};
    }

  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    justify-content: space-between;
  }
`

const VideoMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
`

interface VideoItemProps {
  video: OrderVideo
}

const VideoItem: React.FunctionComponent<VideoItemProps> = props => {
  const { video } = props

  return (
    <VideoItemWrapper>
      <VideoMain>
        <VideoData>
          <div>
            <span>Label: {video.title}</span>
            <span>Type: {video.type}</span>
            <span>Category: {video.category}</span>
            <span>Appears: {video.appearance}</span>
          </div>
        </VideoData>
        <IconButtons>
          {
            video.type !== 'embed' && (
              <IconButton
                castAs='button'
                Icon={Link}
                size='big'
                type='button'
                onClick={() => log.debug('Link button clicked')}
              />
            )
          }
          <IconButton
            castAs='button'
            Icon={Code}
            size='big'
            type='button'
            onClick={() => log.debug('Code btn clicked')}
          />
          {
            video.type !== 'embed' && (
              <IconButton
                castAs='button'
                Icon={Download}
                size='big'
                type='button'
                onClick={() => log.debug('Download button clicked')}
              />
            )
          }
        </IconButtons>
      </VideoMain>
    </VideoItemWrapper>
  )
}

export default VideoItem
