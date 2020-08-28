import { privateUrls } from '#veewme/lib/urls'
import { StyledMainWrapper } from '#veewme/web/common/styled'
import TabsBar from '#veewme/web/common/tabsBar'
import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import NewService from './newService/newService'
import NewPopupAd from './popupAds/newPopupAd/newPopupAd'
import PopupAdsListContainer from './popupAds/popupAdsList/popupAdsListContainer'
import NewPromoCode from './promoCodes/newPromoCode/newPromoCode'
import PromoCodesListContainer from './promoCodes/promoCodesList/promoCodesListContainer'
import ServicesContainer from './services/servicesContainer'

class Services extends React.PureComponent<RouteComponentProps, {}> {
  render () {
    const tabs = [
      {
        label: 'Services',
        plusTo: privateUrls.addService,
        to: privateUrls.services
      },
      {
        label: 'Popup Ads',
        plusTo: privateUrls.addPopup,
        to: privateUrls.popup
      },
      {
        label: 'Promo-Codes',
        plusTo: privateUrls.addPromoCode,
        to: privateUrls.codes
      }
    ]

    return (
      <StyledMainWrapper>
        <TabsBar tabs={tabs}/>
        <Switch>
          <Route exact path={privateUrls.services} component={ServicesContainer} />
          <Route exact path={privateUrls.popup} component={PopupAdsListContainer} />
          <Route exact path={privateUrls.codes} component={PromoCodesListContainer} />
          <Route exact path={privateUrls.addService} component={NewService} />
          <Route exact path={privateUrls.addPopup} component={NewPopupAd} />
          <Route exact path={privateUrls.addPromoCode} component={NewPromoCode} />
        </Switch>
      </StyledMainWrapper>
    )
  }
}

export default Services
