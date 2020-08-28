import { OrderPhoto } from '#veewme/web/components/media/types'
import { RGBColor } from 'react-color'

type Tab = 'OVERVIEW' | 'PHOTOS' | 'VIDEO' | 'PANORAMAS'
export interface CustomBanner {
  background: RGBColor
  text: string
}
export type BannerPhoto = Pick<OrderPhoto, 'id' | 'fullUrl'>
export type Photo = Pick<OrderPhoto, 'id' | 'fullUrl' | 'thumbUrl'>

export type HorizontalDir = 'LEFT' | 'RIGHT' | 'CENTER'
export type VerticalDir = 'UP' | 'DOWN' | 'CENTER'
export type ZoomDir = 'IN' | 'OUT' | 'NO_ZOOM'

export type KenburnsBannerPhoto = BannerPhoto & {
  slideVerticalDir?: VerticalDir,
  slideHorizontalDir?: HorizontalDir,
  zoomDir?: ZoomDir
}

export type DescriptionName = 'BEDS' | 'BATHS/HALF' | 'GARAGES' | 'YEAR' | 'INTERIOR' | 'LOT'
export interface DescriptionItem {
  name: DescriptionName
  value: string
}

export interface ContactPerson {
  name: string
  title: string
  company: string
  faxNumber: string
  mobile: string
  officeNumber: string
  facebookUrl: string
  websiteUrl: string
  linkedinUrl: string
}

export interface VideoItem {
  id: number
  url: string
  pictureUrl: string
}

export interface Tour {
  address: string
  price: string
  headerRightComponent: 'Price' | 'Call' | 'Logo'
  agentPhone: string
  headerLogoUrl: string
  visibleTabs: Tab[]
  mainColor: RGBColor
  brochureUrl: string
  bannerPhotos: BannerPhoto[] | KenburnsBannerPhoto[]
  photos: Photo[]
  slideshowAudioSrc: string
  customBanner: CustomBanner
  title: string
  descriptionText: string
  descriptionItems: DescriptionItem[]
  contactPerson: ContactPerson
  bannerType?: 'SIMPLE' | 'KENBURNS'
  videos: VideoItem[]
}
