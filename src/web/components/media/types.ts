export interface OrderPhoto {
  id: string
  title: string
  thumbUrl: string
  fullUrl: string
  hidden: boolean
  inVideo: boolean
  star: boolean
  date: string
  inFlyer?: boolean
  fileName: string
}

export enum PanoramaType {
  Cylindrical = 'Cylindrical',
  Spherical = 'Spherical'
}

export interface OrderPanorama {
  id: string
  fileName: string
  date: string
  title: string
  thumbUrl: string
  initialZoom: number
  initialHorizontalAngle: number
  initialVerticalAngle: number
  type: PanoramaType
  hfov: number
}

export interface PanoramaToUpload {
  id: string
  name: string
  type: PanoramaType
  hfov: number
  thumb: string
  size: number
}

export interface PhotosSelection {
  [photoId: string]: boolean
}

export interface Sort {
  fieldName: keyof OrderPhoto,
  orderDesc: boolean
}

export interface OrderDocument {
  id: string
  title: string
  extension: string
  size: number
}

export interface OrderDocumentDetails {
  title: string
  appearance: Appearance
  downloadUrl: string
}

export enum Appearance {
  Always = 'Always',
  Branded = 'Branded',
  Unbranded = 'Unbranded',
  Hide = 'Hide'
}

export enum DefaultMedia {
  Video = 'Video',
  Interactive = 'Interactive',
  Overview = 'Overview'
}

export interface OrderInteractive {
  id: string
  title: string
}

export interface OrderInteractiveDetails {
  label: string
  appearance: Appearance
  embeddedCode: string
  url: string
}

export type VideoTypes = 'hosted' | 'URL' | 'embed' | 'faux'

// TODO: define ultimate list of categories
export enum VideoCategory {
  Property = 'Property',
  Neighbourhood = 'Neighbourhood'
}

export interface OrderVideo {
  appearance: Appearance
  id: string
  category: VideoCategory
  date: string
  fileName?: string
  title: string
  thumbUrl?: string
  type: VideoTypes
  error?: boolean
}

export interface VideoBasicDetails {
  label: string
  appearance: Appearance
  theaterMode: boolean
}

export interface EmbedVideo extends VideoBasicDetails {
  embeddedCode: string
}

export interface UrlVideo extends VideoBasicDetails {
  url: string
}

export interface HostedVideo extends VideoBasicDetails {
  category?: VideoCategory
  overview?: boolean
  file?: File
  thumbId?: OrderPhoto['id']
}

export enum GenerateOption {
  Branded = 'Branded',
  Unbranded = 'Unbranded',
  Package = 'Package'
}

export interface FauxVideo extends VideoBasicDetails {
  audio: string
  generateOption: GenerateOption
  thumbId?: OrderPhoto['id']
  photos: Array<OrderPhoto['id']>
}
