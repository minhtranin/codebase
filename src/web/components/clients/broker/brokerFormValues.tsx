import { Address, BrokerFormValues, ContactInfo, FeesValues, PhotoDownloadPreset, PropertyFlyer, PropertySiteMediaShowcase, PropertySiteTourSettingsValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import { RGBColor } from 'react-color'

const address: Address = {
  city: '',
  country: 'US',
  state: 'AK',
  street: '',
  zip: ''
}

const contactInfo: ContactInfo = {
  emailOffice: '',
  phone: '',
  phoneMobile: '',
  regionId: 0, // TODO make optional in initial data
  website: ''
}

const defaultColorScheme: RGBColor = {
  a: 1,
  b: 62,
  g: 204,
  r: 159
}

const fees: FeesValues = {
  brokerSubsidy: false,
  companyPay: false,
  discount: '',
  specialPricing: false
}

const photoDownloadPresets: PhotoDownloadPreset[] = []

const propertyFlyerLayout: PropertyFlyer = {
  flyerDisclaimer: '',
  flyerLayout: 'FEATURED1',
  hideFlyerFromPropertySiteTour: false
}

const propertySiteMediaShowcase: PropertySiteMediaShowcase = {
  showPropertyMapOnShowcasePage: true,
  topOfTheShowcasePhoto: ''
}

const propertySiteTourSettings: PropertySiteTourSettingsValues = {
  displayAgentCompanyLogoOnTopOfEachTour: false,
  hideAnimateNavigationBar: false,
  removeExternalLinksFromUnbrandedTourFooter: false,
  removePhotographerBrandingFromBrandedTour: false,
  removePhotographerBrandingFromUnbrandedTour: false,
  removePropertyAddressFromUnbrandedTours: false,
  showPatternOverlayOnSlideShowAndVideoOverviewTour: false,
  showViewAdditionalPropertiesButtonOnTours: false
}

const brokerFormValues: BrokerFormValues = {
  ...address,
  companyName: '',
  ...contactInfo,
  defaultColorScheme,
  ...fees,
  music: '',
  ownerId: 0, // TODO make optional in initial data
  photoDownloadPresets,
  ...propertyFlyerLayout,
  propertySiteMediaShowcase,
  propertySiteMediaStyle: 'MODERN',
  ...propertySiteTourSettings
}

export default brokerFormValues
