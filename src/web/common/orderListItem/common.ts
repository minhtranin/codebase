import { Order, OrderService } from '#veewme/graphql/types'

export const ITEM_CELL_HEIGHT = '93px'
export const ACTION_BAR_HEIGHT = '50px'
export const ADDRESS_BAR_HEIGHT = '30px'

export enum ActionId {
  WebActivate,
  MediaImage,
  MediaVideo,
  ImageUpload,
  MapPin,
  EditDataCell,
  ContactEmail,
  ContactNote,
  EditContactCell,
  EditAffiliateCell,
  EditAgent,
  Preview,
  Media,
  TourGallery,
  LoginAs,
  OrderDetails,
  AddCalendar,
  AddOn,
  Message,
  FullStats,
  // TODO replace with actions
  Action1,
  Action2,
  Action3
}

export type ActionClickCallback = (orderId: Order['id'], ActionId: ActionId) => void
export type StatusClickCallback = (orderId: Order['id'], serviceId: OrderService['id']) => void
