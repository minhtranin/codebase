import { Order } from '#veewme/graphql/types'
import { privateUrls } from '#veewme/lib/urls'
import AddCalendarSvg from '#veewme/web/assets/svg/add-calendar.svg'
import AddOnSvg from '#veewme/web/assets/svg/add-on.svg'
import LoginAsSvg from '#veewme/web/assets/svg/login-as.svg'
import OrderDetailsSvg from '#veewme/web/assets/svg/order-details.svg'
import TourGallerySvg from '#veewme/web/assets/svg/tour-gallery.svg'
import IconButton from '#veewme/web/common/buttons/iconButton'
import ActionBar, { Action, TooltippedIconButton } from '#veewme/web/common/orderListItem/actionBar'
import AddressCell from '#veewme/web/common/orderListItem/addressCell'
import { ACTION_BAR_HEIGHT, ActionClickCallback, ActionId, ADDRESS_BAR_HEIGHT, ITEM_CELL_HEIGHT, StatusClickCallback } from '#veewme/web/common/orderListItem/common'
import ContactCell from '#veewme/web/common/orderListItem/contactCell'
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
  grid-template-areas: "img addr addr logistics" "img data contact logistics" "img action action action";
  min-height: 172px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    grid-template-columns: 160px  minmax(195px, 1fr) 2fr 3fr;
    grid-template-areas: "addr addr addr logistics" "img data contact logistics" "img action action action";
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    grid-template-columns: 180px 1fr 2fr;
    grid-template-rows: ${ADDRESS_BAR_HEIGHT} auto auto;
    grid-template-areas: "addr addr addr" "data contact logistics" "action action action";
    padding-left: 4px;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    grid-template-columns: 210px 1fr;
    grid-template-rows: ${ADDRESS_BAR_HEIGHT} auto auto auto auto;
    grid-template-areas: "addr addr" "img data" "contact contact" "logistics logistics" "action action";
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_SM}) {
    grid-template-columns: 1fr;
    grid-template-rows: ${ADDRESS_BAR_HEIGHT} 150px auto auto auto;
    grid-template-areas: "addr" "img" "data" "contact" "logistics" "action";
  }
`

const StyledServicesCell = styled(ServicesCell) `
  margin-top: 8px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    margin-top: 0;
  }
`

export const StyledNoteButton = styled(props => <IconButton {...props} />)`
  & svg {
    fill: ${props => props.theme.colors.ORANGE};
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

const iconButtons: TooltippedIconButton[] = [
  {
    actionId: ActionId.TourGallery,
    icon: TourGallerySvg,
    tooltip: 'Tour Gallery'
  }, {
    actionId: ActionId.LoginAs,
    icon: LoginAsSvg,
    tooltip: 'Agent Login'
  }, {
    actionId: ActionId.OrderDetails,
    icon: OrderDetailsSvg,
    tooltip: 'Order Details'
  }, {
    actionId: ActionId.AddCalendar,
    icon: AddCalendarSvg,
    tooltip: 'Schedule'
  }, {
    actionId: ActionId.AddOn,
    icon: AddOnSvg,
    tooltip: 'Add-on Order'
  }
]

interface OrdersListItemProps {
  order: Order
  termsURL: string
  onActionClick: ActionClickCallback
  onServiceStatusClick: StatusClickCallback
}

const OrdersListItem: React.FunctionComponent<OrdersListItemProps> = props => (
  <StyledListItem
    status={props.order.status}
  >
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
      <ContactCell
        order={props.order}
        onActionClick={props.onActionClick}
      />
      <StyledServicesCell
        order={props.order}
        onServiceStatusClick={props.onServiceStatusClick}
      />
      <ActionBar
        order={props.order}
        buttonActions={[
          {
            id: ActionId.Preview,
            label: 'Preview'
          }, {
            id: ActionId.Media,
            label: 'Media',
            linkTo: `${privateUrls.orders}/order/${props.order.id}/media`
          }
        ]}
        dropDownButtonLabel='Action'
        dropDownActions={dropDownActions}
        tooltippedIconButtons={iconButtons}
        onActionClick={props.onActionClick}
      />
    </StyledGrid>
  </StyledListItem>
)

export default OrdersListItem
