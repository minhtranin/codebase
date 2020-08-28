// import { privateUrls } from '#veewme/lib/urls'
import * as log from '#veewme/web/common/log'
import Tooltipped from '#veewme/web/common/tooltipped'
import * as React from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { UnreachableCaseError } from '../../../../lib/error'
import Button from '../../../common/buttons/basicButton'
import IconButton from '../../../common/buttons/iconButton'
import styled from '../../../common/styled-components'
import MediaDeleteBtn from '../mediaItemDeleteBtn'
import { MediaItem, MediaItemButtons, MediaItemInfo, MediaItemMain, TooltipContent } from '../styled'
import { OrderVideo } from '../types'

import { Code, Download, InfoCircle, Move } from 'styled-icons/boxicons-regular'
import { Edit, Error } from 'styled-icons/boxicons-solid'
import { Link } from 'styled-icons/material'

// TODO: if design is accepted move colors to theme
const videosColors = {
  embed: '#a3d2cd',
  faux: '#efb4d3',
  hosted: '#f7dd9f',
  url: '#8da5bd'
}

const VideoItemWrapper = styled(MediaItem)<{ type: OrderVideo['type'] }>`
  border: 0 none;
  background: #eee;
  height: 125px;
  position: relative;
  margin-left: 22px;


  ${({ type }) => {
    switch (type) {
      case 'URL':
        return `
          background: ${videosColors.url};
        `
      case 'faux':
        return `
          background: ${videosColors.faux};
        `
      case 'embed':
        return `
          background: ${videosColors.embed};
        `
      case 'hosted':
        return `
          background: ${videosColors.hosted};
        `
      default:
        throw new UnreachableCaseError(type)
    }
  }}
`

const TooltippedStyled = styled(Tooltipped)``

const thumbWidth = '220px'

const Thumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 4px 0 0 4px;
  overflow: hidden;

  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    background: linear-gradient(40deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 50%);
  }

  img {
    width: ${thumbWidth};
    height: 125px;
    display: block;
    object-fit: cover;
  }

  svg {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 1;
    fill: #fff;
    cursor: pointer;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    display: none;
  }
`
const ErrorHolder = styled.div`
  width: ${thumbWidth};
  display: flex;
  justify-content: center;
  position: relative;
  padding-right: 50px;

  &:after {
    position: absolute;
    top: 20px;
    left: calc(50% - 30px);
    content: '';
    display: block;
    width: 10px;
    height: 30px;
    background: #fff;
  }

  svg {
    fill: ${props => props.theme.colors.ALERT};
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    order: 1;
    width: auto;
    padding: 0 20px;

    &:after {
      left: calc(50% - 5px);
    }
  }
`

const VideoData = styled(MediaItemInfo)`
  flex: 1 0 auto;
  padding-top: 7px;
  display: flex;
  align-items: center;

  span {
    padding: 0 0 6px 0;
    text-transform: capitalize;
    font-size: 14px;
    color: ${props => props.theme.colors.FIELD_TEXT};

    span {
      display: inline-block;
      font-weight: 500;
      margin: 0;
      padding: 0;
    }

    &:first-child {
      color: ${props => props.theme.colors.FIELD_TEXT};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    justify-content: space-between;
  }
`

const IconButtons = styled.div`
  display: flex;
  height: 100%;
  width: 175px;
  align-items: center;
  padding: 0 25px;
  border: 1px dotted ${props => props.theme.colors.BORDER};
  border-width: 0 1px;

  button {
    margin-right: 8px;
    background: #fff;
    padding: 10px;
    width: 35px;
    height: 35px;
    border: 1px solid ${props => props.theme.colors.BORDER};
    border-radius: 5px;
    transition: opacity .5s;

    &:hover {
      opacity: 0.9;
    }

    &:last-child {
      margin-right: 0;
    }

    svg {
      fill: ${props => props.theme.colors.GREEN};
      width: 25px;
      height: 25px;
    }
  }
`

const ButtonsRight = styled(MediaItemButtons)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 0 0 25px;
  align-items: center;
  justify-content: center;

  a,
  button {
    width: 100%;
    margin: 5px 0;
    background: #fff;
    transition: border-color .5s;

    &:hover,
    &:active,
    &:focus {
      background: #fff !important;
    }
  }
`

const StyledMoveIcon = styled(Move)`
  position: absolute;
  padding: 0 5px 5px 5px;
  top: 0;
  left: -28px;
  fill: ${props => props.theme.colors.ICON_UNSELECTED};
  cursor: pointer;
`

const SortHandler = SortableHandle(StyledMoveIcon)

const VideoMain = styled(MediaItemMain)`
  padding: 0 25px;
`

interface VideoItemProps {
  video: OrderVideo
  onDelete: (id: OrderVideo['id']) => void
}

const VideoItem: React.FunctionComponent<VideoItemProps> = props => {
  const { video } = props
  const handleDelete = React.useCallback(() => props.onDelete(video.id), [])

  return (
    <VideoItemWrapper key={video.id} type={video.type}>
      <SortHandler size='28' title='Drag row into desired position' />
      {!video.error && (
        <Thumb>
          <img src={video.thumbUrl} />
          <TooltippedStyled tooltip={<TooltipContent>{video.fileName && (<span>File name: {video.fileName}</span>)}<span>Upload date: {video.date}</span></TooltipContent>}>
            <InfoCircle size='30' />
          </TooltippedStyled>
        </Thumb>
      )}
      <VideoMain>
        <VideoData>
          {video.error && <ErrorHolder><Error size='60'/></ErrorHolder>}
          <div>
            <span><span>Label:</span> {video.title}</span>
            <span><span>Type:</span> {video.type}</span>
            <span><span>Category:</span> {video.category}</span>
            <span><span>Appears:</span> {video.appearance}</span>
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
        <ButtonsRight>
          <Button
            buttonTheme='primary'
            icon={Edit}
            label='Edit'
            to={`#`} // TODO: update url when edit views done
          />
          <MediaDeleteBtn
            itemTitle={video.title}
            onDelete={handleDelete}
          />
        </ButtonsRight>
      </VideoMain>
    </VideoItemWrapper>
  )
}

const SortableVideoItem = SortableElement<VideoItemProps>(VideoItem)

export default SortableVideoItem
