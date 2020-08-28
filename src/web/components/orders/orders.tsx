import { privateUrls } from '#veewme/lib/urls'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import TabsBar from '../../common/tabsBar'
import NewOrder from './newOrder/newOrder'
import OrdersListContainer from './orders/ordersListContainer'
import PendingOrdersListContainer from './pending/pendingOrdersListContainer'
import { StyledMainWrapper } from './styled'

const tabs = [
  {
    label: 'Orders',
    to: privateUrls.orders
  },
  {
    label: 'Pending',
    to: privateUrls.pendingOrders
  },
  {
    label: 'Media Only',
    to: privateUrls.mediaOnly
  }
]

const MediaOnlyOrdersTab = OrdersListContainer

const OrdersWrappedInTabs: React.FunctionComponent<RouteComponentProps> = () => (
  <StyledMainWrapper>
    <TabsBar tabs={tabs}/>
    <Switch>
      <Route path={privateUrls.pendingOrders} component={PendingOrdersListContainer}/>
      <Route path={privateUrls.mediaOnly} component={MediaOnlyOrdersTab}/>
      <Route exact path={privateUrls.orders} component={OrdersListContainer}/>
    </Switch>
  </StyledMainWrapper>
)

const Orders: React.FunctionComponent<RouteComponentProps> = () => (
  <Switch>
    <Route path={privateUrls.addOrder} component={NewOrder} />
    <Route path={privateUrls.orders} component={OrdersWrappedInTabs}/>
  </Switch>
)

export default Orders
