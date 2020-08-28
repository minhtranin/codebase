import {
  Affiliate,
  Brokerage,
  Country,
  FlyerLayoutName,
  PhotoDownloadTriggers,
  PropertySiteMediaStyles,
  State,
  UserCreateInput,
  UserSignupInput
} from '#veewme/gen/graphqlTypes'
import { FileValue, PhotoExportPreset } from '#veewme/lib/types'
import { EditorState } from 'draft-js'
import { RGBColor } from 'react-color'

// TODO import from '#veewme/gen/graphqlTypes' when ready
export type BillingFrequency = 'BIWEEKLY' | 'DAILY' | 'MONTHLY' | 'WEEKLY'

export interface Address {
  city: string
  country: Country
  state: State
  street: string
  zip: string
}

// TODO remove logo from Company when added to CompanyCreateInput
export interface Company {
  companyName: string
  logo?: string
}

// TODO most probably remove (to check if still needed)
export interface ContactInfo {
  emailCC?: string
  emailCCorderPlaced?: boolean
  emailCCorderCompleted?: boolean
  emailOffice?: string
  phone: string
  phoneAlternate?: string
  phoneMobile?: string
  phoneOffice?: string
  regionId: number
  website?: string
}

export interface DefaultColorSchemeValues {
  defaultColorScheme: RGBColor
}

export interface FeesValues {
  brokerSubsidy?: boolean
  companyPay?: boolean
  discount?: string
  specialPricing?: boolean
}

export interface PaymentMethod {
  cardName: 'American Express' | 'MasterCard' | 'Visa'
  icon: React.SVGFactory
}

export interface PaymentMethodValues {
  paymentMethods?: PaymentMethod[]
}

export interface AgentNotificationValues {
  newTourOrder?: boolean
  tourActivated?: boolean
}

export interface PhotoPresetsValues {
  photoPresets: PhotoExportPreset[]
}

export interface PhotoDownloadPreset {
  id?: number
  downloadTrigger: PhotoDownloadTriggers
  enabled: boolean
  photoPreset: PhotoExportPreset
}

export interface PhotoDownloadPresetValues {
  photoDownloadPresets: PhotoDownloadPreset[]
}

export interface PropertyFlyer {
  flyerDisclaimer?: string
  flyerLayout: FlyerLayoutName
  hideFlyerFromPropertySiteTour?: boolean
}

// TODO import type from graphqlTypes when ready
export interface PropertySiteMediaShowcase {
  showPropertyMapOnShowcasePage: boolean
  topOfTheShowcasePhoto: string
}

export interface PropertySiteMediaShowcaseValues {
  propertySiteMediaShowcase: PropertySiteMediaShowcase
}

export interface PropertySiteTourSettingsValues {
  displayAgentCompanyLogoOnTopOfEachTour?: boolean
  hideAnimateNavigationBar?: boolean
  removeExternalLinksFromUnbrandedTourFooter?: boolean
  removePhotographerBrandingFromBrandedTour?: boolean
  removePhotographerBrandingFromUnbrandedTour?: boolean
  removePropertyAddressFromUnbrandedTours?: boolean
  showPatternOverlayOnSlideShowAndVideoOverviewTour?: boolean
  showViewAdditionalPropertiesButtonOnTours?: boolean
}

export type User = UserCreateInput

export interface UserValues {
  user: User
}

export type UserSignup = UserSignupInput

export interface UserSignupValues {
  user: UserSignup
  passwordConfirm: string
}

// TODO remove BrokerValues while updating signup otions (no signup as Broker)
export type BrokerSignupValues = Address & Company & Pick<ContactInfo, 'phone' | 'website'> & UserSignupValues & SurveyValues
export type AffiliateSignupValues = Address & Company & Pick<ContactInfo, 'phone' | 'website'> & UserSignupValues & SurveyValues
export type AgentSignupValues = Pick<ContactInfo, 'phone' | 'website'> & UserSignupValues & SurveyValues

export type NewClientValues = Address & ContactInfo

export type BrokerFormValues = {
  ownerId: Affiliate['id']
  music?: string
  propertySiteMediaStyle: PropertySiteMediaStyles
} & Address
  & ContactInfo
  & Company
  & DefaultColorSchemeValues
  & PhotoDownloadPresetValues
  & FeesValues
  & PropertyFlyer
  & PropertySiteTourSettingsValues
  & PropertySiteMediaShowcaseValues

export type AgentValues = {
  affiliateId?: Affiliate['id']
  agentMLSid: string
  bio: EditorState
  brokerageId?: Brokerage['id']
  designations: string
  internalNote?: EditorState
  officeAdmin?: boolean
  others: string
  profilePicture?: FileValue
  profileUrl: string
  title: string
} & Address
  & Omit<ContactInfo, 'regionId'>
  & Partial<Pick<ContactInfo, 'regionId'>>
  & DefaultColorSchemeValues
  & FeesValues
  & PaymentMethodValues
  & AgentNotificationValues
  & PropertyFlyer
  & PropertySiteTourSettingsValues
  & UserValues
  & (// TODO old types still to fit to backend
    PluginsTrackingValues
    & PropertySiteMediaShowcaseValues
    & SocialMediaValues
  )

export type AgentAccountValues = {
  affiliateId?: Affiliate['id']
  agentAvatar?: string // TODO replace with File when File is implemented to avatar
  agentMLSid: string
  bio: EditorState
  brokerageId?: Brokerage['id']
  designations: string
  internalNote?: EditorState
  officeAdmin?: boolean
  others: string
  profileUrl: string
  title: string
} & Address
  & Omit<ContactInfo, 'regionId'>
  & DefaultColorSchemeValues
  & FeesValues
  & PaymentMethodValues
  & AgentNotificationValues
  & PropertyFlyer
  & PropertySiteTourSettingsValues
  & UserValues
  & (// TODO old types still to fit to backend
    PluginsTrackingValues
    & PropertySiteMediaShowcaseValues
    & SocialMediaValues
  )

export type BrokerageValues = Pick<Brokerage, 'id' | 'companyName'> & {
  logoUrl: string
}

export type NewOfficeValues =
  PhotoDownloadPresetValues
  & Company
  & Address
  & ContactInfo

// TODO check what is still used of the old interfaces below
export interface PluginsTracking {
  facebookTracking?: string
  googleTracking?: string
  plugin?: string
}
export interface PluginsTrackingValues {
  pluginsTracking?: PluginsTracking
}

export interface SocialMedia {
  facebookLink?: string
  instagramLink?: string
  linkedinLink?: string
  pinterestLink?: string
  twitterLink?: string
}
export interface SocialMediaValues {
  socialMedia?: SocialMedia
}

export interface SurveyFields {
  currentlyUsingManagingApp: boolean
  heardAboutUsFrom: string
  importantThingsInManagingApp: string
  other: string
  toursYearly: string
}
export interface SurveyValues { survey?: SurveyFields }
