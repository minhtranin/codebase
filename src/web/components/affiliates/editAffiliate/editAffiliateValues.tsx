import { Address, SocialMediaValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import { EditorState } from 'draft-js'
import { AffiliateContactInfoValues, BillingValues, ColorSchemeValues, Company, EditAffiliateValues, FauxVideoMusicValues, HelperValues, MediaExportsValues, PluginsValues, PropertySiteMediaGalleryValues, RegionsValues, SettingsValues, UsefulLinksValues, UserValues, WhiteLabelValues } from './types'

const address: Address = {
  city: '',
  country: 'US',
  state: 'AK',
  street: '',
  zip: ''
}

const billingValues: BillingValues = {
  billingFrequency: 'DAILY',
  paymentMethods: []
}

const company: Company = {
  companyName: '',
  logo: ''
}

const contactInfo: AffiliateContactInfoValues = {
  emailOffice: '',
  phone: '',
  phoneOffice: '',
  website: ''
}

const fauxVideoMusicValues: FauxVideoMusicValues = {
  defaultFauxVideoMusic: ''
}

const helperValues: HelperValues = {}

const mediaExportsValues: MediaExportsValues = {
  mediaExports: []
}

const pluginsValues: PluginsValues = {
  facebookTracking: '',
  googleTracking: '',
  messengerIntegration: '',
  plugin: '',
  zendeskIntegration: ''
}

const propertySiteMediaGalleryValues: PropertySiteMediaGalleryValues = {
  coverPhoto: '',
  featuredPropertySites: [],
  tourColor: {
    a: 1,
    b: 255,
    g: 166,
    r: 61
  }
}

const colorSchemeValues: ColorSchemeValues = {
  defaultColorScheme: {
    a: 1,
    b: 62,
    g: 204,
    r: 159
  }
}

const regionsValues: RegionsValues = {
  regionIds: [1]  // TODO make optional in initial data
}

const socialMediaValues: SocialMediaValues = {
  socialMedia: {
    facebookLink: '',
    instagramLink: '',
    linkedinLink: '',
    pinterestLink: '',
    twitterLink: ''
  }
}

const settingsValues: SettingsValues = {
  allowClientBillingAccess: true,
  allowClientMediaUpload: true,
  allowClientOrders: false,
  orderConfirmationEmailRider: false,
  sendWelcomeEmailsToNewClients: true
}

const user: UserValues = {
  email: '',
  firstName: '',
  lastName: ''
}

const usefulLinksValues: UsefulLinksValues = {
  loginLink: '',
  propertySiteLink: '',
  signupLink: ''
}

const whiteLabelValues: WhiteLabelValues = {
  customDomain: '',
  enabled: false
}

export const editAffiliateDefaultValues: EditAffiliateValues = {
  ...address,
  areasCovered: '',
  ...colorSchemeValues,
  ...company,
  ...contactInfo,
  description: EditorState.createEmpty(),
  id: 0,  // TODO make optional in initial data
  ...fauxVideoMusicValues,
  ...mediaExportsValues,
  permissionsAndSettings: settingsValues,
  ...propertySiteMediaGalleryValues,
  usefulLinks: usefulLinksValues,
  user,
  whiteLabel: whiteLabelValues,
  ...billingValues,
  ...helperValues,
  ...pluginsValues,
  ...regionsValues,
  ...socialMediaValues
}
