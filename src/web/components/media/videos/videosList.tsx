import * as React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { OrderVideo } from '../types'
import VideoItem from './videoItem'

interface VideosListProps {
  videos: OrderVideo[]
  onDelete: (id: OrderVideo['id']) => void
}

const VideosList: React.FunctionComponent<VideosListProps> = props => (
  <div>
    {props.videos.map((video, index) => <VideoItem key={video.id} index={index} video={video} onDelete={props.onDelete}/>)}
  </div>
)

const SortableVideosList = SortableContainer(VideosList)

export default SortableVideosList
