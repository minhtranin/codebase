import { privateUrls, publicUrls } from '#veewme/lib/urls'
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Account from '../account/account'
import Affiliates from '../affiliates/affiliates'
import LogOut from '../auth/logOut'
import Clients from '../clients/client'
import Dashboard from '../dashboard/dashboard'
import Dev from '../dev/dev'
import Employees from '../employees/employees'
import Jobs from '../jobs/jobs'
import Home from '../landingPage/home/home'
import LogIn from '../landingPage/logIn/logIn'
import ResetPassword from '../landingPage/resetPassword'
import SignUp from '../landingPage/signup/signup'
import Media from '../media/media'
import MediaAccess from '../mediaAccess'
import Orders from '../orders/orders'
import Photographers from '../photographers/photographers'
import Services from '../services/services'
import Settings from '../settings/settings'
import Tour from '../tour'
import { PrivatePage, PublicPage } from './pageWrapper'

const PrivateRoutes: React.FunctionComponent = () => (
  <PrivatePage>
    <Switch>
      <Route exact path={privateUrls.account} component={Account} />
      <Route path={privateUrls.affiliates} component={Affiliates} />
      <Route path={privateUrls.clients} component={Clients} />
      <Route path={privateUrls.employees} component={Employees} />
      <Route path={privateUrls.media} component={Media} />
      <Route path={privateUrls.orders} component={Orders} />
      <Route path={privateUrls.mediaAccess} component={MediaAccess} />
      <Route path={privateUrls.photographers} component={Photographers} />
      <Route path={privateUrls.services} component={Services} />
      <Route path={privateUrls.settings} component={Settings} />
      <Route path={privateUrls.dev} component={Dev} />
      <Route path={privateUrls.jobs} component={Jobs} />
      <Route path={privateUrls.support} render={() => <h1>Support</h1>} />
      <Route exact path={privateUrls.dashboard} component={Dashboard} />
    </Switch>
  </PrivatePage>
)

const PublicRoutes: React.FunctionComponent = () => (
  <PublicPage>
    <Switch>
      <Route path={publicUrls.login} component={LogIn} />
      <Route path={publicUrls.logout} component={LogOut} />
      <Route path={publicUrls.reset} component={ResetPassword} />
      <Route path={publicUrls.pricing} render={() => 'pricing'} />
      <Route path={publicUrls.privacyPolicy} render={() => 'privacy policy'} />
      <Route path={publicUrls.signup} component={SignUp} />
      <Route path={publicUrls.termsAndConditions} render={() => 'terms and conditions'} />
      <Route path={publicUrls.tours} render={() => 'tours'} />
      <Route path={publicUrls.landingPage} component={Home} />
    </Switch>
  </PublicPage>
)

const Main: React.FunctionComponent = () => (
  <Switch>
    <Route path={privateUrls.panel} component={PrivateRoutes} />
    <Route path={publicUrls.tour} component={Tour} />
    <Route path={publicUrls.publicPage} component={PublicRoutes} />
  </Switch>
)

export default Main
