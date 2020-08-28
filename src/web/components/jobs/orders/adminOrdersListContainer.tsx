import { Order, OrdersComponent } from '#veewme/graphql/types'
import * as log from '#veewme/web/common/log'
import { ActionId } from '#veewme/web/common/orderListItem/common'
import * as React from 'react'
import Filters, { FiltersFormValues } from './adminFiltersBar'
import AdminOrdersList from './adminOrdersList'

// TODO add termsURL to data from server
const TERMS_URL = 'www.google.com'

class AdminOrdersListContainer extends React.PureComponent<{}, {}> {

  handlePageChange = (page: number) => {
    log.debug('page changed', page)
  }

  handleOrderListItemButtonClick = (orderId: Order['id'], actionId: ActionId) => {
    log.debug(`Clicked on button ${ActionId[actionId]} in item ${orderId}`)
  }

  handleFiltersChange = (values: FiltersFormValues) => {
    log.debug('filters change: ', values)
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
                <AdminOrdersList
                  orders={data.orders as Order[]} // TODO remove cast
                  termsURL={TERMS_URL} // TODO to replace with data.termsURL
                  onListItemButtonClick={this.handleOrderListItemButtonClick}
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

export default AdminOrdersListContainer
