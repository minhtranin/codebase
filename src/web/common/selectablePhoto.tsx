import Tooltipped from '#veewme/web/common/tooltipped'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'
import CheckMarkSvg from '../assets/svg/checkmark.svg'
import { OrderPhoto } from '../components/media/types'
import DeleteConfirmation from './deleteConfirmation'
import { StyledInput } from './formikFields/inputField'
import { BannerSettingsModal } from './selectablePhotoBannerModal'
import styled from './styled-components'

import { InfoCircle, Move, Star } from 'styled-icons/boxicons-regular'
import { Edit, Star as StarSolid } from 'styled-icons/boxicons-solid'
import { Eye, EyeBlocked, ZoomIn } from 'styled-icons/icomoon'
import { CenterFocusStrong, Close } from 'styled-icons/material'

interface StyledProps {
  checked?: boolean
  extended?: boolean
  isHidden?: boolean
  panoramic?: boolean
}

const StyledMoveIcon = styled(Move)`
  margin-left: 10px;
  margin-right: -3px;
  padding: 3px;
  fill: ${props => props.theme.colors.ICON_UNSELECTED};
  cursor: pointer;
  transition: opacity .5s;

  &:hover {
    opacity: 0.8;
  }
`

const SortHandler = SortableHandle(StyledMoveIcon)

const InputWrapper = styled.div`
  display: flex;
  padding: 10px 8px;
  background: #fff;
  justify-content: space-between;
  align-items: center;
`

const CaptionInput = styled(StyledInput)`
  border: 2px solid #fff;
  border-radius: 5px;
  flex: 1 1 auto;
`

const IconHolder = styled.span`
  display: flex;
  align-items: center;
  height: 30px;

  display: flex;
  align-items: center;
`

const MainHolder = styled.div`
  display: flex;
  position: relative;
`

const ToolbarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 35px;
  padding: 7px 0;
  background: ${props => props.theme.colors.SELECTABLE_PHOTO_SIDEBAR_BG};

  svg {
    width: 19px;
    height: 19px;
    fill: #fff;
  }

  div:last-child {
    svg {
      fill: ${props => props.theme.colors.ALERT};
      transform: scale(1.2);
    }
  }
`
const LeftBottomIconHolder = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;

  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    background: linear-gradient(40deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 50%);
  }

  div {
    position: absolute;
    display: flex;
    bottom: 10px;
    left: 15px;

    z-index: 1;
    pointer-events: auto;
  }

  svg {
    fill: #fff;
  }

  & + & {
    &:after {
      display: none;
    }
    div {
      bottom: 55px;
    }
  }
`

const imageRatio = 66.6667
const PhotoWrapper = styled.div<StyledProps>`
  position: relative;
  flex: 1 0 auto;
  user-select: none;

  // preserves aspect ratio
  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: ${props => !props.panoramic ? imageRatio : (imageRatio / 2)}%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${props => props.checked || props.extended ? 1 : 0.8};
    filter: ${props => (!props.extended && props.checked) || (props.extended && !props.isHidden) ? 'none' : 'grayscale(100%)'};
    transition: opacity .3s;
  }
`

const Wrapper = styled.div<StyledProps>`
  display: inline-block;
  position: relative;
  width: 100%;
  border-radius: 4px;
  border: 2px solid ${props => props.checked ? props.theme.colors.GREEN : props.theme.colors.BORDER}
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 20px ${props => props.theme.colors.BACKGROUND};


  ${LeftBottomIconHolder} {
    display: ${props => props.checked ? 'block' : 'none'};
  }

  &:hover {
    ${LeftBottomIconHolder} {
      display: block;
    }

    ${CaptionInput} {
      border: 2px solid${props => props.theme.colors.BORDER};
    }
  }
`

const Checkmark = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  border: 2px solid ${props => props.theme.colors.GREEN}
  background: ${props => props.theme.colors.BUBBLE_BACKGROUND};
  fill: #fff;
