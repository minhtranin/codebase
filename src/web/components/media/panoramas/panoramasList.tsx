import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import SelectablePhoto from '../../../common/selectablePhoto'
import { PhotosMainListWrapper, TooltipContent } from '../styled'
import { OrderPanorama } from '../types'

interface PanoramasListProps extends RouteComponentProps {
  panoramas: OrderPanorama[]
  onUpdate: (id: OrderPanorama['id'], payload: Partial<OrderPanorama>) => void
  onDelete: (id: OrderPanorama['id']) => void
}

class PanoramasList extends React.PureComponent<PanoramasListProps> {
  render () {
    const { match: { url } } = this.props
    return (
      <PhotosMainListWrapper panoramicItems={true} >
        {
          this.props.panoramas.map(panorama => {
            return (
              <div key={panorama.id}>
                <SelectablePhoto
                  extended={true}
                  panoramicAspectRatio={true}
                  thumbUrl={panorama.thumbUrl}
                  onDelete={() => this.props.onDelete(panorama.id)}
                  onUpdate={(payload: Partial<OrderPanorama>) => this.props.onUpdate(panorama.id, payload)}
                  title={panorama.title}
                  editUrl={`${url}/${panorama.id}`}
                  toolbarInfo={
                    <TooltipContent>
                      <span>File name: {panorama.fileName}</span>
                      <span>Upload date: {panorama.date}</span>
                      <span>Initial zoom: {panorama.initialZoom}</span>
                    </TooltipContent>
                  }
                />
              </div>
            )
          })
        }
      </PhotosMainListWrapper>
    )
  }
}

export default withRouter(PanoramasList)
