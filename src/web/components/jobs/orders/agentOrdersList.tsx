import { Order } from '#veewme/graphql/types'
import { LegendStatus } from '#veewme/web/common/footer/legendBar'
import Footer from '#veewme/web/common/footer/listFooter'
import { ActionClickCallback, StatusClickCallback } from '#veewme/web/common/orderListItem/common'
import { getOrderLegendStatus } from '#veewme/web/common/status'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import AgentOrdersListItem from './agentOrdersListItem'

export const StyledList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  list-style: none;
`

const statuses: LegendStatus[] = [
  getOrderLegendStatus('Active'),
  getOrderLegendStatus('Inactive'),
  getOrderLegendStatus('MediaOnly'),
  getOrderLegendStatus('Pending'),
  getOrderLegendStatus('Sold')
]

export interface OrdersListProps {
  orders: Order[]
  termsURL: string
  itemsPerPage: number
  onListItemButtonClick: ActionClickCallback
  onListItemServiceStatusClick: StatusClickCallback
  onPageChange: (page: number) => void
}

const OrdersList: React.FunctionComponent<OrdersListProps> = props => (
  <>
    <StyledList>
      {props.orders.map(order => (
        <AgentOrdersListItem
          key={order.id}
          order={order}
          termsURL={props.termsURL}
          onActionClick={props.onListItemButtonClick}
          onServiceStatusClick={props.onListItemServiceStatusClick}
        />
      ))}
    </StyledList>
    <Footer
      label='Displaying last 30 days'
      statuses={statuses}
      totalRecords={props.orders.length}
      pageLimit={props.itemsPerPage}
      maxButtons={7}
      onPageChange={props.onPageChange}
    />
  </>
)

export default OrdersList
