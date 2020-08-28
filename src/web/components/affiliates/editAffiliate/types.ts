import { Affiliate, Order } from '#veewme/gen/graphqlTypes'
import { PhotoExportPreset } from '#veewme/lib/types'
import { Address, BillingFrequency, PaymentMethod, SocialMediaValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import { EditorState } from 'draft-js'
import { RGBColor } from 'react-color'

export interface BillingValues {
  billingFrequency: BillingFrequency
  paymentMethods?: PaymentMethod[]
}

export interface Company {
  companyName: string
  logo: string
}

export interface AffiliateContactInfoValues {
  emailOffice?: string,
  phone: string,
  phoneOffice?: string,
  website?: string
}

export interface ColorSchemeValues {
  defaultColorScheme: RGBColor
}

export interface FauxVideoMusicValues {
  defaultFauxVideoMusic?: string
}

export interface HelperValues {
  featuredPropertySiteToAdd?: Order['id']
}

export interface MediaExportsValues {
  mediaExports: PhotoExportPreset[]
}

export interface PluginsValues {
  facebookTracking?: string
  googleTracking?: string
  messengerIntegration?: string
  plugin?: string
  zendeskIntegration?: string
}

export interface PropertySiteMediaGalleryValues {
  coverPhoto: string
  featuredPropertySites: Array<Order['id']>
  tourColor: RGBColor
}

// TODO use graphqlTypes Region
export interface Region {
  id: number
  label: string
}

export interface RegionsValues {
  regionIds: Array<Region['id']>
}

export interface SettingsValues {
  allowClientBillingAccess: boolean
  allowClientMediaUpload: boolean
  allowClientOrders: boolean
  orderConfirmationEmailRider: boolean
  sendWelcomeEmailsToNewClients: boolean
}

export interface UsefulLinksValues {
  propertySiteLink: string
  loginLink: string
  signupLink: string
}

export interface UserValues {
  email: string
  firstName: string
  lastName: string
}

export interface WhiteLabelValues {
  customDomain?: string
  enabled: boolean
}

export type EditAffiliateValues = {
  areasCovered?: string
  description: EditorState
  id: Affiliate['id']
  permissionsAndSettings: SettingsValues
  usefulLinks: UsefulLinksValues
  user: UserValues
  whiteLabel: WhiteLabelValues
}
& Address
& AffiliateContactInfoValues
& BillingValues
& ColorSchemeValues
& Company
& FauxVideoMusicValues
& HelperValues
& MediaExportsValues
& PropertySiteMediaGalleryValues
& PluginsValues
& RegionsValues
& SocialMediaValues