`

interface DeleteBtnProps {
  onDelete: () => void
}

const DeleteBtn: React.FunctionComponent<DeleteBtnProps> = props => (
  <DeleteConfirmation
    onConfirm={props.onDelete}
    message='Are you sure you want to delete this item?'
  >
    {toggleDeleteConfirmation => (<IconHolder onClick={() => toggleDeleteConfirmation()}>{<Close />}</IconHolder>)}
  </DeleteConfirmation>
)

interface ToolbarProps {
  star?: boolean
  hidden?: boolean
  toolbarInfo?: JSX.Element
  onBannerSettingsClick?: () => void
  onUpdate: (payload: Partial<OrderPhoto>) => void
  onDelete: () => void
  editUrl?: string
}

const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  editUrl,
  hidden,
  toolbarInfo,
  star,
  onBannerSettingsClick,
  onDelete,
  onUpdate
}) => {
  return (
    <ToolbarStyled onClick={e => e.stopPropagation()}>
      <div>
        {typeof star !== 'undefined' && <IconHolder onClick={() => onUpdate({ star: !star })}>{!star ? <Star /> : <StarSolid />}</IconHolder>}
        {typeof hidden !== 'undefined' && <IconHolder onClick={() => onUpdate({ hidden: !hidden })}>{!hidden ? <Eye /> : <EyeBlocked />}</IconHolder>}
        {typeof toolbarInfo !== 'undefined' && (
            <Tooltipped
              tooltip={toolbarInfo}
            >
              <IconHolder>
                <InfoCircle />
              </IconHolder>
            </Tooltipped>
          )
        }
        {editUrl && <Link to={editUrl}><IconHolder><Edit /></IconHolder></Link>}
        {onBannerSettingsClick && <IconHolder onClick={onBannerSettingsClick}><CenterFocusStrong title='Banner settings'/></IconHolder>}
      </div>
      <div>
        <DeleteBtn onDelete={onDelete} />
      </div>
    </ToolbarStyled>
  )
}

interface PreviewBtnProps {
  fullUrl: string
  onPreview: (fullUrl: string) => void
}

const PreviewBtn: React.FunctionComponent<PreviewBtnProps> = ({
  fullUrl,
  onPreview
}) => {
  return (
    <>
      <LeftBottomIconHolder>
        <div
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            onPreview(fullUrl)
          }}
        >
          <ZoomIn size='37' />
        </div>
      </LeftBottomIconHolder>
    </>
  )
}

// TODO: finish component implemenation when Tooltip component is ready
interface InfoTooltipBtnProps {
  info: JSX.Element
}

const InfoTooltipBtn: React.FunctionComponent<InfoTooltipBtnProps> = () => {
  return (
    <LeftBottomIconHolder>
      <div>
        <InfoCircle size='30' />
        {/* here will be tooltip component*/}
      </div>
    </LeftBottomIconHolder>
  )
}

interface SelectablePhotoCommonProps {
  thumbUrl: string
  checked?: boolean
  onSelect?: () => void
  onPreview?: (url: string) => void
  fullUrl?: string
  info?: JSX.Element
  panoramicAspectRatio?: boolean
}

// Prop types defined as Discriminated Union ('extended' as discriminant)
interface SelectablePhotoBasicProps extends SelectablePhotoCommonProps {
  extended?: false
}

interface SelectablePhotoExtendedProps extends SelectablePhotoCommonProps, ToolbarProps {
  extended: true
  title: string
  showBannerSettings?: boolean
}

export type SelectablePhotoProps = SelectablePhotoBasicProps | SelectablePhotoExtendedProps

const SelectablePhoto: React.FunctionComponent<SelectablePhotoProps> = ({
  thumbUrl,
  checked,
  onSelect,
  ...props
}) => {
  const initTitle = props.extended ? props.title : ''
  // temp store input value before it's saved on blur
  const [title, updateCaption] = React.useState<string>(initTitle)
  const [bannerSettingsModalVisible, toggleBannerSettingsModal] = React.useState<boolean>(false)

  const showBannerSettingsModal = () => toggleBannerSettingsModal(true)

  // extended  props is discriminant prop
  const toolbar = props.extended && (
    <Toolbar
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      hidden={props.hidden}
      star={props.star}
      editUrl={props.editUrl}
      toolbarInfo={props.toolbarInfo}
      onBannerSettingsClick={props.showBannerSettings ? showBannerSettingsModal : undefined}
    />
  )

  const titleInput = props.extended && (
    <InputWrapper onClick={e => e.stopPropagation()}>
      <CaptionInput
        type='text'
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCaption(e.target.value)}
        onBlur={() => props.onUpdate({ title })}
        placeholder='Enter caption'
      />
      <SortHandler size='28' />
    </InputWrapper>
  )

  const zoomBtn = props.fullUrl && props.onPreview && <PreviewBtn fullUrl={props.fullUrl} onPreview={props.onPreview} />

  const infoTooltip = props.info && <InfoTooltipBtn info={props.info} />

  const checkmark = checked && (
    <Checkmark>
      <CheckMarkSvg width='11px' />
    </Checkmark>
  )

  return (
    <>
      <Wrapper checked={checked} onClick={() => onSelect && onSelect()}>
        <MainHolder>
          <PhotoWrapper panoramic={props.panoramicAspectRatio} checked={checked} extended={props.extended} isHidden={props.extended && props.hidden}>
            <img src={thumbUrl} alt='image' />
          </PhotoWrapper>
          {toolbar}
          {onSelect && checkmark}
          {zoomBtn}
          {infoTooltip}
        </MainHolder>
        {titleInput}
      </Wrapper>
      <BannerSettingsModal
        isOpen={bannerSettingsModalVisible}
        onRequestClose={() => toggleBannerSettingsModal(false)}
        imgSrc={props.fullUrl}
      />
    </>
  )
}

SelectablePhoto.defaultProps = {
  extended: false,
  panoramicAspectRatio: false
}

export default SelectablePhoto
