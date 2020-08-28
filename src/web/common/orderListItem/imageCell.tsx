import { Order } from '#veewme/graphql/types'
import MediaSvg from '#veewme/web/assets/svg/media-access.svg'
import UploadSvg from '#veewme/web/assets/svg/upload.svg'
import VideoSvg from '#veewme/web/assets/svg/video.svg'
import WebSvg from '#veewme/web/assets/svg/web.svg'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { ActionClickCallback, ActionId } from './common'
import OrderActivationConfirm from './orderActivationConfirm'

const StyledWebBubble = styled.div `
  position: absolute;
  display: flex;
  background-color: ${props => props.theme.colors.WEB_BACKGROUND};
  border: 2px solid ${props => props.theme.colors.WEB_BORDER};
  cursor: pointer;
  left: 16px;
  top: 16px;
  padding: 8px;
  border-radius: 5px;
  & svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    left: 10px;
    top: 10px;
    padding: 4px;
  }
`

const StyledMediaBubble = styled.div `
  position: absolute;
  display: flex;
  background-color: ${props => props.theme.colors.BUBBLE_BACKGROUND};
  left: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 15px;
  opacity: 0.7;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    left: 10px;
    bottom: 4px;
    padding: 4px 7px;
    border-radius: 10px;
  }
`

const StyledMediaBtn = styled.div `
  display: flex;
  margin: 0 5px;
  cursor: pointer;
  & > p {
    margin-left: 6px;
    font-size: 12px;
    font-weight: 500;
    color: ${props => props.theme.colors.LABEL_REVERSE_TEXT};
  }
  & > svg {
    width: 13px;
    height: 13px;
    fill: white;
  }
`

const StyledImageDiv = styled.div<{ thumb: string}> `
  position: absolute;
  background-image: url(${props => props.thumb});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 7px 0 0 7px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    border-radius: 0;
  }
`

const StyledUploadDiv = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px 0 0 7px;
  background-color: ${props => props.theme.colors.IMAGE_BACKGROUND};
  height: 100%;
`

const StyledAddDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.BORDER};
  cursor: pointer;
  padding: 10px;
  & > h4 {
    font-size: 18px;
    margin-top: 10px;
  }
  & > svg {
    width: 36px;
    height: 36px;
    fill: ${props => props.theme.colors.BORDER};
  }
`

const StyledImageContainer = styled.div `
  position: relative;
  grid-area: img;
  width: 100%;
  border-radius: 7px 0 0 7px;
  background-color: ${props => props.theme.colors.IMAGE_BACKGROUND};
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    border-radius: 0;
    min-height: 90px;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    display: none;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    border-radius: 0;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_SM}) {
    width: 70%;
    padding: 0 15%;
  }
`

interface ImageCellProps {
  order: Order
  termsURL: string
  onActionClick: ActionClickCallback
}

interface ImageCellState {
  showConfirm: boolean
}

class ImageCell extends React.PureComponent<ImageCellProps, ImageCellState> {
  state: ImageCellState = {
    showConfirm: false
  }

  toggleShowConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm
    })
  }

  handleOrderActivationConfirmClick = () => {
    this.toggleShowConfirm()
    this.props.onActionClick(this.props.order.id, ActionId.WebActivate)
  }

  render () {
    const { order } = this.props
    return (
      <StyledImageContainer>
        {order.thumb
        ? <StyledImageDiv thumb={order.thumb}>
            {order.web && !order.active &&
              <StyledWebBubble onClick={this.toggleShowConfirm}>
                <WebSvg/>
              </StyledWebBubble>
            }
            <StyledMediaBubble>
              <StyledMediaBtn onClick={() => this.props.onActionClick(order.id, ActionId.MediaImage)}>
                <MediaSvg/>
                <p>{order.images}</p>
              </StyledMediaBtn>
              <StyledMediaBtn onClick={() => this.props.onActionClick(order.id, ActionId.MediaVideo)}>
                <VideoSvg/>
                <p>{order.videos}</p>
              </StyledMediaBtn>
            </StyledMediaBubble>
          </StyledImageDiv>
        : <StyledUploadDiv onClick={() => this.props.onActionClick(order.id, ActionId.ImageUpload)}>
            <StyledAddDiv>
              <UploadSvg/>
              <h4>Add media</h4>
            </StyledAddDiv>
          </StyledUploadDiv>
        }

        {this.state.showConfirm &&
          <OrderActivationConfirm
            cost={order.cost}
            onConfirm={this.handleOrderActivationConfirmClick}
            onCancel={this.toggleShowConfirm}
            termsURL={this.props.termsURL}
          />
        }
      </StyledImageContainer>
    )
  }
}

export default ImageCell
