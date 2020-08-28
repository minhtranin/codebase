// TODO replace those types with graphql ones when each is ready

export type AccountRole = 'affiliate' | 'agent'
import * as GraphQLTypes from '#veewme/graphql/types'
import { EditorState } from 'draft-js'
import { RGBColor } from 'react-color'

export interface FileValue {
  id?: string
  file?: File
  filename?: string
  path?: string
}

export interface Affiliate {
  id: number
  name: string
  address: Address
}

export interface Broker {
  id: string
  name: string
  logoUrl: string
}

export interface Card {
  id: number
  title: string
  suspended?: boolean
}

export interface PackageCard extends Card {
  subtitles: string[]
  services: string[]
  price: number
  oldPrice?: number
}

export interface ServiceCard extends Card {
  image?: string
  price: number
  serviceCategoryId: ServiceCategory['id']
  serviceType?: GraphQLTypes.ServiceType
  text: string
}

export interface Agent {
  id: number
  firstName: string
  lastName: string
  email: string
  pin: boolean // from faker order
}

export interface Country {
  id: string
  name: string
}

export interface State {
  id: string
  name: string
}

export interface Address {
  street: string
  city: string
  stateId: State['id']
  countryId: Country['id']
  zip: string
}

export type PropertyAddress = {
  dontShowOnSite: boolean
} & Address

export enum Occupancy {
  Occupied = 'occupied',
  Vacant = 'vacant'
}

export interface ShootInfo {
  date?: Date
  time?: string
  occupancy: Occupancy
  note?: string
  lockBox: boolean
}

export enum RentalPeriod {
  Month = 'month',
  Week = 'week',
  Day = 'day'
}

export type ListingType = string

export interface ListingTypesCategory {
  name: string
  listingTypes: ListingType[]
}

export interface Currency {
  id: string
  name: string
}

export enum HomeSizeUnit {
  SqFt = 'Sq. Ft',
  SqM = 'Sq. Meters'
}

export enum LotSizeUnit {
  Acres = 'Acres',
  SqFt = 'Sq. Ft',
  Hectares = 'Hectares',
  SqM = 'Sq. Meters'
}

export interface PropertyDetails {
  rental: boolean
  rentalPeriod?: RentalPeriod
  listingType?: ListingType
  price: number
  currency: Currency['id']
  bedrooms: number
  fullBathrooms: number
  halfBathrooms: number
  garages: number
  parkingSpaces: number
  yearBuilt: number
  primaryMLS: number
  secondaryMLS: number
  homeSize: number
  homeSizeUnit: HomeSizeUnit
  lotSize: number
  lotSizeUnit: LotSizeUnit
  propertyHeadline: string
  hideHeadline: boolean
  propertyDescription: EditorState
  shortPropertyDescription: string
}

export interface Amenity {
  id: number
  label: string
}

export interface LatLng {
  lat: number
  lng: number
}

export interface Location {
  dontDisplay: boolean
  name: string
  latLng: LatLng
  zoom: number
}

export interface CreditCard {
  cardNumber: string
  expiration: string
  CVC: string
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  address: Address
}

export interface Job {
  id: string
}
// services order set up in services for New Order step 1
export type ServicesOrder = Array<Card['id']>

export interface ImageDimensions {
  height: number
  width: number
}

export type FlyerLayoutName =
  | 'featured1'
  | 'featured1minor5'
  | 'featured2minor3'
  | 'featured2minor6'
  | 'featured2minor6withHorizontalBars'

export interface DateRange {
  start: Date
  end: Date
}

export interface AffiliatePhotoExportPreset {
  id?: number
  name: string
  width: number
  height: number
  resolution: number
}

export interface PhotoExportPreset extends AffiliatePhotoExportPreset {
  id: number
}

export enum PromoCodeValidity {
  OnceOnly = 'Once Only',
  MultipleTimes = 'Multiple Times',
  OncePerAgent = 'Once per Agent',
  Unlimited = 'Unlimited'
}

export type DiscountType = 'amount' | 'percent'
export type DiscountExpireDate = 'unlimited' | Date

// TODO replace with graphql generated type
export interface PromoCode {
  id: number
  code: string
  affiliateId: Affiliate['id']
  serviceId?: Service['id']
  description: string
  discount: number
  discountType: DiscountType
  expireDate: DiscountExpireDate
  usageCount: number
  validity: PromoCodeValidity
}

// TODO replace with graphql generated type
export interface PopupAd {
  id: string
  actionButtonNote?: string
  description: string
  footNote: string
  imageUrl: string
  region?: string
  headline: string
}

export interface TourBanner {
  id: number
  color: RGBColor
  label: string
  blackText?: boolean
}

export interface Color {
  a: number
  b: number
  g: number
  r: number
}

export interface ServiceCategory {
  id: number
  color: Color
  label: string
  icon: GraphQLTypes.ServiceCategoryIcon
}

export interface Service {
  id: number
  assignable: boolean
  category: ServiceCategory
  defaultCompensation: number
  defaultPay: number
  duration: number
  durationUnit: GraphQLTypes.DurationUnit
  image?: string
  link: string
  mediaOnly: boolean
  name: string
  note: string
  orderNotifyEmail: string
  packageServices: Service[]
  photographer: GraphQLTypes.Photographer
  photographerPay: number
  price: number
  processor: string
  propertySite: boolean
  region: string
  regions: GraphQLTypes.ServiceRegionAdjusted[]
  serviceType: GraphQLTypes.ServiceType
  sourceType: GraphQLTypes.SourceType
  suspended: boolean
  tourNotifyEmail: string
}

export function isDateRange (arg: any): arg is DateRange {
  // TODO: use ts-transformer-keys
  return arg && arg instanceof Object &&
    'start' in arg && arg.start instanceof Date &&
    'end' in arg && arg.end instanceof Date
}

export enum CnameStatus {
  WRONG_VALUE = 'WRONG_VALUE',
  SUCCESS = 'SUCCESS',
  NOT_EXIST = 'NOT_EXIST'
}
