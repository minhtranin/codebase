import { Order } from '#veewme/graphql/types'
import Footer from '#veewme/web/common/footer/listFooter'
import { ActionClickCallback } from '#veewme/web/common/orderListItem/common'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import ProcessorOrdersListItem from './processorOrdersListItem'

export const StyledList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  list-style: none;
`

export interface OrdersListProps {
  orders: Order[]
  termsURL: string
  itemsPerPage: number
  onListItemButtonClick: ActionClickCallback
  onPageChange: (page: number) => void
}

const OrdersList: React.FunctionComponent<OrdersListProps> = props => (
  <>
    <StyledList>
      {props.orders.map(order => (
        <ProcessorOrdersListItem
          key={order.id}
          order={order}
          termsURL={props.termsURL}
          onActionClick={props.onListItemButtonClick}
        />
      ))}
    </StyledList>
    <Footer
      label='Displaying last 30 days'
      totalRecords={props.orders.length}
      pageLimit={props.itemsPerPage}
      maxButtons={7}
      onPageChange={props.onPageChange}
    />
  </>
)

export default OrdersList
