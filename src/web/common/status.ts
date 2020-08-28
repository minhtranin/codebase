import { OrderStatus } from '#veewme/graphql/types'
import { UnreachableCaseError } from '../../lib/error'
import { themeColors } from './colors'
import { LegendStatus } from './footer/legendBar'

export function getOrderLegendStatus (orderStatus: OrderStatus): LegendStatus {
  switch (orderStatus) {
    case 'Active':
      return { color: themeColors.STATUS_ACTIVE, label: 'Active' }
    case 'Inactive':
      return { color: themeColors.STATUS_INACTIVE, label: 'Inactive' }
    case 'MediaOnly':
      return { color: themeColors.STATUS_MEDIA_ONLY, label: 'Media only' }
    case 'Pending':
      return { color: themeColors.STATUS_PENDING, label: 'Pending' }
    case 'Sold':
      return { color: themeColors.STATUS_SOLD, label: 'Sold' }
    case 'Overdue':
      return { color: themeColors.STATUS_OVERDUE, label: 'Overdue' }
    case 'Published':
      return { color: themeColors.STATUS_PUBLISHED, label: 'Published' }
    case 'Scheduled':
      return { color: themeColors.STATUS_SCHEDULED, label: 'Scheduled' }
    case 'Unassigned':
      return { color: themeColors.STATUS_UNASSIGNED, label: 'Unassigned' }
    case 'Unpublished':
      return { color: themeColors.STATUS_UNPUBLISHED, label: 'Unpublished' }
    case 'Unscheduled':
      return { color: themeColors.STATUS_UNSCHEDULED, label: 'Unscheduled' }
    default:
      throw new UnreachableCaseError(orderStatus)
  }
}
