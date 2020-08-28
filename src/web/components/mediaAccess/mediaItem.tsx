import { Order } from '#veewme/graphql/types'
import { OrderStatus } from '#veewme/graphql/types'
import Button from '#veewme/web/common/buttons/basicButton'
import * as log from '#veewme/web/common/log'
import { getOrderLegendStatus } from '#veewme/web/common/status'
import styled from '#veewme/web/common/styled-components'
import Tooltipped from '#veewme/web/common/tooltipped'
import * as React from 'react'
import MediaModal, { tabEntries, TabItems } from './modal'
import TourLinksModal from './tourLinksModal'

import { Link, MailOutline as Mail } from 'styled-icons/material'

const itemHeight = '145px'
const rowBottomHeight = '60px'

export const StyledListItem = styled.li<{ status?: OrderStatus }> `
  display: flex;
  border-radius: 7px;
  background-color: white;
  border-right: 5px solid ${props => props.status ? getOrderLegendStatus(props.status).color : props.theme.colors.BORDER};
  margin: 20px 0;
  overflow: hidden;
  height: ${itemHeight};

  &:hover, &:active {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

const ImgHolder = styled.div`
  width: 220px;
  height: 100%;
  flex: 0 0 auto;
  background: ${props => props.theme.colors.ACTIONBAR_BACKGROUND};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    display: none;
  }
`

const ItemBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`

const ItemBodyTop = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: space-between;
  max-height: ${`calc(${itemHeight} - ${rowBottomHeight})`};

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
    flex-wrap: wrap;
  }
`

export const StyledTitle = styled.h3`
  display: flex;
  flex: 1 0 0;
  margin-right: 10px;
  height: 100%;
  font-weight: 600;
  padding: 5px 15px;
  font-size: 15px;
  color: ${props => props.theme.colors.FIELD_TEXT};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_FHD}) {
    font-size: 13px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
    flex: 1 0 auto;
    font-size: 13px;
    width: 100%;
    max-width: none;
    height: auto;
    padding-top: 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    font-size: 12px;
  }
`

const ItemBodyTopCell = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: 5px 15px;
  border-left: 1px dotted ${props => props.theme.colors.BORDER};
  align-items: center;
  height: 100%;
  font-size: 13px;
  font-weight: 500;

  a,
  button {
    margin-right: 7px;

    svg {
      width: 20px;
      max-width: 20px;
      height: 20px;
      max-height: 20px;
      fill: ${props => props.theme.colors.GREEN};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
    height: auto;
    font-size: 12px;
    border-left: 0 none;
    padding: 7px 15px;
  }
`

const IdCell = styled(ItemBodyTopCell)`
  width: 295px;
  min-width: 0;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
    max-width: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    display: none;
  }
`

const AgentCell = styled(ItemBodyTopCell)`
  width: 200px;

  > div > div:first-child {
    margin-bottom: 5px;

    @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
      margin-bottom: 0;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    font-size: 13px;
  }
`

const ButtonsCell = styled(ItemBodyTopCell)`
  width: 295px;
  flex-grow: 0;
  flex-shrink: 0;
`

const CellLabel = styled.span`
  margin-right: 4px;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

const CellValue = styled.span`
  color: ${props => props.theme.colors.FIELD_TEXT};
  flex: 1 0 auto;
`

const ItemBodyBottom = styled.div`
  display: flex;
  height: ${rowBottomHeight};
  flex: 0 0 auto;
  padding: 0 15px;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colors.BORDER};
  background: ${props => props.theme.colors.ACTIONBAR_BACKGROUND};

  button {
    margin-right: 10px;
    text-transform: capitalize;
  }
`

const tooltipDelay = 1500

interface MediaItemProps {
  order: Order
}

const MediaItem: React.FunctionComponent<MediaItemProps> = props => {
  const { order } = props
  const [modalOpen, toggleModal] = React.useState(false)
  const [currentTab, setTab] = React.useState(TabItems.Photos)
  const showModal = (tabId: TabItems) => {
    setTab(tabId)
    toggleModal(true)
  }

  const [tourLinksModalOpen, toggleTourLinksModal] = React.useState(false)

  const body = encodeURIComponent('http://www.example.com')
  const subject = encodeURIComponent(`Media Link for Order ID ${order.id}`)
  const href = `mailto:?subject=${subject}&body=${body}`
  log.debug('Decoded mailto href: ', decodeURIComponent(href))

  return (
    <StyledListItem status={order.status}>
      <ImgHolder>
        {order.thumb && <img src={order.thumb} />}
      </ImgHolder>
      <ItemBody>
        <ItemBodyTop>
          <StyledTitle>{order.address}</StyledTitle>
          <IdCell>
            <div>
              <CellLabel>Order ID: </CellLabel>
              <CellValue>{order.id}</CellValue>
            </div>
          </IdCell>
          <AgentCell>
            <div>
              <div>
                <CellLabel>Agent: </CellLabel>
                <CellValue>{order.agent}</CellValue>
              </div>
              <div>
                <CellLabel>Broker: </CellLabel>
                <CellValue>{order.broker}</CellValue>
              </div>
            </div>
          </AgentCell>
          <ButtonsCell>
            <Tooltipped
              delayShow={tooltipDelay}
              tooltip='Email link to Media'
            >
              <div>
                <Button
                  size='medium'
                  label='Media Link'
                  icon={Mail}
                  href={href}
                />
              </div>
            </Tooltipped>
            <Tooltipped
              delayShow={tooltipDelay}
              tooltip='Access Tour links'
            >
              <div>
                <Button
                  size='medium'
                  label='Tours Links'
                  icon={Link}
                  onClick={() => toggleTourLinksModal(true)}
                />
              </div>
            </Tooltipped>
          </ButtonsCell>
        </ItemBodyTop>
        <ItemBodyBottom>
          {
            tabEntries.map(entry => (
              <Button
                key={entry}
                size='medium'
                label={entry}
                onClick={() => showModal(entry)}
              />
            ))
          }
        </ItemBodyBottom>
      </ItemBody>
      <MediaModal
        isOpen={modalOpen}
        close={() => toggleModal(false)}
        title={order.address}
        currentTab={currentTab}
      />
      <TourLinksModal
        isOpen={tourLinksModalOpen}
        close={() => toggleTourLinksModal(false)}
      />
    </StyledListItem>
  )
}

export default MediaItem
