import { Agent, Amenity, Card, Country, CreditCard, Location, PackageCard, PromoCode, PropertyAddress, PropertyDetails, ShippingInfo, ShootInfo, State } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import FloorPlanSvg from '#veewme/web/assets/svg/floor-plan.svg'
import PhotoSvg from '#veewme/web/assets/svg/photographer.svg'
import VideoSvg from '#veewme/web/assets/svg/video.svg'
import { ThemeInterface } from '#veewme/web/common/styled-components'
import * as React from 'react'
import { FormValues } from './newOrderForm'

export interface ServiceCard extends Card {
  image?: string
  price: number
  text: string
}

export interface AllServicesCards {
  packageCards: PackageCard[]
  primaryPhotoCards: ServiceCard[]
  videoCards: ServiceCard[]
  addOnPhotoCards: ServiceCard[]
  floorPlanCards: ServiceCard[]
}

export interface NewOrderValues {
  packageCardId?: Card['id']
  primaryPhotoCardIds: Array<Card['id']>
  videoCardIds: Array<Card['id']>
  addOnPhotoCardIds: Array<Card['id']>
  floorPlanCardIds: Array<Card['id']>
  orderTotal: number
  agentId?: Agent['id']
  coListingAgentId?: Agent['id']
  promoCodeId?: PromoCode['id']
  propertyAddress: PropertyAddress
  propertyDetails: PropertyDetails
  shootInfo: ShootInfo
  amenities: Amenity[]
  location: Location
  creditCard: CreditCard
  shippingInfo: ShippingInfo
}

export type ServiceType = 'primaryPhoto' | 'video' | 'addOnPhoto' | 'floorPlan'

export type ServiceConfigDictionary = { [K in ServiceType]: {
  color: keyof ThemeInterface['colors']
  label: string
  icon: React.SVGFactory
  category: string
  formValueName: string
  requireConfirm?: boolean
} }

export const ServicesConfig: ServiceConfigDictionary = {
  addOnPhoto: {
    category: 'Add On',
    color: 'BLUE',
    formValueName: nameof<FormValues>('addOnPhotoCardIds'),
    icon: PhotoSvg,
    label: 'Photography',
    requireConfirm: false
  },
  floorPlan: {
    category: 'Add On',
    color: 'DARK_PURPLE',
    formValueName: nameof<FormValues>('floorPlanCardIds'),
    icon: FloorPlanSvg,
    label: 'Floor Plan',
    requireConfirm: true
  },
  primaryPhoto: {
    category: 'Primary',
    color: 'BLUE',
    formValueName: nameof<FormValues>('primaryPhotoCardIds'),
    icon: PhotoSvg,
    label: 'Photography',
    requireConfirm: false
  },
  video: {
    category: 'Primary',
    color: 'ORANGE',
    formValueName: nameof<FormValues>('videoCardIds'),
    icon: VideoSvg,
    label: 'Video',
    requireConfirm: false
  }
}

export const getCountryOptions = (countries: Country[]) => {
  return countries.map(country => ({
    label: country.name,
    value: country.id
  }))
}

export const getStateOptions = (states: State[]) => {
  return states.map(s => ({
    label: s.name,
    value: s.id
  }))
}
