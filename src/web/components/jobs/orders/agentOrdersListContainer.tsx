import { Order, OrdersComponent, OrderService } from '#veewme/graphql/types'
import * as log from '#veewme/web/common/log'
import { ActionId } from '#veewme/web/common/orderListItem/common'
import * as React from 'react'
import AgentOrdersList from './agentOrdersList'

// TODO add termsURL to data from server
const TERMS_URL = 'www.google.com'

class AgentOrdersListContainer extends React.PureComponent<{}, {}> {

  handlePageChange = (page: number) => {
    log.debug('page changed', page)
  }

  handleOrderListItemButtonClick = (orderId: Order['id'], actionId: ActionId) => {
    log.debug(`Clicked on button ${ActionId[actionId]} in item ${orderId}`)
  }

  handleOrderListItemServiceStatusClick = (orderId: Order['id'], serviceId: OrderService['id']) => {
    log.debug(`Clicked on status of service ${serviceId} in item ${orderId}`)
  }

  render () {
    return (
      <OrdersComponent>
        {({ data, loading }) => {
          if (loading) {
            return (
              <p>Loading data...</p>
            )
          }
          if (data) {
            return (
              <>
                <AgentOrdersList
                  orders={data.orders as Order[]} // TODO remove cast
                  termsURL={TERMS_URL} // TODO Replace with data.termsURL
                  onListItemButtonClick={this.handleOrderListItemButtonClick}
                  onListItemServiceStatusClick={this.handleOrderListItemServiceStatusClick}
                  onPageChange={this.handlePageChange}
                  itemsPerPage={30} // TODO should be data.itemsPerPage?
                />
              </>
            )
          }
          return (
            <p>No orders</p>
          )
        }}
      </OrdersComponent>
    )
  }
}

export default AgentOrdersListContainer
