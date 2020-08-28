import { Order } from '#veewme/graphql/types'
import { LegendStatus } from '#veewme/web/common/footer/legendBar'
import ListFooter from '#veewme/web/common/footer/listFooter'
import { ActionClickCallback, StatusClickCallback } from '#veewme/web/common/orderListItem/common'
import { getOrderLegendStatus } from '#veewme/web/common/status'
import * as React from 'react'
import { StyledList } from '../styled'
import ListHeader from './listHeader'
import OrdersListItem from './ordersListItem'

export interface OrdersListProps {
  orders: Order[]
  ordersPerPage: number
  termsURL: string
  onListItemActionClick: ActionClickCallback
  onListItemServiceStatusClick: StatusClickCallback
  onPageChange: (page: number) => void
}

const statuses: LegendStatus[] = [
  getOrderLegendStatus('Published'),
  getOrderLegendStatus('Unpublished'),
  getOrderLegendStatus('MediaOnly')
]

const OrdersList: React.FunctionComponent<OrdersListProps> = props => (
  <>
    <ListHeader/>
    <StyledList>
      {props.orders.map(order => (
        <OrdersListItem
          key={order.id}
          order={order}
          termsURL={props.termsURL}
          onActionClick={props.onListItemActionClick}
          onServiceStatusClick={props.onListItemServiceStatusClick}
        />
      ))}
    </StyledList>
    <ListFooter
      label='Displaying last 30 days'
      statuses={statuses}
      totalRecords={props.orders.length}
      pageLimit={props.ordersPerPage}
      maxButtons={7}
      onPageChange={props.onPageChange}
    />
  </>
)

export default OrdersList
