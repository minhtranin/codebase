import { privateUrls } from '#veewme/lib/urls'
import { StyledMainWrapper } from '#veewme/web/common/styled'
import TabsBar from '#veewme/web/common/tabsBar'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import AdminOrdersListContainer from './orders/adminOrdersListContainer'
import AgentOrdersListContainer from './orders/agentOrdersListContainer'
import PhotographerOrdersListContainer from './orders/photographerOrdersListContainer'
import ProcessorOrdersListContainer from './orders/processorOrdersListContainer'

const tabs = [
  {
    label: 'Processor',
    to: privateUrls.jobs
  },
  {
    label: 'Photographer',
    to: privateUrls.photographerOrders
  },
  {
    label: 'Admin',
    to: privateUrls.adminOrders
  },
  {
    label: 'Agent',
    to: privateUrls.agentOrders
  }
]

const Jobs: React.FunctionComponent<RouteComponentProps> = () => (
  <StyledMainWrapper>
    <TabsBar tabs={tabs}/>
    <Switch>
      <Route exact path={privateUrls.adminOrders} component={AdminOrdersListContainer}/>
      <Route exact path={privateUrls.agentOrders} component={AgentOrdersListContainer}/>
      <Route exact path={privateUrls.photographerOrders} component={PhotographerOrdersListContainer}/>
      <Route exact path={privateUrls.jobs} component={ProcessorOrdersListContainer}/>
    </Switch>
  </StyledMainWrapper>
)

export default Jobs
