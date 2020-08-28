import { OrderStatus, PendingOrder, PendingOrdersComponent } from '#veewme/graphql/types'
import { LegendStatus } from '#veewme/web/common/footer/legendBar'
import * as log from '#veewme/web/common/log'
import { getOrderLegendStatus } from '#veewme/web/common/status'
import * as React from 'react'
import Filters, { FiltersFormValues } from './filtersBar'
import PendingOrdersList from './pendingOrdersList'

const statuses: OrderStatus[] = [
  'Overdue',
  'Unscheduled',
  'Scheduled',
  'Unassigned',
  'Unpublished'
]

const PendingOrdersListContainer: React.FunctionComponent<{}> = () => {
  const legendStatuses: LegendStatus[] = [
    getOrderLegendStatus('Overdue'),
    getOrderLegendStatus('Unscheduled'),
    getOrderLegendStatus('Scheduled'),
    getOrderLegendStatus('Unassigned'),
    getOrderLegendStatus('Unpublished')
  ]

  const handlePageChange = (page: number) => {
    log.debug('page changed', page)
  }

  const handleFiltersChange = (values: FiltersFormValues) => {
    log.debug('filters change: ', values)
  }

  return (
    <PendingOrdersComponent>
      {({ data, loading }) => {
        if (loading) {
          return (
            <p>Loading data...</p>
          )
        }
        return (
          <>
            <Filters
              statuses={statuses}
              onChange={handleFiltersChange}
            />
            { data && data.pendingOrders
              ? <PendingOrdersList
                  orders={data.pendingOrders as PendingOrder[]} // TODO remove cast
                  onPageChange={handlePageChange}
                  ordersPerPage={20} // should be data.ordersPerPage?
                  legendStatuses={legendStatuses}
              />
              : <p>No orders</p>
            }
          </>
        )
      }}
    </PendingOrdersComponent>
  )
}

export default PendingOrdersListContainer
