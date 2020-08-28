import { Order } from '#veewme/graphql/types'
import { LegendStatus } from '#veewme/web/common/footer/legendBar'
import ListFooter from '#veewme/web/common/footer/listFooter'
import { ActionClickCallback } from '#veewme/web/common/orderListItem/common'
import { getOrderLegendStatus } from '#veewme/web/common/status'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import AdminOrdersListItem from './adminOrdersListItem'

export const StyledList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  list-style: none;
`

export interface AdminOrdersListProps {
  orders: Order[]
  termsURL: string
  ordersPerPage: number
  onListItemButtonClick: ActionClickCallback
  onPageChange: (page: number) => void
}

const statuses: LegendStatus[] = [
  getOrderLegendStatus('Published'),
  getOrderLegendStatus('Unpublished'),
  getOrderLegendStatus('MediaOnly')
]

const AdminOrdersList: React.FunctionComponent<AdminOrdersListProps> = props => (
  <>
    <StyledList>
      {props.orders.map(order => (
        <AdminOrdersListItem
          key={order.id}
          order={order}
          termsURL={props.termsURL}
          onActionClick={props.onListItemButtonClick}
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

export default AdminOrdersList
