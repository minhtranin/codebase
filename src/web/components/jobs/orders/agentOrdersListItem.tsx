import { Order } from '#veewme/graphql/types'
import AddCalendarSvg from '#veewme/web/assets/svg/add-calendar.svg'
import ActionBar, { Action, TooltippedIconButton } from '#veewme/web/common/orderListItem/actionBar'
import AddressCell from '#veewme/web/common/orderListItem/addressCell'
import ChartCell from '#veewme/web/common/orderListItem/chartCell'
import { ACTION_BAR_HEIGHT, ActionClickCallback, ActionId, ADDRESS_BAR_HEIGHT, ITEM_CELL_HEIGHT, StatusClickCallback } from '#veewme/web/common/orderListItem/common'
import DataCell from '#veewme/web/common/orderListItem/dataCell'
import ImageCell from '#veewme/web/common/orderListItem/imageCell'
import ServicesCell from '#veewme/web/common/orderListItem/servicesCell'
import { StyledListItem } from '#veewme/web/common/orderListItem/styled'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'

const StyledGrid = styled.div `
  display: grid;
  grid-template-columns: 260px minmax(195px, 1fr) 2fr 2fr;
  grid-template-rows: ${ADDRESS_BAR_HEIGHT} ${ITEM_CELL_HEIGHT} ${ACTION_BAR_HEIGHT};
  grid-template-areas: "img addr addr chart" "img data services chart" "img action action chart";
  grid-gap: 8px 8px;
  min-height: 180px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-template-columns: 160px  minmax(195px, 1fr) 2fr 3fr;
    grid-template-areas: "addr addr addr chart" "img data services chart" "action action action chart";
    grid-gap: 4px 8px;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    grid-template-columns: 180px 1fr;
    grid-template-rows: ${ADDRESS_BAR_HEIGHT} auto auto auto;
    grid-template-areas: "addr addr " "data services" "chart chart" "action action";
    grid-gap: 4px 8px;
    padding-left: 4px;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    grid-template-columns: 210px 1fr;
    grid-template-rows: ${ADDRESS_BAR_HEIGHT} auto auto auto auto;
    grid-template-areas: "addr addr" "img data" "services services"  "chart chart" "action action";
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_SM}) {
    grid-template-columns: 1fr;
    grid-template-rows: ${ADDRESS_BAR_HEIGHT} 150px auto auto auto;
    grid-template-areas: "addr" "img" "data" "services" "chart" "action";
  }
`

const dropDownActions: Action[] = [
  {
    id: ActionId.Action1,
    label: 'Action1'
  }, {
    id: ActionId.Action2,
    label: 'Action2'
  }, {
    id: ActionId.Action3,
    label: 'Action3'
  }
]

const buttonActions: Action[] = [
  {
    id: ActionId.Preview,
    label: 'View'
  }
]

const iconButtons: TooltippedIconButton[] = [
  {
    actionId: ActionId.AddCalendar,
    icon: AddCalendarSvg,
    tooltip: 'Add Calendar'
  }
]

interface OrdersListItemProps {
  order: Order
  termsURL: string
  onActionClick: ActionClickCallback
  onServiceStatusClick: StatusClickCallback
}

const ProcessorOrdersListItem: React.FunctionComponent<OrdersListItemProps> = props => (
  <StyledListItem status={props.order.status}>
    <StyledGrid>
      <ImageCell
        order={props.order}
        termsURL={props.termsURL}
        onActionClick={props.onActionClick}
      />
      <AddressCell
        order={props.order}
      />
      <DataCell
        order={props.order}
        onActionClick={props.onActionClick}
      />
      <ServicesCell
        order={props.order}
        onServiceStatusClick={props.onServiceStatusClick}
      />
      <ChartCell
        order={props.order}
        onFullStatsClick={props.onActionClick}
      />
      <ActionBar
        order={props.order}
        buttonActions={buttonActions}
        dropDownButtonLabel='Action'
        dropDownActions={dropDownActions}
        tooltippedIconButtons={iconButtons}
        onActionClick={props.onActionClick}
      />
    </StyledGrid>
  </StyledListItem>
)

export default ProcessorOrdersListItem
