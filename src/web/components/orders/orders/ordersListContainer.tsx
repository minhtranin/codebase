import { Order, OrdersComponent, OrderService } from '#veewme/graphql/types'
import * as log from '#veewme/web/common/log'
import { ActionId } from '#veewme/web/common/orderListItem/common'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Filters, { FiltersFormValues } from './filtersBar'
import OrdersList from './ordersList'

// TODO remove const after adding termsURL to data from server
const TERMS_URL = 'www.google.com'

class OrdersListContainer extends React.PureComponent<RouteComponentProps> {

  handlePageChange = (page: number) => {
    log.debug('page changed', page)
  }

  handleFiltersChange = (values: FiltersFormValues) => {
    log.debug('filters change: ', values)
  }

  handleOrderListItemActionClick = (orderId: Order['id'], actionId: ActionId) => {
    log.debug(`Clicked on action ${actionId} in item ${orderId}`)
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
                <Filters onChange={this.handleFiltersChange}/>
                <OrdersList
                  orders={data.orders as Order[]} // TODO remove cast
                  termsURL={TERMS_URL} // TODO Replace with data.termsURL
                  onListItemActionClick={this.handleOrderListItemActionClick}
                  onListItemServiceStatusClick={this.handleOrderListItemServiceStatusClick}
                  onPageChange={this.handlePageChange}
                  ordersPerPage={30} // TODO should be data.ordersPerPage?
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

export default withRouter(OrdersListContainer)
