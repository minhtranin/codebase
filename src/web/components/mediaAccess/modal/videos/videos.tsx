import styled from '#veewme/web/common/styled-components'
import { Appearance, OrderVideo, VideoCategory } from '#veewme/web/components/media/types'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import TabContainer from '../tabContainer'
import VideoItem from './videoItem'

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
  type: 'embed'
}]

const VideosWrapper = styled.div`
  padding: 0 15px 0 0;
`

interface VideosListProps {
  videos: OrderVideo[]
}

const VideosList: React.FunctionComponent<VideosListProps> = props => (
  <Scrollbars
    autoHeight={true}
    autoHeightMax={`calc(85vh - 245px)`}
    autoHide={false}
    autoHeightMin='250px'
  >
    <VideosWrapper>
      {props.videos.map(video => (<VideoItem key={video.id} video={video} />))}
    </VideosWrapper>
  </Scrollbars>
)

interface VideosContainerProps {
  orderId?: string
}

const VideosContainer: React.FunctionComponent<VideosContainerProps> = () => (
  <TabContainer>
    <VideosList videos={mockOrderVideos} />
  </TabContainer>
)

export default VideosContainer
