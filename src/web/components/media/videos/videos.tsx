import * as log from '#veewme/web/common/log'
import arrayMove from 'array-move'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Button from '../../../common/buttons/basicButton'
import styled from '../../../common/styled-components'
import SendEmail from '../mediaEmailModal'
import { Header, ListTitle, ListWrapper } from '../styled'
import { Appearance, OrderVideo, VideoCategory } from '../types'
import VideosList from './videosList'

import { Plus } from 'styled-icons/fa-solid'
/*
 Fake data
 TODO: remove when integrdated with backend
*/
const mockOrderVideos: OrderVideo[] = [{
  appearance: Appearance.Always,
  category: VideoCategory.Property,
  date: '06/23/18',
  fileName: 'video.mpg',
  id: '1',
  thumbUrl: '/public/static/img/house1.png',
  title: 'Video 1',
  type: 'URL'
}, {
  appearance: Appearance.Always,
  category: VideoCategory.Property,
  date: '06/23/18',
  fileName: 'video.mpg',
  id: '2',
  thumbUrl: '/public/static/img/house2.png',
  title: 'Sample Video',
  type: 'faux'
}, {
  appearance: Appearance.Always,
  category: VideoCategory.Property,
  date: '06/23/18',
  fileName: 'video.mpg',
  id: '3',
  thumbUrl: '/public/static/img/house1.png',
  title: 'Another video',
  type: 'embed'
}, {
  appearance: Appearance.Unbranded,
  category: VideoCategory.Neighbourhood,
  date: '06/23/18',
  fileName: 'video.mpg',
  id: '4',
  thumbUrl: '/public/static/img/house2.png',
  title: 'Lorem ipsum',
  type: 'hosted'
}, {
  appearance: Appearance.Branded,
  category: VideoCategory.Property,
  date: '06/23/18',
  error: true,
  id: '5',
  title: 'Lorem ipsum',
  type: 'URL'
}]

const VideosHint = styled.p`
  padding-left: 22px;
  font-size: 13px;
`

interface VideosState {
  videos: OrderVideo[]
}

// When integrated with Apollo list of videos can be stored in apollo cache instead of component state
class Videos extends React.PureComponent<RouteComponentProps, VideosState> {
  state: VideosState = {
    videos: mockOrderVideos
  }

  handleOrderVideoDelete = (id: OrderVideo['id']) => {
    log.debug('delete', id)
    // when inegradted with Apollo code below can be used to update apollo cache instead of component state
    this.setState(prevState => ({
      videos: prevState.videos.filter(video => video.id !== id)
    }))
  }

  handleSort = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    this.setState(({ videos }) => ({
      videos: arrayMove(videos, oldIndex, newIndex)
    }))
  }

  render () {
    const { match: { url } } = this.props
    return (
      <ListWrapper>
        <Header>
          <ListTitle inline={true}>
            Videos
            <Button
              buttonTheme='action'
              full={true}
              icon={Plus}
              to={`${url}/add`}
            />
          </ListTitle>
          <SendEmail label='Video Content Added' type='video' />
        </Header>
        <VideosHint>Drag rows into desired position on tour video navigation tab</VideosHint>
        <VideosList
          videos={this.state.videos}
          onDelete={this.handleOrderVideoDelete}
          onSortEnd={this.handleSort}
          useDragHandle
        />
      </ListWrapper>
    )
  }
}

export default Videos
